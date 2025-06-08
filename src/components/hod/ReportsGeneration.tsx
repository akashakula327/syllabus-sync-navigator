
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../../hooks/use-toast';

const ReportsGeneration = () => {
  const { toast } = useToast();

  const reportTemplates = [
    {
      id: 1,
      name: 'NAAC Compliance Report',
      description: 'Comprehensive syllabus coverage report for NAAC accreditation',
      frequency: 'Semester',
      lastGenerated: '2 weeks ago',
      status: 'available'
    },
    {
      id: 2,
      name: 'NBA Assessment Report',
      description: 'Program outcome mapping and coverage analysis',
      frequency: 'Annual',
      lastGenerated: '1 month ago',
      status: 'available'
    },
    {
      id: 3,
      name: 'Faculty Performance Report',
      description: 'Individual faculty teaching progress and velocity analysis',
      frequency: 'Monthly',
      lastGenerated: '1 week ago',
      status: 'available'
    },
    {
      id: 4,
      name: 'Department Progress Summary',
      description: 'Overall department syllabus completion status',
      frequency: 'Weekly',
      lastGenerated: '2 days ago',
      status: 'available'
    }
  ];

  const historicalData = [
    {
      semester: 'Fall 2024',
      avgProgress: 72,
      completionRate: 89,
      interventions: 12,
      status: 'current'
    },
    {
      semester: 'Spring 2024',
      avgProgress: 78,
      completionRate: 94,
      interventions: 8,
      status: 'completed'
    },
    {
      semester: 'Fall 2023',
      avgProgress: 71,
      completionRate: 87,
      interventions: 15,
      status: 'completed'
    },
    {
      semester: 'Spring 2023',
      avgProgress: 69,
      completionRate: 82,
      interventions: 18,
      status: 'completed'
    }
  ];

  const handleReportGeneration = (reportName: string) => {
    toast({
      title: "Report Generated",
      description: `${reportName} has been generated successfully.`
    });
  };

  const handleDownload = (reportName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${reportName}...`
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generation</CardTitle>
          <p className="text-muted-foreground">Generate common reports instantly</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex-col"
              onClick={() => handleReportGeneration('NAAC Report')}
            >
              <span className="font-semibold">NAAC Report</span>
              <span className="text-xs opacity-80">Accreditation ready</span>
            </Button>
            <Button 
              className="h-20 flex-col"
              variant="outline"
              onClick={() => handleReportGeneration('NBA Report')}
            >
              <span className="font-semibold">NBA Report</span>
              <span className="text-xs opacity-80">Program outcomes</span>
            </Button>
            <Button 
              className="h-20 flex-col"
              variant="outline"
              onClick={() => handleReportGeneration('Progress Summary')}
            >
              <span className="font-semibold">Progress Summary</span>
              <span className="text-xs opacity-80">Current status</span>
            </Button>
            <Button 
              className="h-20 flex-col"
              variant="outline"
              onClick={() => handleReportGeneration('Custom Report')}
            >
              <span className="font-semibold">Custom Report</span>
              <span className="text-xs opacity-80">Configurable</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <p className="text-muted-foreground">Pre-configured report templates</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportTemplates.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {report.frequency}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Last generated: {report.lastGenerated}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(report.name)}
                  >
                    Download
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleReportGeneration(report.name)}
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Trends Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Trends Analysis</CardTitle>
          <p className="text-muted-foreground">Compare progress across semesters</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Semester</th>
                    <th className="text-left p-3">Avg Progress</th>
                    <th className="text-left p-3">Completion Rate</th>
                    <th className="text-left p-3">Interventions</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalData.map((semester, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{semester.semester}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span>{semester.avgProgress}%</span>
                          <div className={`text-xs ${
                            index > 0 && semester.avgProgress > historicalData[index - 1].avgProgress 
                              ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {index > 0 && (
                              semester.avgProgress > historicalData[index - 1].avgProgress ? '↗' : '↘'
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{semester.completionRate}%</td>
                      <td className="p-3">{semester.interventions}</td>
                      <td className="p-3">
                        <Badge variant={semester.status === 'current' ? 'default' : 'secondary'}>
                          {semester.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">+3%</p>
                <p className="text-sm text-green-700">Progress improvement this semester</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">89%</p>
                <p className="text-sm text-blue-700">Current completion rate</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">-6</p>
                <p className="text-sm text-purple-700">Fewer interventions needed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <p className="text-muted-foreground">Create customized reports with specific parameters</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Progress Report</SelectItem>
                  <SelectItem value="compliance">Compliance Report</SelectItem>
                  <SelectItem value="comparison">Comparison Report</SelectItem>
                  <SelectItem value="intervention">Intervention Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="last">Last Semester</SelectItem>
                  <SelectItem value="year">Academic Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Scope</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department">Entire Department</SelectItem>
                  <SelectItem value="faculty">Specific Faculty</SelectItem>
                  <SelectItem value="subject">Specific Subject</SelectItem>
                  <SelectItem value="section">Specific Section</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => handleReportGeneration('Custom Report')}>
              Generate Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsGeneration;
