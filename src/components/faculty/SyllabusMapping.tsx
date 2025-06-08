
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

const SyllabusMapping = () => {
  const [expandedUnits, setExpandedUnits] = useState<string[]>(['unit1']);

  const syllabusData = {
    'cs301': {
      name: 'Data Structures & Algorithms',
      units: [
        {
          id: 'unit1',
          name: 'Arrays and Linked Lists',
          duration: '3 weeks',
          status: 'completed',
          progress: 100,
          topics: [
            { id: 't1', name: 'Introduction to Arrays', completed: true, prerequisite: null },
            { id: 't2', name: 'Array Operations', completed: true, prerequisite: 't1' },
            { id: 't3', name: 'Linked List Basics', completed: true, prerequisite: 't2' },
            { id: 't4', name: 'Singly Linked Lists', completed: true, prerequisite: 't3' },
            { id: 't5', name: 'Doubly Linked Lists', completed: true, prerequisite: 't4' }
          ]
        },
        {
          id: 'unit2', 
          name: 'Stacks and Queues',
          duration: '2 weeks',
          status: 'in-progress',
          progress: 60,
          topics: [
            { id: 't6', name: 'Stack Implementation', completed: true, prerequisite: 't3' },
            { id: 't7', name: 'Stack Applications', completed: true, prerequisite: 't6' },
            { id: 't8', name: 'Queue Implementation', completed: true, prerequisite: 't7' },
            { id: 't9', name: 'Circular Queue', completed: false, prerequisite: 't8', alert: true },
            { id: 't10', name: 'Priority Queue', completed: false, prerequisite: 't9' }
          ]
        },
        {
          id: 'unit3',
          name: 'Trees and Graphs', 
          duration: '4 weeks',
          status: 'pending',
          progress: 0,
          topics: [
            { id: 't11', name: 'Binary Trees', completed: false, prerequisite: 't8' },
            { id: 't12', name: 'Tree Traversals', completed: false, prerequisite: 't11' },
            { id: 't13', name: 'Graph Representation', completed: false, prerequisite: 't12' },
            { id: 't14', name: 'Graph Algorithms', completed: false, prerequisite: 't13' }
          ]
        }
      ]
    }
  };

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => 
      prev.includes(unitId) 
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const subject = syllabusData['cs301'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Syllabus Mapping - {subject.name}</CardTitle>
          <p className="text-muted-foreground">Structured unit and topic breakdown with prerequisite tracking</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subject.units.map((unit) => (
              <div key={unit.id} className="border rounded-lg">
                <Collapsible 
                  open={expandedUnits.includes(unit.id)}
                  onOpenChange={() => toggleUnit(unit.id)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 hover:bg-muted cursor-pointer">
                      <div className="flex items-center space-x-3">
                        {expandedUnits.includes(unit.id) ? 
                          <ChevronDown className="h-5 w-5" /> : 
                          <ChevronRight className="h-5 w-5" />
                        }
                        <div>
                          <h3 className="font-semibold">{unit.name}</h3>
                          <p className="text-sm text-muted-foreground">{unit.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(unit.status)}>
                          {unit.status}
                        </Badge>
                        <span className="text-sm font-medium">{unit.progress}%</span>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-4 pb-4">
                      <div className="space-y-2">
                        {unit.topics.map((topic) => (
                          <div 
                            key={topic.id} 
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              topic.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                topic.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`} />
                              <span className={topic.completed ? 'line-through text-muted-foreground' : ''}>
                                {topic.name}
                              </span>
                              {topic.alert && (
                                <div className="flex items-center space-x-1 text-orange-600">
                                  <AlertTriangle className="h-4 w-4" />
                                  <span className="text-xs">Prerequisite gap</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {topic.prerequisite && (
                                <span className="text-xs text-muted-foreground">
                                  Requires: Topic {topic.prerequisite.slice(-1)}
                                </span>
                              )}
                              <Badge variant={topic.completed ? 'default' : 'secondary'}>
                                {topic.completed ? 'Done' : 'Pending'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {unit.status === 'in-progress' && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-700">Next Actions:</p>
                          <ul className="text-sm text-blue-600 mt-1 space-y-1">
                            <li>• Complete "Circular Queue" to maintain prerequisite flow</li>
                            <li>• Schedule catch-up session for delayed topics</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SyllabusMapping;
