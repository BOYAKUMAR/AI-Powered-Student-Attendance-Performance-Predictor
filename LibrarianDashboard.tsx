import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, LogOut, Plus, Search, TrendingDown, Users, AlertTriangle, BookMarked, ArrowLeftRight } from "lucide-react";
import { LibraryData, StudentData, Book, Transaction } from "@/types";

interface LibrarianDashboardProps {
  libraryData: LibraryData;
  setLibraryData: React.Dispatch<React.SetStateAction<LibraryData>>;
  students: StudentData[];
  onLogout: () => void;
}

export function LibrarianDashboard({ libraryData, setLibraryData, students, onLogout }: LibrarianDashboardProps) {
  const [activeTab, setActiveTab] = useState("books");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", author: "", isbn: "", category: "Computer Science", totalCopies: 1 });
  const [issueBookId, setIssueBookId] = useState("");
  const [issueStudentId, setIssueStudentId] = useState("");

  const filteredBooks = libraryData.books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTransactions = libraryData.transactions.filter((t) => !t.returnDate);
  const overdueBooks = activeTransactions.filter((t) => new Date(t.dueDate) < new Date());
  const totalFines = libraryData.transactions.reduce((sum, t) => sum + t.fine, 0);

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) return;
    const book: Book = {
      id: `B${String(libraryData.books.length + 1).padStart(3, "0")}`,
      ...newBook,
      availableCopies: newBook.totalCopies,
      coverColor: "bg-indigo-500",
    };
    setLibraryData((prev) => ({ ...prev, books: [...prev.books, book] }));
    setNewBook({ title: "", author: "", isbn: "", category: "Computer Science", totalCopies: 1 });
    setShowAddBook(false);
  };

  const handleIssueBook = () => {
    if (!issueBookId || !issueStudentId) return;
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 14);
    const transaction: Transaction = {
      id: `T${String(libraryData.transactions.length + 1).padStart(3, "0")}`,
      bookId: issueBookId,
      studentId: issueStudentId,
      issueDate: today.toISOString().split("T")[0],
      dueDate: dueDate.toISOString().split("T")[0],
      returnDate: null,
      fine: 0,
    };
    setLibraryData((prev) => ({
      ...prev,
      transactions: [...prev.transactions, transaction],
      books: prev.books.map((b) =>
        b.id === issueBookId ? { ...b, availableCopies: b.availableCopies - 1 } : b
      ),
    }));
    setIssueBookId("");
    setIssueStudentId("");
  };

  const handleReturnBook = (transactionId: string, bookId: string) => {
    const today = new Date();
    const transaction = libraryData.transactions.find((t) => t.id === transactionId);
    if (!transaction) return;
    const dueDate = new Date(transaction.dueDate);
    const daysLate = Math.max(0, Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
    const fine = daysLate * 2;

    setLibraryData((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) =>
        t.id === transactionId ? { ...t, returnDate: today.toISOString().split("T")[0], fine } : t
      ),
      books: prev.books.map((b) =>
        b.id === bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b
      ),
    }));
  };

  const getBookTitle = (bookId: string) => {
    return libraryData.books.find((b) => b.id === bookId)?.title || "Unknown";
  };

  const getStudentName = (studentId: string) => {
    return students.find((s) => s.id === studentId)?.name || "Unknown";
  };

  const atRiskStudents = students.filter((s) => s.riskLevel === "high" || s.riskLevel === "medium");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Librarian Dashboard</h1>
              <p className="text-xs text-slate-500">Library Management & Analytics</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Books</p>
                  <p className="text-3xl font-bold text-slate-900">{libraryData.books.length}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <BookMarked className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Active Issues</p>
                  <p className="text-3xl font-bold text-slate-900">{activeTransactions.length}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <ArrowLeftRight className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Overdue</p>
                  <p className="text-3xl font-bold text-rose-600">{overdueBooks.length}</p>
                </div>
                <div className="p-3 bg-rose-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Fines</p>
                  <p className="text-3xl font-bold text-slate-900">${totalFines}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-xl">
                  <TrendingDown className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Student Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search books..."
                  className="pl-10 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => setShowAddBook(!showAddBook)} className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" /> Add Book
              </Button>
            </div>

            {showAddBook && (
              <Card className="bg-white border-indigo-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        placeholder="Book title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Author</Label>
                      <Input
                        placeholder="Author name"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ISBN</Label>
                      <Input
                        placeholder="ISBN"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newBook.category} onValueChange={(v) => setNewBook({ ...newBook, category: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                          <SelectItem value="AI & ML">AI & ML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Copies</Label>
                      <Input
                        type="number"
                        min="1"
                        value={newBook.totalCopies}
                        onChange={(e) => setNewBook({ ...newBook, totalCopies: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddBook} className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                    Add Book to Catalogue
                  </Button>
                </CardContent>
              </Card>
            )}

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
                            {book.availableCopies > 0 ? `${book.availableCopies} available` : "Out of stock"}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">ISBN: {book.isbn}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Issue Book</CardTitle>
                <CardDescription>Issue a book to a student</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Book</Label>
                    <Select value={issueBookId} onValueChange={setIssueBookId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select book" />
                      </SelectTrigger>
                      <SelectContent>
                        {libraryData.books.filter((b) => b.availableCopies > 0).map((book) => (
                          <SelectItem key={book.id} value={book.id}>
                            {book.title} ({book.availableCopies} left)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Student</Label>
                    <Select value={issueStudentId} onValueChange={setIssueStudentId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} ({student.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleIssueBook} className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Issue Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Active Transactions</CardTitle>
                <CardDescription>Currently issued books</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTransactions.map((transaction) => {
                    const isOverdue = new Date(transaction.dueDate) < new Date();
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <p className="font-semibold text-slate-900">{getBookTitle(transaction.bookId)}</p>
                          <p className="text-sm text-slate-500">
                            {getStudentName(transaction.studentId)} • Due: {transaction.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {isOverdue && <Badge variant="destructive">Overdue</Badge>}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReturnBook(transaction.id, transaction.bookId)}
                          >
                            Return
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  {activeTransactions.length === 0 && (
                    <p className="text-center text-slate-500 py-8">No active transactions</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-600" />
                    At-Risk Students
                  </CardTitle>
                  <CardDescription>Students needing intervention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {atRiskStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <p className="font-semibold text-slate-900">{student.name}</p>
                          <p className="text-sm text-slate-500">{student.course} • Year {student.year}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">{student.performanceScore}%</p>
                            <p className="text-xs text-slate-500">Score</p>
                          </div>
                          <Badge variant={student.riskLevel === "high" ? "destructive" : "warning"}>
                            {student.riskLevel}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>AI-generated interventions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {atRiskStudents.slice(0, 3).map((student) => (
                      <div key={student.id} className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <p className="font-semibold text-slate-900 mb-2">{student.name}</p>
                        <ul className="space-y-1">
                          {student.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                              <span className="text-amber-600 mt-0.5">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}