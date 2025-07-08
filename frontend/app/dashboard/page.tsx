"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  AlertTriangle,
  ArrowUpDown,
  FileText,
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

export default function Dashboard() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: "asc" | "desc";
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("spendpilot_analysis_result");
    if (stored) {
      setAnalysisResult(JSON.parse(stored));
    } else {
      router.replace("/upload-statement");
    }
  }, [router]);

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
    localStorage.removeItem("spendpilot_analysis_result");
    router.push("/upload-statement");
  };

  if (!analysisResult) return null;

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
          <Button onClick={resetApp} variant="outline" className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow">
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