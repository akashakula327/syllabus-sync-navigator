
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

const DepartmentOverview = () => {
  const departmentStats = {
    totalFaculty: 12,
    totalSubjects: 36,
    avgProgress: 72,
    onTrackSubjects: 28,
    delayedSubjects: 6,
    aheadSubjects: 2
  };

  const facultyData = [
    {
      name: 'Dr. Sarah Johnson',
      subjects: ['Data Structures', 'Algorithms'],
      avgProgress: 85,
      status: 'ahead',
      lastUpdate: '2 hours ago'
    },
    {
      name: 'Prof. Michael Chen',
      subjects: ['Database Systems', 'Software Engineering'],
      avgProgress: 72,
      status: 'on-track',
      lastUpdate: '1 day ago'
    },
    {
      name: 'Dr. Emily Rodriguez',
      subjects: ['Computer Networks', 'Operating Systems'],
      avgProgress: 58,
      status: 'delayed',
      lastUpdate: '3 hours ago'
    },
    {
      name: 'Prof. David Kim',
      subjects: ['Machine Learning', 'AI Fundamentals'],
      avgProgress: 78,
      status: 'on-track',
      lastUpdate: '5 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'bg-green-500';
      case 'on-track': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Faculty</p>
                <p className="text-2xl font-bold">{departmentStats.totalFaculty}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Subjects</p>
                <p className="text-2xl font-bold">{departmentStats.totalSubjects}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-bold">{departmentStats.avgProgress}%</p>
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
                <p className="text-sm font-medium text-muted-foreground">Delayed Subjects</p>
                <p className="text-2xl font-bold text-red-600">{departmentStats.delayedSubjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Department Progress</span>
                <span>{departmentStats.avgProgress}%</span>
              </div>
              <Progress value={departmentStats.avgProgress} className="h-3" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{departmentStats.aheadSubjects}</p>
                <p className="text-sm text-green-700">Ahead of Schedule</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{departmentStats.onTrackSubjects}</p>
                <p className="text-sm text-blue-700">On Track</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{departmentStats.delayedSubjects}</p>
                <p className="text-sm text-red-700">Delayed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {facultyData.map((faculty, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <h3 className="font-semibold">{faculty.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {faculty.subjects.join(', ')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated: {faculty.lastUpdate}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">{faculty.avgProgress}%</p>
                    <Progress value={faculty.avgProgress} className="w-20 h-2" />
                  </div>
                  <Badge className={getStatusColor(faculty.status)}>
                    {faculty.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border rounded-lg hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-blue-600">Generate NAAC Report</h3>
              <p className="text-sm text-muted-foreground">Auto-generate accreditation compliance report</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-green-600">Schedule Interventions</h3>
              <p className="text-sm text-muted-foreground">Set up catch-up sessions for delayed subjects</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-purple-600">Historical Analysis</h3>
              <p className="text-sm text-muted-foreground">Compare with previous semesters</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentOverview;
