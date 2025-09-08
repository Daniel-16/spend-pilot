"use client";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Target,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { uploadStatement } from "@/lib/api";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  balance: number;
  category: string;
}

interface SpendingByCategory {
  [key: string]: number;
}

interface MonthlySummary {
  month: string;
  inflow: number;
  outflow: number;
  closing_balance: number;
}

interface AnalysisResult {
  transactions: Transaction[];
  spending_by_category: SpendingByCategory;
  monthly_summary: MonthlySummary[];
  runway_estimate: number;
}

type AppState = "upload" | "loading" | "error" | "success";

export default function SpendPilot() {
  const [state, setState] = useState<AppState>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processedData, setProcessedData] = useState<AnalysisResult | null>(
    null
  );
  const [currentLoadingText, setCurrentLoadingText] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  const getLoadingMessages = (progress: number) => {
    if (progress <= 15) {
      return [
        "Establishing secure connection...",
        "Validating file format...",
        "Initializing upload process...",
        "Checking file integrity...",
      ];
    } else if (progress <= 35) {
      return [
        "Uploading your statement...",
        "Transferring data securely...",
        "Processing file chunks...",
        "Verifying upload integrity...",
      ];
    } else if (progress <= 55) {
      return [
        "Parsing document structure...",
        "Extracting transaction data...",
        "Identifying data patterns...",
        "Cleaning and validating entries...",
      ];
    } else if (progress <= 75) {
      return [
        "Categorizing transactions...",
        "Analyzing spending patterns...",
        "Calculating financial metrics...",
        "Detecting recurring payments...",
      ];
    } else if (progress <= 90) {
      return [
        "Generating insights...",
        "Creating spending summaries...",
        "Calculating runway estimates...",
        "Building monthly breakdowns...",
      ];
    } else {
      return [
        "Finalizing analysis...",
        "Optimizing data structure...",
        "Preparing dashboard...",
        "Almost ready!",
      ];
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setScrollY(window.scrollY);
      setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (state === "loading") {
      const messages = getLoadingMessages(uploadProgress);
      const interval = setInterval(() => {
        setCurrentLoadingText((prev) => (prev + 1) % messages.length);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [state, uploadProgress]);

  const handleFileUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    const validTypes = ["application/pdf", "application/json", "text/plain"];
    const isValidType =
      validTypes.includes(file.type) ||
      file.name.endsWith(".json") ||
      file.name.endsWith(".pdf");

    if (!isValidType) {
      setError(
        "Please upload a PDF or JSON file containing your bank statement"
      );
      return;
    }

    setUploadedFile(file);
    setState("loading");
    setError("");
    setUploadProgress(0);
    setCurrentLoadingText(0);

    try {
      const progressStages = [
        { target: 15, duration: 800 },
        { target: 35, duration: 1200 },
        { target: 55, duration: 1500 },
        { target: 75, duration: 1800 },
        { target: 90, duration: 1000 },
      ];

      let currentProgress = 0;
      
      for (const stage of progressStages) {
        const startTime = Date.now();
        const startProgress = currentProgress;
        const progressDiff = stage.target - startProgress;
        
        while (currentProgress < stage.target) {
          const elapsed = Date.now() - startTime;
          const stageProgress = Math.min(elapsed / stage.duration, 1);
          currentProgress = startProgress + (progressDiff * stageProgress);
          
          const randomVariation = (Math.random() - 0.5) * 3;
          const displayProgress = Math.max(0, Math.min(stage.target, currentProgress + randomVariation));
          
          setUploadProgress(displayProgress);
          
          if (stageProgress >= 1) break;
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      const analysisResult = await uploadStatement(file);

      setUploadProgress(100);
      setProcessedData(analysisResult);
      setState("success");

      setTimeout(() => {
        localStorage.setItem(
          "spendpilot_analysis_result",
          JSON.stringify(analysisResult)
        );
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      console.error("Upload error:", error);

      let errorMessage = "Failed to process your statement. Please try again.";

      if (error.response?.status === 422) {
        errorMessage =
          "Invalid file format. Please ensure your file contains valid bank statement data.";
      } else if (error.response?.status === 413) {
        errorMessage = "File too large. Please upload a smaller file.";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === "string") {
          errorMessage = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail
            .map((err: any) => err.msg || err)
            .join(", ");
        }
      } else if (
        error.code === "NETWORK_ERROR" ||
        error.message.includes("Network Error")
      ) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (error.code === "ECONNABORTED") {
        errorMessage =
          "Request timeout. The file might be too large or the server is busy.";
      }

      setError(errorMessage);
      setState("error");
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const resetUpload = () => {
    setState("upload");
    setUploadedFile(null);
    setError("");
    setUploadProgress(0);
    setProcessedData(null);
    setCurrentLoadingText(0);
  };

  const retryUpload = () => {
    if (uploadedFile) {
      handleFileUpload(uploadedFile);
    } else {
      resetUpload();
    }
  };

  if (state === "upload") {
    return (
      <div className="min-h-screen bg-white text-white relative font-sans">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px)",
            backgroundSize: "120px 120px, 120px 120px",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-7xl px-6 py-2 h-full">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 8 * 6 }).map((_, i) => {
                  const isBlue = i % 3 === 0;
                  return (
                    <div
                      key={i}
                      className={`rounded-lg w-full pointer-events-none transition-all transform ${
                        isBlue
                          ? "bg-gradient-to-br from-blue-400/25 to-cyan-200/10 border border-blue-200/30 shadow-sm"
                          : "bg-white/30 border border-slate-100/40"
                      }`}
                      style={{ height: "140px", width: "100px" }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Navigation />
        <div className="min-h-screen p-4 pt-24">
          <div className="max-w-4xl mx-auto mt-6">
            <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
              <CardContent className="p-4 sm:p-8">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 sm:p-12 text-center transition-all duration-200 ${
                    isDragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-400 bg-white"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                    Upload Your Bank Statement
                  </h3>
                  <p className="text-slate-600 mb-6 text-sm sm:text-base">
                    Drag and drop your bank statement here, or click to browse
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative inline-flex items-center gap-2 sm:gap-3 bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
                    <span className="relative z-10">Choose File</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.json"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>Maximum 10MB</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>PDF or JSON format</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (state === "loading") {
    const loadingMessages = getLoadingMessages(uploadProgress);
    const currentMessage = loadingMessages[currentLoadingText];

    return (
      <div className="min-h-screen bg-white text-slate-900 relative font-sans overflow-x-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px)",
            backgroundSize: "120px 120px, 120px 120px",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-7xl px-6 py-2 h-full">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 8 * 6 }).map((_, i) => {
                  const isBlue = i % 3 === 0;
                  return (
                    <div
                      key={i}
                      className={`rounded-lg w-full pointer-events-none transition-all transform ${
                        isBlue
                          ? "bg-gradient-to-br from-blue-400/25 to-cyan-200/10 border border-blue-200/30 shadow-sm"
                          : "bg-white/30 border border-slate-100/40"
                      }`}
                      style={{ height: "140px", width: "100px" }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Navigation />
        <div className="min-h-screen p-4 pt-24">
          <div className="max-w-4xl mx-auto mt-6">
            <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="relative mb-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-pulse"></div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Processing Your Statement
                </h2>
                
                <div className="mb-6 min-h-[2rem] flex items-center justify-center">
                  <p 
                    key={currentMessage}
                    className="text-slate-600 text-lg animate-fade-in"
                    style={{
                      animation: 'fadeInSlideUp 0.5s ease-out'
                    }}
                  >
                    {currentMessage}
                  </p>
                </div>
                                
                <div className="mb-4">
                  <div className="bg-slate-100 rounded-full h-3 overflow-hidden relative">
                    <div
                      className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300 relative"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-600">
                      {uploadProgress.toFixed(1)}% complete
                    </span>
                    <span className="text-sm text-blue-600 font-medium">
                      {uploadProgress < 35 ? 'Uploading' : 
                       uploadProgress < 75 ? 'Analyzing' : 'Finalizing'}
                    </span>
                  </div>
                </div>
                                
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-2">
                    {[
                      { label: 'Upload', threshold: 35 },
                      { label: 'Parse', threshold: 55 },
                      { label: 'Analyze', threshold: 75 },
                      { label: 'Complete', threshold: 100 }
                    ].map((stage, index) => (
                      <div key={stage.label} className="flex flex-col items-center">
                        <div 
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            uploadProgress >= stage.threshold 
                              ? 'bg-green-500 shadow-lg' 
                              : uploadProgress >= (stage.threshold - 20)
                              ? 'bg-blue-500 animate-pulse'
                              : 'bg-slate-300'
                          }`}
                        />
                        <span className="text-xs text-slate-500 mt-1">{stage.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={resetUpload}
                  className="mt-2 text-sm text-slate-600 hover:text-slate-900 transition-colors underline opacity-75 hover:opacity-100"
                >
                  Cancel
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
        <style jsx>{`
          @keyframes fadeInSlideUp {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="min-h-screen bg-white text-slate-900 relative font-sans overflow-x-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px)",
            backgroundSize: "120px 120px, 120px 120px",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-7xl px-6 py-2 h-full">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 8 * 6 }).map((_, i) => {
                  const isBlue = i % 3 === 0;
                  return (
                    <div
                      key={i}
                      className={`rounded-lg w-full pointer-events-none transition-all transform ${
                        isBlue
                          ? "bg-gradient-to-br from-blue-400/25 to-cyan-200/10 border border-blue-200/30 shadow-sm"
                          : "bg-white/30 border border-slate-100/40"
                      }`}
                      style={{ height: "140px", width: "100px" }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Navigation />
        <div className="min-h-screen p-4 pt-24">
          <div className="max-w-4xl mx-auto mt-6">
            <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Analysis Complete!
                </h2>
                <p className="text-slate-600 mb-4">
                  Your bank statement has been successfully analyzed.
                  Redirecting to dashboard...
                </p>
                <div className="bg-green-100 rounded-full h-3 mb-2">
                  <div className="bg-green-600 h-3 rounded-full w-full"></div>
                </div>
                <p className="text-sm text-slate-600">Processing complete</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="min-h-screen bg-white text-slate-900 relative font-sans overflow-x-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px)",
            backgroundSize: "120px 120px, 120px 120px",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-7xl px-6 py-2 h-full">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 8 * 6 }).map((_, i) => {
                  const isBlue = i % 3 === 0;
                  return (
                    <div
                      key={i}
                      className={`rounded-lg w-full pointer-events-none transition-all transform ${
                        isBlue
                          ? "bg-gradient-to-br from-blue-400/25 to-cyan-200/10 border border-blue-200/30 shadow-sm"
                          : "bg-white/30 border border-slate-100/40"
                      }`}
                      style={{ height: "140px", width: "100px" }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Navigation />
        <div className="min-h-screen p-4 pt-24">
          <div className="max-w-4xl mx-auto mt-10">
            <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Upload Failed
                </h2>
                <Alert className="mb-6 border-red-200/60 bg-red-50 backdrop-blur-sm text-left">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={retryUpload}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={resetUpload}
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Choose Different File
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}