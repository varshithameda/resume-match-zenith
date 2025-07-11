
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  CheckCircle, 
  AlertTriangle, 
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Eye
} from "lucide-react";
import Header from "@/components/Header";

const Compare = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([1, 2]);

  // Mock candidate data
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      score: 94,
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Jest", "Redux"],
      experience: "5 years",
      education: "BS Computer Science - Stanford University",
      strengths: [
        "Strong React and TypeScript expertise",
        "Full-stack development capabilities", 
        "Cloud infrastructure experience",
        "Excellent testing practices"
      ],
      gaps: [
        "No Python experience mentioned",
        "Limited mobile development experience",
        "No machine learning background"
      ],
      contact: {
        email: "sarah.j@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA"
      },
      details: {
        currentCompany: "Tech Startup Inc.",
        expectedSalary: "$120k - $140k",
        availability: "2 weeks notice",
        workPreference: "Remote/Hybrid"
      },
      scores: {
        technical: 95,
        cultural: 88,
        communication: 92,
        leadership: 85
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Full Stack Engineer",
      score: 89,
      skills: ["JavaScript", "Python", "Django", "PostgreSQL", "Docker", "Jenkins", "React"],
      experience: "4 years",
      education: "MS Software Engineering - UC Berkeley",
      strengths: [
        "Versatile full-stack development skills",
        "Strong database design expertise",
        "DevOps and deployment experience",
        "Backend architecture knowledge"
      ],
      gaps: [
        "Limited TypeScript experience",
        "No AWS cloud experience",
        "Minimal GraphQL knowledge"
      ],
      contact: {
        email: "m.chen@email.com",
        phone: "+1 (555) 234-5678",
        location: "Seattle, WA"
      },
      details: {
        currentCompany: "Enterprise Corp",
        expectedSalary: "$110k - $130k",
        availability: "1 month notice",
        workPreference: "On-site preferred"
      },
      scores: {
        technical: 90,
        cultural: 85,
        communication: 88,
        leadership: 82
      }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Frontend Developer",
      score: 82,
      skills: ["React", "Vue.js", "CSS", "JavaScript", "Figma", "Sass", "Webpack"],
      experience: "3 years",
      education: "BS Web Design - NYU",
      strengths: [
        "Strong UI/UX design skills",
        "Modern frontend frameworks",
        "Creative problem solving",
        "User-centered development"
      ],
      gaps: [
        "Limited backend development",
        "No cloud infrastructure experience",
        "Minimal testing experience"
      ],
      contact: {
        email: "emily.r@email.com",
        phone: "+1 (555) 345-6789",
        location: "New York, NY"
      },
      details: {
        currentCompany: "Design Agency LLC",
        expectedSalary: "$90k - $110k",
        availability: "Immediate",
        workPreference: "Remote"
      },
      scores: {
        technical: 80,
        cultural: 90,
        communication: 85,
        leadership: 78
      }
    },
    {
      id: 4,
      name: "David Kim",
      title: "Software Engineer",
      score: 76,
      skills: ["Java", "Spring", "MySQL", "Jenkins", "Git", "Maven", "REST APIs"],
      experience: "6 years",
      education: "BS Computer Engineering - MIT",
      strengths: [
        "Extensive enterprise experience",
        "Strong backend architecture skills",
        "CI/CD pipeline expertise",
        "System scalability knowledge"
      ],
      gaps: [
        "No modern frontend frameworks",
        "Limited cloud platform knowledge",
        "Minimal JavaScript experience"
      ],
      contact: {
        email: "d.kim@email.com",
        phone: "+1 (555) 456-7890",
        location: "Boston, MA"
      },
      details: {
        currentCompany: "Fortune 500 Corp",
        expectedSalary: "$130k - $150k",
        availability: "3 weeks notice",
        workPreference: "Hybrid"
      },
      scores: {
        technical: 85,
        cultural: 75,
        communication: 80,
        leadership: 88
      }
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const selectedCandidateData = selectedCandidates.map(id => 
    candidates.find(c => c.id === id)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Compare Candidates
              </h1>
              <p className="text-gray-600">
                Side-by-side comparison of candidate profiles and matching scores
              </p>
            </div>
          </div>

          {/* Candidate Selection */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                Select Candidates to Compare
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Candidate</label>
                  <Select 
                    value={selectedCandidates[0]?.toString()} 
                    onValueChange={(value) => setSelectedCandidates([parseInt(value), selectedCandidates[1]])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select first candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map((candidate) => (
                        <SelectItem key={candidate.id} value={candidate.id.toString()}>
                          {candidate.name} - {candidate.score}% match
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Second Candidate</label>
                  <Select 
                    value={selectedCandidates[1]?.toString()} 
                    onValueChange={(value) => setSelectedCandidates([selectedCandidates[0], parseInt(value)])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select second candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map((candidate) => (
                        <SelectItem key={candidate.id} value={candidate.id.toString()}>
                          {candidate.name} - {candidate.score}% match
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison View */}
          {selectedCandidateData.length === 2 && (
            <div className="grid lg:grid-cols-2 gap-8">
              {selectedCandidateData.map((candidate, index) => (
                <Card key={candidate.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{candidate.name}</CardTitle>
                        <p className="opacity-90">{candidate.title}</p>
                      </div>
                      <Badge className={`${getScoreColor(candidate.score)} border-0 text-lg px-3 py-1`}>
                        {candidate.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="analysis">Analysis</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{candidate.experience} of experience</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Award className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{candidate.education}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{candidate.contact.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{candidate.contact.phone}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{candidate.contact.location}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-3">Score Breakdown</h4>
                          <div className="space-y-2">
                            {Object.entries(candidate.scores).map(([category, score]) => (
                              <div key={category} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{category}</span>
                                <div className="flex items-center space-x-2">
                                  <Progress value={score} className="w-16 h-2" />
                                  <span className="text-sm font-medium w-8">{score}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="skills" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-3">Technical Skills</h4>
                          <div className="flex flex-wrap gap-2">
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
                          <h4 className="font-medium mb-3 text-green-700 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Strengths
                          </h4>
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
                          <h4 className="font-medium mb-3 text-yellow-700 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Areas for Development
                          </h4>
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

                      <TabsContent value="details" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">Current Company</p>
                            <p className="text-gray-600">{candidate.details.currentCompany}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Expected Salary</p>
                            <p className="text-gray-600">{candidate.details.expectedSalary}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Availability</p>
                            <p className="text-gray-600">{candidate.details.availability}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Work Preference</p>
                            <p className="text-gray-600">{candidate.details.workPreference}</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Comparison Summary */}
          {selectedCandidateData.length === 2 && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Comparison Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Match Scores</h4>
                    <div className="space-y-2">
                      {selectedCandidateData.map((candidate, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm">{candidate.name}</span>
                          <Badge className={getScoreColor(candidate.score)}>
                            {candidate.score}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Experience</h4>
                    <div className="space-y-2">
                      {selectedCandidateData.map((candidate, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm">{candidate.name}</span>
                          <span className="text-sm text-gray-600">{candidate.experience}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Availability</h4>
                    <div className="space-y-2">
                      {selectedCandidateData.map((candidate, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm">{candidate.name}</span>
                          <span className="text-sm text-gray-600">{candidate.details.availability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
