"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Target, AlertCircle, CheckCircle2 } from "lucide-react";
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
  const [processedData, setProcessedData] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    const validTypes = ["application/pdf", "application/json", "text/plain"];
    const isValidType = validTypes.includes(file.type) || 
                       file.name.endsWith('.json') || 
                       file.name.endsWith('.pdf');
    
    if (!isValidType) {
      setError("Please upload a PDF or JSON file containing your bank statement");
      return;
    }

    setUploadedFile(file);
    setState("loading");
    setError("");
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const analysisResult = await uploadStatement(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setProcessedData(analysisResult);
      setState("success");
    
      setTimeout(() => {
        localStorage.setItem("spendpilot_analysis_result", JSON.stringify(analysisResult));
        router.push("/dashboard");
      }, 1000);
      
    } catch (error: any) {
      console.error("Upload error:", error);
      
      let errorMessage = "Failed to process your statement. Please try again.";
      
      if (error.response?.status === 422) {
        errorMessage = "Invalid file format. Please ensure your file contains valid bank statement data.";
      } else if (error.response?.status === 413) {
        errorMessage = "File too large. Please upload a smaller file.";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map((err: any) => err.msg || err).join(", ");
        }
      } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = "Request timeout. The file might be too large or the server is busy.";
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
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf] text-white overflow-x-hidden relative font-sans">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-blue-400/20 rounded-full blur-[120px] shadow-2xl animate-pulse"></div>
          <div className="absolute top-2/3 right-1/4 w-[24rem] h-[24rem] bg-fuchsia-500/20 rounded-full blur-[100px] shadow-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[28rem] h-[28rem] bg-indigo-400/20 rounded-full blur-[100px] shadow-xl animate-pulse delay-2000"></div>
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/10 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/10 to-transparent z-10" />
        </div>
        <Navigation />
        <div className="min-h-screen p-4">
          <div className="max-w-4xl mx-auto mt-5">
            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <CardContent className="p-4 sm:p-8">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 sm:p-12 text-center transition-all duration-200 ${
                    isDragOver
                      ? "border-blue-500 bg-blue-400/10"
                      : "border-white/20 hover:border-blue-400 bg-white/5"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Upload Your Bank Statement
                  </h3>
                  <p className="text-gray-200 mb-6 text-sm sm:text-base">
                    Drag and drop your bank statement here, or click to browse
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white">
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf] text-white flex items-center justify-center">
        <Card className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-100 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {uploadProgress < 95 ? "Uploading..." : "Processing..."}
            </h2>
            <p className="text-gray-100 mb-4">
              {uploadProgress < 95 
                ? "Uploading your bank statement..." 
                : "Analyzing your data and extracting insights..."
              }
            </p>
            <div className="bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-100">
              {uploadProgress.toFixed(0)}% complete
            </p>
            <button
              onClick={resetUpload}
              className="mt-4 text-sm text-gray-300 hover:text-white transition-colors underline"
            >
              Cancel
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf] text-white flex items-center justify-center">
        <Card className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Analysis Complete!
            </h2>
            <p className="text-gray-100 mb-4">
              Your bank statement has been successfully analyzed. Redirecting to dashboard...
            </p>
            <div className="bg-green-200 rounded-full h-3 mb-2">
              <div className="bg-green-600 h-3 rounded-full w-full"></div>
            </div>
            <p className="text-sm text-gray-100">
              Processing complete
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#a21caf] text-white flex items-center justify-center">
        <Card className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Upload Failed
            </h2>
            <Alert className="mb-6 border-red-500/50 bg-red-900/20 backdrop-blur-sm text-left">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
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
    );
  }

  return null;
}