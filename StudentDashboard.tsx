import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, LogOut, Search, TrendingUp, AlertTriangle, CheckCircle2, Clock, BookMarked, ChevronDown, ChevronUp, Code2 } from "lucide-react";
import { LibraryData, StudentData } from "@/types";

interface StudentDashboardProps {
  student: StudentData;
  libraryData: LibraryData;
  onLogout: () => void;
}

export function StudentDashboard({ student, libraryData, onLogout }: StudentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const filteredBooks = libraryData.books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const myTransactions = libraryData.transactions.filter((t) => t.studentId === student.id);
  const activeLoans = myTransactions.filter((t) => !t.returnDate);
  const overdueLoans = activeLoans.filter((t) => new Date(t.dueDate) < new Date());
  const totalFines = myTransactions.reduce((sum, t) => sum + t.fine, 0);

  const getBookTitle = (bookId: string) => {
    return libraryData.books.find((b) => b.id === bookId)?.title || "Unknown";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-emerald-100 text-emerald-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "high":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-amber-600";
    return "text-rose-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Welcome, {student.name}</h1>
              <p className="text-xs text-slate-500">{student.course} • Year {student.year}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="overview">My Performance</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
            <TabsTrigger value="loans">My Loans</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    Performance Overview
                  </CardTitle>
                  <CardDescription>Your academic metrics and AI prediction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-indigo-50 rounded-xl">
                      <p className="text-sm text-slate-500">Attendance</p>
                      <p className="text-2xl font-bold text-indigo-600">{student.attendance}%</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl">
                      <p className="text-sm text-slate-500">Marks</p>
                      <p className="text-2xl font-bold text-emerald-600">{student.marks}%</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl">
                      <p className="text-sm text-slate-500">Assignments</p>
                      <p className="text-2xl font-bold text-amber-600">{student.assignments}%</p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-xl">
                      <p className="text-sm text-slate-500">Participation</p>
                      <p className="text-2xl font-bold text-rose-600">{student.participation}%</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Performance Trend</span>
                        <span className="text-sm text-slate-500">Last 5 assessments</span>
                      </div>
                      <div className="flex items-end gap-2 h-32">
                        {student.trend.map((score, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <span className="text-xs font-semibold text-slate-600">{score}%</span>
                            <div
                              className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all"
                              style={{ height: `${score}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`p-4 rounded-xl ${getRiskColor(student.riskLevel)} mb-4`}>
                      <p className="font-semibold capitalize">{student.riskLevel} Risk</p>
                      <p className="text-sm opacity-80">Predicted performance: {student.performanceScore}%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">AI Recommendations:</p>
                      {student.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookMarked className="h-5 w-5 text-indigo-600" />
                      Library Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Active Loans</span>
                        <Badge variant="secondary">{activeLoans.length}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Overdue</span>
                        <Badge variant={overdueLoans.length > 0 ? "destructive" : "secondary"}>
                          {overdueLoans.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">Total Fines</span>
                        <span className="font-semibold text-slate-900">${totalFines}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-indigo-600" />
                  Subject Performance
                </CardTitle>
                <CardDescription>Click on a subject to view assignment details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {student.subjects.map((subject) => (
                    <div key={subject.subject} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedSubject(expandedSubject === subject.subject ? null : subject.subject)}
                        className="w-full p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <Code2 className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-slate-900">{subject.subject}</p>
                            <p className={`text-sm font-bold ${getScoreColor(subject.score)}`}>
                              {subject.score}%
                            </p>
                          </div>
                        </div>
                        {expandedSubject === subject.subject ? (
                          <ChevronUp className="h-5 w-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        )}
                      </button>
                      {expandedSubject === subject.subject && (
                        <div className="p-4 space-y-3 bg-white">
                          {subject.assignments.map((assignment, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600">{assignment.name}</span>
                                <span className={`font-semibold ${getScoreColor(assignment.percentage)}`}>
                                  {assignment.percentage}%
                                </span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${getProgressColor(assignment.percentage)}`}
                                  style={{ width: `${assignment.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search books..."
                className="pl-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${book.coverColor} text-white`}>
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{book.title}</h3>
                        <p className="text-sm text-slate-500">{book.author}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{book.category}</Badge>
                          <Badge variant={book.availableCopies > 0 ? "default" : "destructive"}>
                            {book.availableCopies > 0 ? "Available" : "Issued"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="loans" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  My Active Loans
                </CardTitle>
                <CardDescription>Books currently issued to you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeLoans.map((loan) => {
                    const isOverdue = new Date(loan.dueDate) < new Date();
                    return (
                      <div key={loan.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <p className="font-semibold text-slate-900">{getBookTitle(loan.bookId)}</p>
                          <p className="text-sm text-slate-500">
                            Issued: {loan.issueDate} • Due: {loan.dueDate}
                          </p>
                        </div>
                        {isOverdue ? (
                          <Badge variant="destructive">Overdue</Badge>
                        ) : (
                          <Badge variant="secondary">On Time</Badge>
                        )}
                      </div>
                    );
                  })}
                  {activeLoans.length === 0 && (
                    <p className="text-center text-slate-500 py-8">No active loans</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Return History</CardTitle>
                <CardDescription>Your past book returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myTransactions.filter((t) => t.returnDate).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <p className="font-semibold text-slate-900">{getBookTitle(transaction.bookId)}</p>
                        <p className="text-sm text-slate-500">
                          Returned: {transaction.returnDate}
                        </p>
                      </div>
                      {transaction.fine > 0 ? (
                        <Badge variant="destructive">Fine: ${transaction.fine}</Badge>
                      ) : (
                        <Badge variant="secondary">No Fine</Badge>
                      )}
                    </div>
                  ))}
                  {myTransactions.filter((t) => t.returnDate).length === 0 && (
                    <p className="text-center text-slate-500 py-8">No return history</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}