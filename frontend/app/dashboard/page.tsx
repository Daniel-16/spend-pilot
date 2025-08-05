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
  PieChart,
  BarChart3,
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
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

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

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

export default function Dashboard() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
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
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  const calculateStats = () => {
    if (!analysisResult)
      return { avgDailySpend: 0, totalDebit: 0, totalCredit: 0 };

    const debits = analysisResult.transactions.filter((t) => t.amount < 0);
    const credits = analysisResult.transactions.filter((t) => t.amount > 0);

    const totalDebit = Math.abs(debits.reduce((sum, t) => sum + t.amount, 0));
    const totalCredit = credits.reduce((sum, t) => sum + t.amount, 0);

    const dateRange = new Set(
      analysisResult.transactions.map((t) => t.date.split("T")[0])
    );
    const avgDailySpend = totalDebit / dateRange.size;

    return { avgDailySpend, totalDebit, totalCredit };
  };

  const prepareChartData = () => {
    if (!analysisResult)
      return { dailySpending: [], categoryData: [], monthlyData: [] };

    const dailySpending = analysisResult.transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, transaction) => {
        const date = transaction.date.split("T")[0];
        const existing = acc.find((item) => item.date === date);
        if (existing) {
          existing.amount += Math.abs(transaction.amount);
        } else {
          acc.push({
            date: formatDate(date),
            amount: Math.abs(transaction.amount),
            balance: transaction.balance,
          });
        }
        return acc;
      }, [] as { date: string; amount: number; balance: number }[])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const categoryData = Object.entries(analysisResult.spending_by_category)
      .filter(([category, amount]) => category !== "Income" && amount > 0)
      .map(([category, amount]) => ({
        name: category,
        value: amount,
        percentage: (
          (amount /
            Object.values(analysisResult.spending_by_category).reduce(
              (a, b) => a + b,
              0
            )) *
          100
        ).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);

    const monthlyData = analysisResult.monthly_summary.map((month) => ({
      month: month.month,
      inflow: month.inflow,
      outflow: Math.abs(month.outflow),
      net: month.inflow - Math.abs(month.outflow),
      balance: month.closing_balance,
    }));

    return { dailySpending, categoryData, monthlyData };
  };

  const stats = calculateStats();
  const chartData = prepareChartData();

  const generateSummary = () => {
    if (!analysisResult) return "";

    const topCategory = Object.entries(analysisResult.spending_by_category)
      .filter(([cat, amount]) => cat !== "Income" && amount > 0)
      .sort(([, a], [, b]) => b - a)[0];

    const totalSpent = stats.totalDebit;
    const totalEarned = stats.totalCredit;
    const netFlow = totalEarned - totalSpent;

    return `Based on your transaction history, you spent ${formatCurrency(
      totalSpent
    )} across various categories. Your highest spending category was ${
      topCategory?.[0] || "Other"
    } at ${formatCurrency(topCategory?.[1] || 0)}. ${
      netFlow > 0
        ? `You had a positive cash flow of ${formatCurrency(netFlow)}.`
        : `You had a negative cash flow of ${formatCurrency(
            Math.abs(netFlow)
          )}.`
    } Your average daily spending is ${formatCurrency(stats.avgDailySpend)}.`;
  };

  if (!analysisResult) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
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

        {analysisResult.runway_estimate > 0 &&
          analysisResult.runway_estimate < 7 && (
            <Alert className="border-red-200 bg-red-50/90 backdrop-blur-sm shadow-lg animate-pulse">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 text-sm sm:text-base">
                <strong>Low Runway Alert:</strong> Based on your current
                spending pattern, you have approximately{" "}
                <span className="font-bold">
                  {analysisResult.runway_estimate.toFixed(1)} days
                </span>{" "}
                of runway remaining. Consider reducing expenses or increasing
                income.
              </AlertDescription>
            </Alert>
          )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Daily Spend
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(stats.avgDailySpend)}
              </div>
              <p className="text-xs text-gray-500">
                Based on transaction history
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Spending
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(stats.totalDebit)}
              </div>
              <p className="text-xs text-gray-500">
                Total outgoing transactions
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Income
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalCredit)}
              </div>
              <p className="text-xs text-gray-500">
                Total incoming transactions
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
                  analysisResult.runway_estimate < 7
                    ? "text-red-600"
                    : analysisResult.runway_estimate < 30
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {analysisResult.runway_estimate > 0
                  ? `${analysisResult.runway_estimate.toFixed(1)} days`
                  : "N/A"}
              </div>
              <p className="text-xs text-gray-500">At current spending rate</p>
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Spending Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {generateSummary()}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Daily Spending Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData.dailySpending}>
                    <defs>
                      <linearGradient
                        id="colorSpending"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="date"
                      stroke="#6B7280"
                      fontSize={12}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickFormatter={(value) =>
                        `₦${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(value as number),
                        "Spending",
                      ]}
                      labelStyle={{ color: "#374151" }}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSpending)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-500" />
                Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData.categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) =>
                        `${name}: ${percentage}%`
                      }
                      labelLine={false}
                    >
                      {chartData.categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {chartData.monthlyData.length > 1 && (
            <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Monthly Income vs Spending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                      <YAxis
                        stroke="#6B7280"
                        fontSize={12}
                        tickFormatter={(value) =>
                          `₦${(value / 1000).toFixed(0)}k`
                        }
                      />
                      <Tooltip
                        formatter={(value, name) => [
                          formatCurrency(value as number),
                          name === "inflow"
                            ? "Income"
                            : name === "outflow"
                            ? "Spending"
                            : "Net Flow",
                        ]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="inflow" fill="#10B981" name="Income" />
                      <Bar dataKey="outflow" fill="#EF4444" name="Spending" />
                      <Bar dataKey="net" fill="#3B82F6" name="Net Flow" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        {chartData.categoryData.length > 0 && (
          <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-500" />
                Category Spending Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chartData.categoryData.map((category, index) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">
                        {formatCurrency(category.value)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {category.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-colors shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Recent Transactions
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
                      onClick={() => handleSort("description")}
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
                      onClick={() => handleSort("balance")}
                    >
                      <div className="flex items-center gap-2">
                        Balance
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap"
                      onClick={() => handleSort("category")}
                    >
                      <div className="flex items-center gap-2">
                        Category
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.slice(0, 50).map((transaction, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell className="font-medium whitespace-nowrap">
                        {formatDate(transaction.date)}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {transaction.description}
                      </TableCell>
                      <TableCell
                        className={`whitespace-nowrap font-medium ${
                          transaction.amount < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.amount < 0 ? "-" : "+"}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </TableCell>
                      <TableCell className="whitespace-nowrap font-medium text-gray-700">
                        {formatCurrency(transaction.balance)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.amount < 0 ? "destructive" : "default"
                          }
                          className="whitespace-nowrap"
                        >
                          {transaction.category}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {sortedTransactions.length > 50 && (
                <div className="text-center py-4 text-sm text-gray-500">
                  Showing first 50 of {sortedTransactions.length} transactions
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
