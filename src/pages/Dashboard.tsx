
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Star, 
  TrendingUp, 
  Eye, 
  Download,
  FileText,
  Target,
  Brain,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  // Mock data for demonstration
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      score: 94,
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      experience: "5 years",
      education: "BS Computer Science",
      strengths: ["Strong React expertise", "Full-stack capabilities", "Cloud experience"],
      gaps: ["No Python experience", "Limited mobile development"],
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Full Stack Engineer",
      score: 89,
      skills: ["JavaScript", "Python", "Django", "PostgreSQL", "Docker"],
      experience: "4 years",
      education: "MS Software Engineering",
      strengths: ["Versatile full-stack skills", "Database expertise", "DevOps knowledge"],
      gaps: ["No React experience", "Limited AWS knowledge"],
      email: "m.chen@email.com",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Frontend Developer",
      score: 82,
      skills: ["React", "Vue.js", "CSS", "JavaScript", "Figma"],
      experience: "3 years",
      education: "BS Web Design",
      strengths: ["UI/UX focus", "Modern frameworks", "Design skills"],
      gaps: ["Limited backend experience", "No cloud experience"],
      email: "emily.r@email.com",
      phone: "+1 (555) 345-6789"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Software Engineer",
      score: 76,
      skills: ["Java", "Spring", "MySQL", "Jenkins", "Git"],
      experience: "6 years",
      education: "BS Computer Engineering",
      strengths: ["Enterprise experience", "Strong backend skills", "CI/CD expertise"],
      gaps: ["No modern frontend frameworks", "Limited cloud knowledge"],
      email: "d.kim@email.com",
      phone: "+1 (555) 456-7890"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Resume Matching Results
              </h1>
              <p className="text-gray-600">
                AI-powered analysis of 4 candidates for Senior Frontend Developer position
              </p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <Button variant="outline" onClick={() => navigate('/compare')}>
                <Eye className="w-4 h-4 mr-2" />
                Compare
              </Button>
              <Button onClick={() => navigate('/analytics')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Candidates</p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                  </div>
                  <User className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Match Score</p>
                    <p className="text-2xl font-bold text-gray-900">85%</p>
                  </div>
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Top Score</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Processing Time</p>
                    <p className="text-2xl font-bold text-gray-900">12s</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Candidates List */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-600" />
                Ranked Candidates
              </h2>
              
              {candidates.map((candidate, index) => (
                <Card 
                  key={candidate.id} 
                  className={`border-0 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm ${
                    selectedCandidate === candidate.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCandidate(candidate.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">{candidate.title}</p>
                          <p className="text-sm text-gray-500">{candidate.experience} • {candidate.education}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getScoreBadgeColor(candidate.score)} mb-2`}>
                          {candidate.score}% Match
                        </Badge>
                        <div className="w-24">
                          <Progress 
                            value={candidate.score} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 5).map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Strengths</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {candidate.strengths.slice(0, 2).map((strength, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Gaps</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {candidate.gaps.slice(0, 2).map((gap, idx) => (
                              <li key={idx} className="flex items-start">
                                <AlertTriangle className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" />
                                {gap}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Candidate Detail Panel */}
            <div className="lg:col-span-1">
              {selectedCandidate ? (
                <Card className="border-0 shadow-lg sticky top-24 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Candidate Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const candidate = candidates.find(c => c.id === selectedCandidate);
                      if (!candidate) return null;
                      
                      return (
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="font-semibold text-lg">{candidate.name}</h3>
                            <p className="text-gray-600">{candidate.title}</p>
                            <Badge className={`${getScoreBadgeColor(candidate.score)} mt-2`}>
                              {candidate.score}% Match
                            </Badge>
                          </div>

                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="analysis">Analysis</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="overview" className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Contact</h4>
                                <p className="text-sm text-gray-600">{candidate.email}</p>
                                <p className="text-sm text-gray-600">{candidate.phone}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">All Skills</h4>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.skills.map((skill, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="analysis" className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2 text-green-700">Strengths</h4>
                                <ul className="space-y-2">
                                  {candidate.strengths.map((strength, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2 text-yellow-700">Areas for Development</h4>
                                <ul className="space-y-2">
                                  {candidate.gaps.map((gap, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {gap}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </TabsContent>
                          </Tabs>

                          <div className="pt-4 border-t space-y-2">
                            <Button className="w-full" onClick={() => navigate('/compare')}>
                              <Eye className="w-4 h-4 mr-2" />
                              Compare Candidates
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Download Resume
                            </Button>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Select a Candidate</h3>
                    <p className="text-sm text-gray-600">
                      Click on any candidate to view detailed analysis and matching insights.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
