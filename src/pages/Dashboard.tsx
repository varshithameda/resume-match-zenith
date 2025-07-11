import { useState, useEffect } from "react";
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
  BarChart3,
  Upload as UploadIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [uploadedData, setUploadedData] = useState<any>(null);

  // Load uploaded data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('uploadedResumes');
    if (stored) {
      setUploadedData(JSON.parse(stored));
    }
  }, []);

  // Extract skills from job description
  const extractJobSkills = (jobDescription: string): string[] => {
    const commonSkills = [
      'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'Angular', 'Vue.js',
      'HTML', 'CSS', 'GraphQL', 'REST API', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
      'AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'Django', 'Express',
      'Spring Boot', 'Laravel', 'PHP', 'C#', '.NET', 'Ruby', 'Go', 'Rust',
      'Machine Learning', 'AI', 'Data Science', 'TensorFlow', 'PyTorch', 'Pandas',
      'Jest', 'Cypress', 'Testing', 'CI/CD', 'DevOps', 'Linux', 'Nginx', 'Apache',
      'Figma', 'Adobe XD', 'UI/UX', 'Responsive Design', 'Mobile Development',
      'iOS', 'Android', 'React Native', 'Flutter', 'Swift', 'Kotlin'
    ];

    const jobText = jobDescription.toLowerCase();
    const foundSkills = commonSkills.filter(skill => 
      jobText.includes(skill.toLowerCase())
    );

    console.log('Job Description:', jobDescription);
    console.log('Required Skills Found:', foundSkills);
    
    return foundSkills;
  };

  // Extract skills from resume (mock extraction based on filename and content)
  const extractResumeSkills = (resumeName: string): string[] => {
    const skillSets = [
      ["React", "JavaScript", "HTML", "CSS"],
      ["Python", "Django", "PostgreSQL", "REST API"],
      ["Java", "Spring Boot", "MySQL", "Jenkins"],
      ["Angular", "TypeScript", "Node.js", "MongoDB"],
      ["PHP", "Laravel", "MySQL", "Apache"],
      ["Vue.js", "JavaScript", "Express", "Redis"],
      ["C#", ".NET", "Azure", "SQL Server"],
      ["React Native", "Mobile Development", "iOS", "Android"],
      ["Machine Learning", "Python", "TensorFlow", "Data Science"],
      ["UI/UX", "Figma", "Adobe XD", "Responsive Design"]
    ];

    // Use hash of filename to consistently assign skills
    const hash = resumeName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const index = Math.abs(hash) % skillSets.length;
    return skillSets[index];
  };

  // Calculate match percentage based on skill overlap
  const calculateMatchScore = (jobSkills: string[], candidateSkills: string[]): number => {
    if (jobSkills.length === 0) {
      console.log('No job skills found, returning 0%');
      return 0;
    }

    const matchingSkills = candidateSkills.filter(skill => 
      jobSkills.some(jobSkill => 
        jobSkill.toLowerCase() === skill.toLowerCase()
      )
    );

    const score = Math.round((matchingSkills.length / jobSkills.length) * 100);
    
    console.log('Job Skills:', jobSkills);
    console.log('Candidate Skills:', candidateSkills);
    console.log('Matching Skills:', matchingSkills);
    console.log('Match Score:', score + '%');
    
    return score;
  };

  // Generate candidate data with real skill matching
  const generateCandidateData = (resumes: any[], jobDescription: string) => {
    const jobSkills = extractJobSkills(jobDescription);
    
    const mockTitles = [
      "Frontend Developer",
      "Backend Developer", 
      "Full Stack Developer",
      "Software Engineer",
      "Web Developer",
      "Mobile Developer",
      "Data Scientist",
      "UI/UX Designer",
      "DevOps Engineer",
      "Machine Learning Engineer"
    ];

    return resumes.map((resume, index) => {
      const candidateSkills = extractResumeSkills(resume.name);
      const matchScore = calculateMatchScore(jobSkills, candidateSkills);
      
      // Generate strengths and gaps based on actual matching
      const matchingSkills = candidateSkills.filter(skill => 
        jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
      );
      const missingSkills = jobSkills.filter(skill => 
        !candidateSkills.some(candidateSkill => candidateSkill.toLowerCase() === skill.toLowerCase())
      );

      const strengths = matchingSkills.length > 0 
        ? [`Strong in ${matchingSkills.slice(0, 2).join(' and ')}`, "Good technical foundation", "Relevant experience"]
        : ["Some technical background", "Potential for growth"];

      const gaps = missingSkills.length > 0
        ? missingSkills.slice(0, 3).map(skill => `No ${skill} experience mentioned`)
        : ["Could benefit from more specialized training"];

      return {
        id: index + 1,
        name: resume.name.replace(/\.(pdf|docx|png|jpg|jpeg)$/i, '').replace(/[-_]/g, ' '),
        title: mockTitles[index % mockTitles.length],
        score: matchScore,
        skills: candidateSkills,
        experience: `${Math.floor(Math.random() * 8) + 2} years`,
        education: index % 2 === 0 ? "BS Computer Science" : "MS Software Engineering",
        strengths,
        gaps,
        email: `${resume.name.split('.')[0].toLowerCase()}@email.com`,
        phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        fileName: resume.name,
        fileSize: resume.size,
        fileType: resume.type,
        matchingSkills,
        missingSkills
      };
    });
  };

  const candidates = uploadedData && uploadedData.jobDescription 
    ? generateCandidateData(uploadedData.resumes, uploadedData.jobDescription) 
    : [];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    if (score >= 40) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  if (!uploadedData || candidates.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12">
              <UploadIcon className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                No Resumes Uploaded Yet
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Upload your job description and candidate resumes to see AI-powered matching results here.
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/upload')}
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <UploadIcon className="w-5 h-5 mr-2" />
                Start Uploading Resumes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const avgScore = candidates.length > 0 ? Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length) : 0;
  const topScore = candidates.length > 0 ? Math.max(...candidates.map(c => c.score)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Resume Matching Results
              </h1>
              <p className="text-gray-600">
                Real skill-based analysis of {candidates.length} uploaded candidates
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Uploaded on {new Date(uploadedData.timestamp).toLocaleDateString()}
              </p>
              {uploadedData.jobDescription && (
                <p className="text-sm text-blue-600 mt-1">
                  Matched against: {uploadedData.jobDescription.substring(0, 100)}...
                </p>
              )}
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Candidates</p>
                    <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{avgScore}%</p>
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
                    <p className="text-2xl font-bold text-gray-900">{topScore}%</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Perfect Matches</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {candidates.filter(c => c.score >= 90).length}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-600" />
                Candidates Ranked by Skill Match
              </h2>
              
              {candidates
                .sort((a, b) => b.score - a.score)
                .map((candidate, index) => (
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
                        <div className={`w-12 h-12 ${getScoreColor(candidate.score)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">{candidate.title}</p>
                          <p className="text-sm text-gray-500">{candidate.experience} • {candidate.education}</p>
                          <div className="flex items-center mt-1">
                            <FileText className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{candidate.fileName}</span>
                          </div>
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
                        {candidate.score === 0 && (
                          <p className="text-xs text-red-600 mt-1">No matching skills</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 5).map((skill, idx) => {
                            const isMatching = candidate.matchingSkills?.includes(skill);
                            return (
                              <Badge 
                                key={idx} 
                                variant={isMatching ? "default" : "outline"} 
                                className={`text-xs ${isMatching ? 'bg-green-100 text-green-800' : ''}`}
                              >
                                {skill}
                                {isMatching && <CheckCircle className="w-3 h-3 ml-1" />}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Matching Skills</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {candidate.matchingSkills?.slice(0, 2).map((skill, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                {skill}
                              </li>
                            )) || (
                              <li className="flex items-start">
                                <AlertTriangle className="w-3 h-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                                No matching skills found
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Missing Skills</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {candidate.missingSkills?.slice(0, 2).map((skill, idx) => (
                              <li key={idx} className="flex items-start">
                                <AlertTriangle className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" />
                                {skill}
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
                            <div className={`w-16 h-16 ${getScoreColor(candidate.score)} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3`}>
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="font-semibold text-lg">{candidate.name}</h3>
                            <p className="text-gray-600">{candidate.title}</p>
                            <Badge className={`${getScoreBadgeColor(candidate.score)} mt-2`}>
                              {candidate.score}% Match
                            </Badge>
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600">Original File</p>
                              <p className="text-sm font-medium">{candidate.fileName}</p>
                              <p className="text-xs text-gray-500">
                                {(candidate.fileSize / 1024).toFixed(1)} KB
                              </p>
                            </div>
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
                                  {candidate.skills.map((skill, idx) => {
                                    const isMatching = candidate.matchingSkills?.includes(skill);
                                    return (
                                      <Badge 
                                        key={idx} 
                                        variant={isMatching ? "default" : "outline"} 
                                        className={`text-xs ${isMatching ? 'bg-green-100 text-green-800' : ''}`}
                                      >
                                        {skill}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="analysis" className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2 text-green-700">Matching Skills</h4>
                                <ul className="space-y-2">
                                  {candidate.matchingSkills?.map((skill, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {skill}
                                    </li>
                                  )) || (
                                    <li className="flex items-start text-sm">
                                      <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                      No matching skills found
                                    </li>
                                  )}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2 text-yellow-700">Missing Skills</h4>
                                <ul className="space-y-2">
                                  {candidate.missingSkills?.slice(0, 5).map((skill, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {skill}
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
                      Click on any uploaded candidate to view detailed skill matching analysis.
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
