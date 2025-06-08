
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAuth } from '../../hooks/useAuth';
import QuickLog from './QuickLog';
import SyllabusMapping from './SyllabusMapping';
import ProgressTracker from './ProgressTracker';

const FacultyDashboard = () => {
  const { user, logout } = useAuth();
  const [subjects] = useState([
    {
      id: 1,
      name: "Data Structures & Algorithms",
      code: "CS301",
      totalTopics: 42,
      completedTopics: 28,
      progress: 67,
      status: "on-track"
    },
    {
      id: 2,
      name: "Database Management Systems", 
      code: "CS302",
      totalTopics: 38,
      completedTopics: 20,
      progress: 53,
      status: "delayed"
    },
    {
      id: 3,
      name: "Computer Networks",
      code: "CS303", 
      totalTopics: 35,
      completedTopics: 31,
      progress: 89,
      status: "ahead"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'bg-green-500';
      case 'on-track': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SyllabusSync
              </h1>
              <p className="text-muted-foreground">Faculty Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.department}</p>
              </div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quick-log">Quick Log</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus Mapping</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 rounded"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Subjects</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <div className="w-6 h-6 bg-green-600 rounded"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                      <p className="text-2xl font-bold">70%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-600 rounded"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Topics Covered</p>
                      <p className="text-2xl font-bold">79</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <div className="w-6 h-6 bg-purple-600 rounded"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Pending Topics</p>
                      <p className="text-2xl font-bold">36</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subject Progress Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{subject.code}</p>
                      </div>
                      <Badge className={getStatusColor(subject.status)}>
                        {subject.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completed:</span>
                        <span>{subject.completedTopics}/{subject.totalTopics} topics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-log">
            <QuickLog />
          </TabsContent>

          <TabsContent value="syllabus">
            <SyllabusMapping />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyDashboard;
