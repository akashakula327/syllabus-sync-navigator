
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAuth } from '../../hooks/useAuth';
import DepartmentOverview from './DepartmentOverview';
import FacultyComparison from './FacultyComparison';
import InterventionSystem from './InterventionSystem';
import ReportsGeneration from './ReportsGeneration';

const HODDashboard = () => {
  const { user, logout } = useAuth();

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
              <p className="text-muted-foreground">HOD Dashboard - {user?.department}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">Head of Department</p>
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
            <TabsTrigger value="overview">Department Overview</TabsTrigger>
            <TabsTrigger value="comparison">Faculty Comparison</TabsTrigger>
            <TabsTrigger value="intervention">Intervention System</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DepartmentOverview />
          </TabsContent>

          <TabsContent value="comparison">
            <FacultyComparison />
          </TabsContent>

          <TabsContent value="intervention">
            <InterventionSystem />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsGeneration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HODDashboard;
