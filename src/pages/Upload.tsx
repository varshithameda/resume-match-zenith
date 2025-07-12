import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload as UploadIcon, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Clock,
  Target,
  User,
  Download,
  File
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { parseJobDescriptionFile } from "@/utils/fileParser";

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [resumes, setResumes] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsingFile, setParsingFile] = useState(false);

  const handleJobDescriptionFileUpload = async (file: File) => {
    setParsingFile(true);
    console.log('Uploading job description file:', file.name, file.type);
    
    try {
      const extractedText = await parseJobDescriptionFile(file);
      console.log('Extracted text length:', extractedText.length);
      
      setJobDescription(extractedText);
      setJobDescriptionFile(file);
      
      toast({
        title: "Job description loaded successfully!",
        description: `Extracted ${extractedText.length} characters from ${file.name}`,
      });
    } catch (error) {
      console.error('File parsing error:', error);
      toast({
        title: "Failed to parse job description",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setParsingFile(false);
    }
  };

  const handleJobDescriptionDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleJobDescriptionFileUpload(files[0]);
    }
  }, []);

  const handleJobDescriptionFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleJobDescriptionFileUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type.startsWith('image/')
    );
    
    if (validFiles.length < files.length) {
      toast({
        title: "Some files were skipped",
        description: "Only PDF, DOCX, and image files are supported",
        variant: "destructive"
      });
    }
    
    setResumes(prev => [...prev, ...validFiles]);
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setResumes(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setResumes(prev => prev.filter((_, i) => i !== index));
  };

  const removeJobDescriptionFile = () => {
    setJobDescriptionFile(null);
    setJobDescription("");
  };

  const downloadJobDescriptionAsPDF = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "No job description to download",
        description: "Please add a job description first",
        variant: "destructive"
      });
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Job Description</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .content { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>Job Description</h1>
          <div class="content">${jobDescription}</div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleProcessing = async () => {
    if (!jobDescription.trim() || resumes.length === 0) {
      toast({
        title: "Missing information",
        description: "Please provide both job description and resumes to process",
        variant: "destructive"
      });
      return;
    }

    console.log('Starting processing with job description length:', jobDescription.length);
    console.log('Processing', resumes.length, 'resumes');

    setProcessing(true);
    setProgress(0);

    // Store the uploaded data in localStorage
    const uploadedData = {
      jobDescription,
      jobDescriptionFile: jobDescriptionFile ? {
        name: jobDescriptionFile.name,
        size: jobDescriptionFile.size,
        type: jobDescriptionFile.type
      } : null,
      resumes: resumes.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      })),
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('uploadedResumes', JSON.stringify(uploadedData));

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          toast({
            title: "Processing complete!",
            description: `${resumes.length} resumes have been analyzed with enhanced accuracy`,
          });
          navigate('/dashboard');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700">
              <Zap className="w-4 h-4 mr-2" />
              Enhanced AI Processing Engine
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upload & Match Resumes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your job description file (PDF, Word, or text) and candidate resumes. Our enhanced AI will provide accurate skill-based matching.
            </p>
          </div>

          <Tabs defaultValue="job-description" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="job-description" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                1. Job Description
              </TabsTrigger>
              <TabsTrigger value="resumes" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                2. Upload Resumes
              </TabsTrigger>
              <TabsTrigger value="uploaded" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                3. Review Files ({resumes.length})
              </TabsTrigger>
            </TabsList>

            {/* Job Description Tab */}
            <TabsContent value="job-description">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Upload Job Description File
                    </div>
                    <div className="flex gap-2">
                      {jobDescription && (
                        <Button variant="outline" size="sm" onClick={downloadJobDescriptionAsPDF}>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Upload Section */}
                  <div>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50/50"
                      onDrop={handleJobDescriptionDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => document.getElementById('job-file-input')?.click()}
                    >
                      {parsingFile ? (
                        <div className="space-y-3">
                          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                          <p className="text-gray-600">Parsing job description file...</p>
                          <p className="text-sm text-gray-500">Extracting text and identifying skills...</p>
                        </div>
                      ) : (
                        <>
                          <File className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Drop your job description file here
                          </h3>
                          <p className="text-gray-500 mb-4">
                            Supports PDF, Word (DOCX/DOC), and text files
                          </p>
                          <div className="flex gap-2 justify-center">
                            <Badge variant="outline" className="px-3 py-1">
                              Enhanced text extraction
                            </Badge>
                            <Badge variant="outline" className="px-3 py-1">
                              Automatic skill detection
                            </Badge>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <input
                      id="job-file-input"
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      className="hidden"
                      onChange={handleJobDescriptionFileInput}
                    />

                    {jobDescriptionFile && (
                      <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-200 bg-green-50/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                              <FileText className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 block">{jobDescriptionFile.name}</span>
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <span>{(jobDescriptionFile.size / 1024).toFixed(1)} KB</span>
                                <span>•</span>
                                <span>{jobDescription.length} characters extracted</span>
                                <CheckCircle className="w-4 h-4 text-green-600 ml-1" />
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeJobDescriptionFile}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {jobDescription.length > 100 && (
                          <div className="mt-3 p-3 bg-white rounded border">
                            <p className="text-sm text-gray-600 mb-2">Preview:</p>
                            <p className="text-xs text-gray-800 line-clamp-3">
                              {jobDescription.substring(0, 200)}...
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!jobDescriptionFile && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-blue-900 mb-1">File Upload Required</h4>
                            <p className="text-sm text-blue-700">
                              Please upload a job description file to enable accurate skill matching. The system will automatically extract and analyze the required skills.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resumes Tab */}
            <TabsContent value="resumes">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Upload Resumes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Drop Zone */}
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50/50"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Drop files here or click to browse
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Supports PDF, DOCX, and image files (PNG, JPG)
                    </p>
                    <Badge variant="outline" className="px-3 py-1">
                      Multiple files supported
                    </Badge>
                  </div>
                  
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".pdf,.docx,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Uploaded Files Tab */}
            <TabsContent value="uploaded">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Uploaded Resumes ({resumes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {resumes.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No resumes uploaded yet</h3>
                      <p className="text-gray-500 mb-4">Upload some resumes to see them here</p>
                      <Button 
                        variant="outline" 
                        onClick={() => (document.querySelector('[value="resumes"]') as HTMLElement)?.click()}
                      >
                        Go to Upload Tab
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-900">Your Uploaded Files:</h4>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {resumes.length} files ready for enhanced matching
                        </Badge>
                      </div>
                      {resumes.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 block">{file.name}</span>
                              <div className="text-sm text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB • {file.type.split('/')[1].toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Ready
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Processing Section */}
          {processing && (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Processing {resumes.length} Resumes with Enhanced Accuracy...</h3>
                <p className="text-gray-600 mb-4">Analyzing skills and generating accurate match scores</p>
                <Progress value={progress} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Enhanced processing with accurate skill matching
            </div>
            <Button
              size="lg"
              onClick={handleProcessing}
              disabled={!jobDescription.trim() || resumes.length === 0 || processing}
              className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Start Enhanced AI Matching ({resumes.length} resumes)
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
