
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

const ProgressTracker = () => {
  const progressData = [
    {
      subject: 'Data Structures & Algorithms',
      code: 'CS301',
      overall: 67,
      units: [
        { name: 'Arrays & Linked Lists', progress: 100, status: 'completed' },
        { name: 'Stacks & Queues', progress: 60, status: 'in-progress' },
        { name: 'Trees & Graphs', progress: 0, status: 'pending' },
        { name: 'Advanced Algorithms', progress: 0, status: 'pending' }
      ],
      projectedCompletion: 'Jan 15, 2024',
      velocity: 'On Track'
    },
    {
      subject: 'Database Management Systems',
      code: 'CS302', 
      overall: 53,
      units: [
        { name: 'Introduction to DBMS', progress: 100, status: 'completed' },
        { name: 'SQL Fundamentals', progress: 85, status: 'in-progress' },
        { name: 'Normalization', progress: 40, status: 'in-progress' },
        { name: 'Transaction Management', progress: 0, status: 'pending' }
      ],
      projectedCompletion: 'Jan 22, 2024',
      velocity: 'Delayed'
    }
  ];

  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'Ahead': return 'text-green-600 bg-green-100';
      case 'On Track': return 'text-blue-600 bg-blue-100';
      case 'Delayed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {progressData.map((subject, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{subject.subject}</CardTitle>
                <p className="text-sm text-muted-foreground">{subject.code}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{subject.overall}%</div>
                <Badge className={getVelocityColor(subject.velocity)}>
                  {subject.velocity}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Overall Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{subject.overall}%</span>
                </div>
                <Progress value={subject.overall} className="h-3" />
              </div>

              {/* Unit-wise Progress */}
              <div className="space-y-3">
                <h4 className="font-medium">Unit-wise Breakdown</h4>
                {subject.units.map((unit, unitIndex) => (
                  <div key={unitIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{unit.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{unit.progress}%</span>
                        <Badge className={getStatusColor(unit.status)} variant="secondary">
                          {unit.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={unit.progress} className="h-2" />
                  </div>
                ))}
              </div>

              {/* Projections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Projected Completion</p>
                  <p className="text-lg font-semibold">{subject.projectedCompletion}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teaching Velocity</p>
                  <p className="text-lg font-semibold">{subject.velocity}</p>
                </div>
              </div>

              {/* Action Items */}
              {subject.velocity === 'Delayed' && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-700">Action Required:</p>
                  <ul className="text-sm text-red-600 mt-1 space-y-1">
                    <li>• Schedule additional classes for catch-up</li>
                    <li>• Focus on high-priority topics</li>
                    <li>• Consider combining related concepts</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Coverage Heatmap Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Coverage Heatmap</CardTitle>
          <p className="text-muted-foreground">Visual representation of topic coverage across time</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }, (_, i) => (
              <div 
                key={i}
                className={`h-8 rounded ${
                  i < 10 ? 'bg-green-200' : 
                  i < 20 ? 'bg-yellow-200' : 
                  'bg-red-200'
                }`}
                title={`Day ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>4 weeks ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
