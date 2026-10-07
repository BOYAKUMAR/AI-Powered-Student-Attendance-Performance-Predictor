import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ShieldCheck, AlertCircle, TrendingUp, CalendarCheck, BrainCircuit } from "lucide-react";
import { StudentData } from "@/types";

interface LoginPageProps {
  onLogin: (role: "librarian" | "student", studentId?: string) => void;
  students: StudentData[];
}

const STUDENT_PASSWORD = "audisankara@123";
const LIBRARIAN_PASSWORD = "audisankarastaff@123";

export function LoginPage({ onLogin, students }: LoginPageProps) {
  const [role, setRole] = useState<"librarian" | "student">("student");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (role === "librarian") {
      if (password !== LIBRARIAN_PASSWORD) {
        setError("Invalid librarian password. Please use the correct staff password.");
        return;
      }
      onLogin("librarian");
    } else {
      if (password !== STUDENT_PASSWORD) {
        setError("Invalid student password. Please use the correct password.");
        return;
      }
      if (!studentId) {
        setError("Please select a student account.");
        return;
      }
      onLogin("student", studentId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
              <BrainCircuit className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">CampusHub</h1>
              <p className="text-sm text-slate-500">AI-Powered Student Analytics</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-bold text-slate-900 leading-tight">
              Student Attendance
              <span className="block text-indigo-600">Prediction System</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Predict attendance patterns, identify at-risk students, and get AI-powered recommendations to improve academic performance.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-200">
                <CalendarCheck className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">98% Accuracy</p>
                  <p className="text-xs text-slate-500">AI predictions</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-200">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Real-time</p>
                  <p className="text-xs text-slate-500">Performance tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-xl border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Sign In</CardTitle>
            <CardDescription>Choose your role and enter the password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRole("student");
                    setError("");
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === "student"
                      ? "border-indigo-600 bg-indigo-50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <GraduationCap className={`h-6 w-6 mx-auto mb-2 ${role === "student" ? "text-indigo-600" : "text-slate-400"}`} />
                  <p className="font-semibold text-sm">Student</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("librarian");
                    setError("");
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === "librarian"
                      ? "border-emerald-600 bg-emerald-50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <ShieldCheck className={`h-6 w-6 mx-auto mb-2 ${role === "librarian" ? "text-emerald-600" : "text-slate-400"}`} />
                  <p className="font-semibold text-sm">Faculty</p>
                </button>
              </div>

              {role === "student" ? (
                <div className="space-y-2">
                  <Label htmlFor="student">Select Student</Label>
                  <Select value={studentId} onValueChange={(v) => { setStudentId(v); setError(""); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your account" />
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
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="lib-id">Faculty ID</Label>
                  <Input id="lib-id" placeholder="FAC001" value="FAC001" readOnly />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}