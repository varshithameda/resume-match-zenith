
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Users, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  FileText, 
  Zap,
  ArrowRight,
  Star,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced semantic analysis using BERT and NLP to understand context beyond keywords"
    },
    {
      icon: Target,
      title: "Precision Scoring",
      description: "Custom weight-based algorithms that score candidates on skills, experience, and qualifications"
    },
    {
      icon: BarChart3,
      title: "Gap Analysis",
      description: "Identify missing skills and qualifications with detailed recommendations"
    },
    {
      icon: Users,
      title: "Bias-Free Results",
      description: "Ensure fair evaluation without personal identifiers or demographic bias"
    },
    {
      icon: Clock,
      title: "Instant Processing",
      description: "Process hundreds of resumes in seconds with real-time matching results"
    },
    {
      icon: FileText,
      title: "Multi-Format Support",
      description: "Handle PDF, DOCX, and image files with OCR technology"
    }
  ];

  const stats = [
    { label: "Faster Hiring", value: "10x", icon: TrendingUp },
    { label: "Accuracy Rate", value: "94%", icon: Target },
    { label: "Time Saved", value: "80%", icon: Clock },
    { label: "Happy Recruiters", value: "500+", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Resume Matching
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Find Perfect Candidates
            <br />
            <span className="text-gray-900">10x Faster</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionary AI system that automatically matches resumes to job descriptions with semantic understanding, 
            eliminating bias and saving 80% of your screening time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/upload')}
            >
              Start Matching
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg border-2 hover:bg-gray-50 transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              View Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Recruiting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform combines cutting-edge technology with intuitive design 
              to revolutionize how you discover and evaluate talent.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white">
            <CardContent className="space-y-6">
              <Star className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your Hiring Process?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join hundreds of recruiters who've already accelerated their talent acquisition with our AI-powered matching system.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/upload')}
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
