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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 pt-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">SpendPilot</h1>
              </div>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Upload your bank statement and get AI-powered insights into your
                spending habits and financial runway
              </p>
            </div>

            {/* Upload Area */}
            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <CardContent className="p-8">
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
                    isDragOver
                      ? "border-blue-500 bg-blue-400/10"
                      : "border-white/20 hover:border-blue-400 bg-white/5"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Upload Your Bank Statement
                  </h3>
                  <p className="text-gray-200 mb-6">
                    Drag and drop your PDF bank statement here, or click to
                    browse
                  </p>
                  <button
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FileText className="h-6 w-6 relative z-10" />
                  <span className="relative z-10">Choose File</span>
                </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Maximum 5MB</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
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
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                SpendPilot Analysis
              </h1>
            </div>
            <Button onClick={resetApp} variant="outline">
              Upload New Statement
            </Button>
          </div>

          {/* Warning Banner */}
          {analysisResult.stats.runway_days < 7 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Low Runway Alert:</strong> Based on your current
                spending pattern, you have approximately{" "}
                {analysisResult.stats.runway_days.toFixed(1)} days of runway
                remaining. Consider reducing expenses or increasing income.
              </AlertDescription>
            </Alert>
          )}

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Daily Spend
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analysisResult.stats.avg_daily_spend)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on transaction history
                </p>
              </CardContent>
            </Card>

            <Card>
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
                <p className="text-xs text-muted-foreground">
                  Total outgoing transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Financial Runway
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
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
                <p className="text-xs text-muted-foreground">
                  At current spending rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>AI Spending Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {analysisResult.summary}
              </p>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center gap-2">
                        Date
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("desc")}
                    >
                      <div className="flex items-center gap-2">
                        Description
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center gap-2">
                        Amount
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
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
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {formatDate(transaction.date)}
                      </TableCell>
                      <TableCell>{transaction.desc}</TableCell>
                      <TableCell
                        className={
                          transaction.type === "debit"
                            ? "text-red-600"
                            : "text-green-600"
                        }
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
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Chart Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Chart coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
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
