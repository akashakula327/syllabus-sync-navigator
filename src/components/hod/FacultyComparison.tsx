
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const FacultyComparison = () => {
  const comparisonData = [
    {
      faculty: 'Dr. Sarah Johnson',
      subjects: 2,
      avgProgress: 85,
      topicsCompleted: 45,
      totalTopics: 53,
      velocity: 'High',
      lastWeekProgress: 12,
      trend: 'up'
    },
    {
      faculty: 'Prof. Michael Chen',
      subjects: 2,
      avgProgress: 72,
      topicsCompleted: 38,
      totalTopics: 48,
      velocity: 'Medium',
      lastWeekProgress: 8,
      trend: 'stable'
    },
    {
      faculty: 'Dr. Emily Rodriguez',
      subjects: 2,
      avgProgress: 58,
      topicsCompleted: 29,
      totalTopics: 50,
      velocity: 'Low',
      lastWeekProgress: 4,
      trend: 'down'
    },
    {
      faculty: 'Prof. David Kim',
      subjects: 2,
      avgProgress: 78,
      topicsCompleted: 41,
      totalTopics: 52,
      velocity: 'High',
      lastWeekProgress: 10,
      trend: 'up'
    }
  ];

  const sectionComparison = [
    {
      section: 'Section A',
      faculty: 'Dr. Sarah Johnson',
      subject: 'Data Structures',
      progress: 85,
      studentsCount: 60
    },
    {
      section: 'Section B',
      faculty: 'Prof. Michael Chen',
      subject: 'Data Structures',
      progress: 72,
      studentsCount: 58
    },
    {
      section: 'Section C',
      faculty: 'Dr. Emily Rodriguez',
      subject: 'Data Structures',
      progress: 58,
      studentsCount: 62
    }
  ];

  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'High': return 'bg-green-500';
      case 'Medium': return 'bg-blue-500';
      case 'Low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <div className="space-y-6">
      {/* Faculty Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Performance Comparison</CardTitle>
          <p className="text-muted-foreground">Compare teaching velocity and progress across faculty members</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Faculty</th>
                  <th className="text-left p-3">Subjects</th>
                  <th className="text-left p-3">Progress</th>
                  <th className="text-left p-3">Topics</th>
                  <th className="text-left p-3">Velocity</th>
                  <th className="text-left p-3">Weekly Progress</th>
                  <th className="text-left p-3">Trend</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((faculty, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{faculty.faculty}</p>
                      </div>
                    </td>
                    <td className="p-3">{faculty.subjects}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Progress value={faculty.avgProgress} className="w-16 h-2" />
                        <span className="text-sm">{faculty.avgProgress}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm">
                        {faculty.topicsCompleted}/{faculty.totalTopics}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge className={getVelocityColor(faculty.velocity)}>
                        {faculty.velocity}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="text-sm">+{faculty.lastWeekProgress} topics</span>
                    </td>
                    <td className="p-3">
                      <span className="text-lg">{getTrendIcon(faculty.trend)}</span>
                    </td>
                    <td className="p-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section-wise Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Section-wise Progress Comparison</CardTitle>
          <p className="text-muted-foreground">Compare progress across different sections of the same subject</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectionComparison.map((section, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold">{section.section}</h3>
                      <p className="text-sm text-muted-foreground">{section.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{section.faculty}</p>
                      <p className="text-xs text-muted-foreground">{section.studentsCount} students</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">{section.progress}%</p>
                    <Progress value={section.progress} className="w-24 h-2" />
                  </div>
                  <Badge variant={section.progress > 75 ? 'default' : section.progress > 60 ? 'secondary' : 'destructive'}>
                    {section.progress > 75 ? 'Excellent' : section.progress > 60 ? 'Good' : 'Needs Attention'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600">Top Performers</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>Dr. Sarah Johnson</span>
                  <span className="font-semibold">85% avg progress</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>Prof. David Kim</span>
                  <span className="font-semibold">78% avg progress</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-red-600">Needs Support</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span>Dr. Emily Rodriguez</span>
                  <span className="font-semibold">58% avg progress</span>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full">
                  Schedule Support Meeting
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyComparison;
