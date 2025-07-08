"use client";

import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  TrendingDown,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertTriangle,
  ArrowUpDown,
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface Transaction {
  date: string;
  desc: string;
  amount: number;
  type: "debit" | "credit";
}

interface AnalysisResult {
  summary: string;
  stats: {
    avg_daily_spend: number;
    total_debit: number;
    runway_days: number;
  };
  transactions: Transaction[];
}

type AppState = "upload" | "loading" | "results";

export default function SpendPilot() {
  const [state, setState] = useState<AppState>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: "asc" | "desc";
  } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setUploadedFile(file);
    setState("loading");

    // Mock API call
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        summary:
          "You spent heavily on food delivery and entertainment services this month. Your spending pattern shows frequent small transactions, with notable increases during weekends. Consider setting up automatic transfers to savings and reducing impulse purchases.",
        stats: {
          avg_daily_spend: 8500,
          total_debit: 320000,
          runway_days: 5.2,
        },
        transactions: [
          {
            date: "2025-07-01",
            desc: "Uber Eats - Downtown",
            amount: 2100,
            type: "debit",
          },
          {
            date: "2025-07-02",
            desc: "Netflix Subscription",
            amount: 3600,
            type: "debit",
          },
          {
            date: "2025-07-03",
            desc: "Salary Deposit",
            amount: 150000,
            type: "credit",
          },
          {
            date: "2025-07-04",
            desc: "Grocery Store",
            amount: 4500,
            type: "debit",
          },
          {
            date: "2025-07-05",
            desc: "Gas Station",
            amount: 1800,
            type: "debit",
          },
          {
            date: "2025-07-06",
            desc: "Coffee Shop",
            amount: 650,
            type: "debit",
          },
          {
            date: "2025-07-07",
            desc: "Online Shopping",
            amount: 12000,
            type: "debit",
          },
          {
            date: "2025-07-08",
            desc: "ATM Withdrawal",
            amount: 5000,
            type: "debit",
          },
          {
            date: "2025-07-09",
            desc: "Restaurant",
            amount: 3200,
            type: "debit",
          },
          {
            date: "2025-07-10",
            desc: "Freelance Income",
            amount: 25000,
            type: "credit",
          },
        ],
      };
      setAnalysisResult(mockResult);
      setState("results");
    }, 3000);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSort = (key: keyof Transaction) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = analysisResult?.transactions
    ? [...analysisResult.transactions].sort((a, b) => {
        if (!sortConfig) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      })
    : [];

  const resetApp = () => {
    setState("upload");
    setUploadedFile(null);
    setAnalysisResult(null);
    setSortConfig(null);
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
                    Drag and drop your PDF bank statement here, or click to
                    browse
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
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>Maximum 5MB</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>PDF format only</span>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analyzing Your Statement
            </h2>
            <p className="text-gray-600 mb-4">
              Our AI is processing your bank statement and extracting
              insights...
            </p>
            <div className="bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full animate-pulse"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === "results" && analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                SpendPilot Analysis
              </h1>
            </div>
            <Button 
              onClick={resetApp} 
              variant="outline"
              className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow"
            >
              Upload New Statement
            </Button>
          </div>

          {/* Warning Banner */}
          {analysisResult.stats.runway_days < 7 && (
            <Alert className="border-red-200 bg-red-50/90 backdrop-blur-sm shadow-lg animate-pulse">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 text-sm sm:text-base">
                <strong>Low Runway Alert:</strong> Based on your current
                spending pattern, you have approximately{" "}
                <span className="font-bold">{analysisResult.stats.runway_days.toFixed(1)} days</span> of runway
                remaining. Consider reducing expenses or increasing income.
              </AlertDescription>
            </Alert>
          )}

          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Daily Spend
                </CardTitle>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(analysisResult.stats.avg_daily_spend)}
                </div>
                <p className="text-xs text-gray-500">
                  Based on transaction history
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Debits
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(analysisResult.stats.total_debit)}
                </div>
                <p className="text-xs text-gray-500">
                  Total outgoing transactions
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Financial Runway
                </CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    analysisResult.stats.runway_days < 7
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {analysisResult.stats.runway_days.toFixed(1)} days
                </div>
                <p className="text-xs text-gray-500">
                  At current spending rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Summary */}
          <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                AI Spending Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {analysisResult.summary}
              </p>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="min-w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap"
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center gap-2">
                          Date
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleSort("desc")}
                      >
                        <div className="flex items-center gap-2">
                          Description
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap"
                        onClick={() => handleSort("amount")}
                      >
                        <div className="flex items-center gap-2">
                          Amount
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap"
                        onClick={() => handleSort("type")}
                      >
                        <div className="flex items-center gap-2">
                          Type
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTransactions.map((transaction, index) => (
                      <TableRow 
                        key={index}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell className="font-medium whitespace-nowrap">
                          {formatDate(transaction.date)}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {transaction.desc}
                        </TableCell>
                        <TableCell
                          className={`whitespace-nowrap font-medium ${
                            transaction.type === "debit"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {transaction.type === "debit" ? "-" : "+"}
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.type === "debit"
                                ? "destructive"
                                : "default"
                            }
                            className="whitespace-nowrap"
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Chart Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-blue-500" />
                  Spending Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Chart coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                  Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Chart coming soon</p>
                  </div>
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
