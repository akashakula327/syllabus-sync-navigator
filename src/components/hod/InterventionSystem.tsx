
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';

const InterventionSystem = () => {
  const [alertThresholds, setAlertThresholds] = useState({
    progressDelay: 10,
    velocityDrop: 20,
    prerequisiteGap: 1
  });
  
  const [autoAlerts, setAutoAlerts] = useState(true);
  const { toast } = useToast();

  const activeAlerts = [
    {
      id: 1,
      type: 'Progress Delay',
      faculty: 'Dr. Emily Rodriguez',
      subject: 'Computer Networks',
      description: 'Subject is 15% behind schedule',
      severity: 'high',
      created: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'Prerequisite Gap',
      faculty: 'Prof. Michael Chen',
      subject: 'Database Systems',
      description: 'Students lack foundational SQL knowledge',
      severity: 'medium',
      created: '1 day ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'Velocity Drop',
      faculty: 'Dr. Emily Rodriguez',
      subject: 'Operating Systems',
      description: 'Teaching velocity dropped by 25%',
      severity: 'high',
      created: '3 hours ago',
      status: 'active'
    }
  ];

  const catchUpPlans = [
    {
      id: 1,
      subject: 'Computer Networks',
      faculty: 'Dr. Emily Rodriguez',
      plan: 'Combine TCP/UDP topics, Extra 2-hour session on weekends',
      estimatedRecovery: '2 weeks',
      status: 'proposed'
    },
    {
      id: 2,
      subject: 'Database Systems',
      faculty: 'Prof. Michael Chen',
      plan: 'SQL refresher session, Practical exercises focus',
      estimatedRecovery: '1 week',
      status: 'approved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleThresholdUpdate = () => {
    toast({
      title: "Settings Updated",
      description: "Alert thresholds have been updated successfully."
    });
  };

  const handlePlanApproval = (planId: number) => {
    toast({
      title: "Plan Approved",
      description: "Catch-up plan has been approved and faculty notified."
    });
  };

  return (
    <div className="space-y-6">
      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Configuration</CardTitle>
          <p className="text-muted-foreground">Configure automated intervention thresholds</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Automated Alerts</Label>
                <p className="text-sm text-muted-foreground">Enable automatic intervention alerts</p>
              </div>
              <Switch checked={autoAlerts} onCheckedChange={setAutoAlerts} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Progress Delay Threshold (%)</Label>
                <Input
                  type="number"
                  value={alertThresholds.progressDelay}
                  onChange={(e) => setAlertThresholds({
                    ...alertThresholds,
                    progressDelay: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">Alert when behind schedule</p>
              </div>

              <div className="space-y-2">
                <Label>Velocity Drop Threshold (%)</Label>
                <Input
                  type="number"
                  value={alertThresholds.velocityDrop}
                  onChange={(e) => setAlertThresholds({
                    ...alertThresholds,
                    velocityDrop: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">Alert when teaching pace drops</p>
              </div>

              <div className="space-y-2">
                <Label>Prerequisite Gap (days)</Label>
                <Input
                  type="number"
                  value={alertThresholds.prerequisiteGap}
                  onChange={(e) => setAlertThresholds({
                    ...alertThresholds,
                    prerequisiteGap: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">Alert when prerequisites skipped</p>
              </div>
            </div>

            <Button onClick={handleThresholdUpdate}>
              Update Thresholds
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <p className="text-muted-foreground">Current intervention alerts requiring attention</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <div>
                      <h3 className="font-semibold">{alert.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {alert.faculty} - {alert.subject}
                      </p>
                      <p className="text-sm">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.created}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    Create Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI-Suggested Catch-up Plans */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Suggested Catch-up Plans</CardTitle>
          <p className="text-muted-foreground">Automatically generated compensatory scheduling suggestions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {catchUpPlans.map((plan) => (
              <div key={plan.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{plan.subject}</h3>
                    <p className="text-sm text-muted-foreground">{plan.faculty}</p>
                  </div>
                  <Badge variant={plan.status === 'approved' ? 'default' : 'secondary'}>
                    {plan.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Suggested Plan:</p>
                    <p className="text-sm">{plan.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Recovery Time:</p>
                    <p className="text-sm">{plan.estimatedRecovery}</p>
                  </div>
                </div>

                {plan.status === 'proposed' && (
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      size="sm" 
                      onClick={() => handlePlanApproval(plan.id)}
                    >
                      Approve Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      Modify Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intervention History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Interventions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                date: 'Dec 5, 2024',
                action: 'Extra sessions scheduled',
                subject: 'Database Systems',
                faculty: 'Prof. Michael Chen',
                result: 'Progress improved by 12%'
              },
              {
                date: 'Dec 3, 2024',
                action: 'Prerequisite refresher session',
                subject: 'Computer Networks',
                faculty: 'Dr. Emily Rodriguez',
                result: 'Knowledge gap addressed'
              }
            ].map((intervention, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{intervention.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {intervention.faculty} - {intervention.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">{intervention.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{intervention.result}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterventionSystem;
