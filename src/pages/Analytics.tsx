
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Brain,
  Award,
  Clock,
  Filter,
  Download
} from "lucide-react";
import Header from "@/components/Header";

const Analytics = () => {
  // Mock data for charts
  const skillsData = [
    { skill: 'React', count: 3, percentage: 75 },
    { skill: 'JavaScript', count: 4, percentage: 100 },
    { skill: 'TypeScript', count: 2, percentage: 50 },
    { skill: 'Node.js', count: 2, percentage: 50 },
    { skill: 'Python', count: 1, percentage: 25 },
    { skill: 'AWS', count: 1, percentage: 25 }
  ];

  const scoreDistribution = [
    { range: '90-100', count: 1, color: '#10B981' },
    { range: '80-89', count: 2, color: '#3B82F6' },
    { range: '70-79', count: 1, color: '#F59E0B' },
    { range: '60-69', count: 0, color: '#EF4444' }
  ];

  const experienceData = [
    { years: '1-2', count: 0 },
    { years: '3-4', count: 2 },
    { years: '5-6', count: 2 },
    { years: '7+', count: 0 }
  ];

  const matchingTrends = [
    { batch: 'Batch 1', avgScore: 78, candidates: 5 },
    { batch: 'Batch 2', avgScore: 82, candidates: 6 },
    { batch: 'Batch 3', avgScore: 85, candidates: 4 },
    { batch: 'Current', avgScore: 85, candidates: 4 }
  ];

  const diversityData = [
    { category: 'Frontend Heavy', value: 50, color: '#8B5CF6' },
    { category: 'Full Stack', value: 25, color: '#06B6D4' },
    { category: 'Backend Focus', value: 25, color: '#10B981' }
  ];

  const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Recruitment Analytics
              </h1>
              <p className="text-gray-600">
                Comprehensive insights into your hiring pipeline and candidate quality
              </p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Processed</p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12% this month
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Match Score</p>
                    <p className="text-2xl font-bold text-gray-900">82.5%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5.2% improvement
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">High Matches (80+)</p>
                    <p className="text-2xl font-bold text-gray-900">68%</p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <Award className="w-3 h-3 mr-1" />
                      Quality candidates
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Process Time</p>
                    <p className="text-2xl font-bold text-gray-900">8.2s</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      -3s faster
                    </p>
                  </div>
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="skills" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
              <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
              <TabsTrigger value="scores">Score Distribution</TabsTrigger>
              <TabsTrigger value="trends">Matching Trends</TabsTrigger>
              <TabsTrigger value="diversity">Diversity Insights</TabsTrigger>
            </TabsList>

            {/* Skills Analysis */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Most Common Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={skillsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="skill" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Skills Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillsData.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.skill}</span>
                            <Badge variant="outline">{skill.percentage}%</Badge>
                          </div>
                          <Progress value={skill.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Experience Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={experienceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="years" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Score Distribution */}
            <TabsContent value="scores" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={scoreDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ range, count }) => `${range}: ${count}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {scoreDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Score Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {scoreDistribution.map((range, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: range.color }}
                            ></div>
                            <div>
                              <p className="font-medium">{range.range}% Match</p>
                              <p className="text-sm text-gray-600">
                                {range.count} candidate{range.count !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            className="text-white"
                            style={{ backgroundColor: range.color }}
                          >
                            {((range.count / 4) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Matching Trends */}
            <TabsContent value="trends" className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Average Match Scores Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={matchingTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="batch" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="avgScore" 
                          stroke="#3B82F6" 
                          fill="url(#colorScore)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Processing Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Average Processing Time</span>
                        <Badge className="bg-green-100 text-green-800">8.2s</Badge>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-sm text-gray-600">
                        15% faster than industry average
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Match Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>High-Quality Matches</span>
                        <Badge className="bg-blue-100 text-blue-800">68%</Badge>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-sm text-gray-600">
                        Above 80% match threshold
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Diversity Insights */}
            <TabsContent value="diversity" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Candidate Profile Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={diversityData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ category, value }) => `${category}: ${value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {diversityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Hiring Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Strong Match Found</h4>
                        <p className="text-sm text-green-700">
                          Sarah Johnson shows 94% compatibility with your requirements. 
                          Consider fast-tracking for interview.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Skill Gap Analysis</h4>
                        <p className="text-sm text-blue-700">
                          Most candidates lack Python experience. Consider offering training 
                          or adjusting requirements.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">Pipeline Health</h4>
                        <p className="text-sm text-yellow-700">
                          Good candidate quality overall. Continue current sourcing strategy.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
