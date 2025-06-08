
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../../hooks/use-toast';

const QuickLog = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const { toast } = useToast();

  const subjects = [
    { id: 'cs301', name: 'Data Structures & Algorithms' },
    { id: 'cs302', name: 'Database Management Systems' },
    { id: 'cs303', name: 'Computer Networks' }
  ];

  const units = {
    'cs301': [
      { id: 'unit1', name: 'Unit 1: Arrays and Linked Lists' },
      { id: 'unit2', name: 'Unit 2: Stacks and Queues' },
      { id: 'unit3', name: 'Unit 3: Trees and Graphs' }
    ]
  };

  const topics = {
    'unit1': [
      'Introduction to Arrays',
      'Array Operations',
      'Linked List Basics',
      'Singly Linked Lists',
      'Doubly Linked Lists',
      'Circular Linked Lists'
    ],
    'unit2': [
      'Stack Implementation',
      'Stack Applications',
      'Queue Implementation', 
      'Circular Queue',
      'Priority Queue',
      'Deque'
    ]
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubmit = () => {
    if (!selectedSubject || !selectedUnit || selectedTopics.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select subject, unit, and at least one topic.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Topics Logged Successfully!",
      description: `${selectedTopics.length} topics marked as completed.`
    });

    // Reset form
    setSelectedTopics([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Quick Topic Logger</CardTitle>
          <p className="text-muted-foreground">Log completed topics in under 30 seconds</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Unit</label>
              <Select onValueChange={setSelectedUnit} disabled={!selectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSubject && units[selectedSubject as keyof typeof units]?.map(unit => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedUnit && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Topics Covered Today</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topics[selectedUnit as keyof typeof topics]?.map(topic => (
                  <div key={topic} className="flex items-center space-x-2">
                    <Checkbox
                      id={topic}
                      checked={selectedTopics.includes(topic)}
                      onCheckedChange={() => handleTopicToggle(topic)}
                    />
                    <label htmlFor={topic} className="text-sm">
                      {topic}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-muted-foreground">
              {selectedTopics.length} topics selected
            </p>
            <Button onClick={handleSubmit} disabled={selectedTopics.length === 0}>
              Log Topics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Today, 2:30 PM', subject: 'Data Structures', topics: 3 },
              { date: 'Yesterday, 11:45 AM', subject: 'Database Systems', topics: 2 },
              { date: 'Dec 5, 3:15 PM', subject: 'Computer Networks', topics: 4 }
            ].map((log, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{log.subject}</p>
                  <p className="text-sm text-muted-foreground">{log.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{log.topics} topics</p>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickLog;
