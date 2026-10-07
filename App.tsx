import { useState } from "react";
import { LoginPage } from "@/components/LoginPage";
import { LibrarianDashboard } from "@/components/LibrarianDashboard";
import { StudentDashboard } from "@/components/StudentDashboard";
import { LibraryData, StudentData, User } from "@/types";

const initialLibraryData: LibraryData = {
  books: [
    { id: "B001", title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "978-0262033848", category: "Computer Science", totalCopies: 5, availableCopies: 3, coverColor: "bg-indigo-500" },
    { id: "B002", title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884", category: "Software Engineering", totalCopies: 3, availableCopies: 1, coverColor: "bg-emerald-500" },
    { id: "B003", title: "The Pragmatic Programmer", author: "Andrew Hunt", isbn: "978-0201616224", category: "Software Engineering", totalCopies: 4, availableCopies: 2, coverColor: "bg-amber-500" },
    { id: "B004", title: "Database Systems Concepts", author: "Abraham Silberschatz", isbn: "978-0078022159", category: "Computer Science", totalCopies: 3, availableCopies: 0, coverColor: "bg-rose-500" },
    { id: "B005", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", isbn: "978-0134610993", category: "AI & ML", totalCopies: 6, availableCopies: 4, coverColor: "bg-violet-500" },
    { id: "B006", title: "Design Patterns", author: "Erich Gamma", isbn: "978-0201633610", category: "Software Engineering", totalCopies: 2, availableCopies: 1, coverColor: "bg-cyan-500" },
    { id: "B007", title: "Computer Networks", author: "Andrew S. Tanenbaum", isbn: "978-0132126953", category: "Computer Science", totalCopies: 4, availableCopies: 2, coverColor: "bg-teal-500" },
    { id: "B008", title: "Deep Learning", author: "Ian Goodfellow", isbn: "978-0262035613", category: "AI & ML", totalCopies: 3, availableCopies: 3, coverColor: "bg-fuchsia-500" },
  ],
  transactions: [
    { id: "T001", bookId: "B001", studentId: "24G2A30154", issueDate: "2024-11-15", dueDate: "2024-11-29", returnDate: null, fine: 0 },
    { id: "T002", bookId: "B002", studentId: "24G2A30152", issueDate: "2024-11-10", dueDate: "2024-11-24", returnDate: "2024-11-22", fine: 0 },
    { id: "T003", bookId: "B004", studentId: "24G2A30176", issueDate: "2024-11-01", dueDate: "2024-11-15", returnDate: null, fine: 5 },
    { id: "T004", bookId: "B003", studentId: "24G2A30154", issueDate: "2024-11-20", dueDate: "2024-12-04", returnDate: null, fine: 0 },
    { id: "T005", bookId: "B005", studentId: "24G2A30152", issueDate: "2024-11-18", dueDate: "2024-12-02", returnDate: null, fine: 0 },
  ],
};

const initialStudents: StudentData[] = [
  { id: "24G2A30154", name: "THAMMISETTY VENKATA SURESH", email: "suresh@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA65", attendance: 92, marks: 88, assignments: 85, participation: 90, performanceScore: 89, riskLevel: "low", recommendations: ["Maintain current performance", "Consider research projects"], trend: [82, 85, 87, 88, 89], subjects: [
    { subject: "Java", score: 92, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 95 }, { name: "Assignment 2: Collections", percentage: 90 }, { name: "Assignment 3: Multithreading", percentage: 88 }, { name: "Assignment 4: GUI Development", percentage: 94 }] },
    { subject: "Python", score: 88, assignments: [{ name: "Assignment 1: Data Types", percentage: 92 }, { name: "Assignment 2: Functions & Modules", percentage: 87 }, { name: "Assignment 3: File Handling", percentage: 85 }, { name: "Assignment 4: Web Scraping", percentage: 90 }] },
    { subject: "C", score: 85, assignments: [{ name: "Assignment 1: Pointers", percentage: 88 }, { name: "Assignment 2: Dynamic Memory", percentage: 82 }, { name: "Assignment 3: File Operations", percentage: 86 }, { name: "Assignment 4: Data Structures", percentage: 84 }] },
    { subject: "C++", score: 90, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 93 }, { name: "Assignment 2: Inheritance", percentage: 89 }, { name: "Assignment 3: Templates", percentage: 91 }, { name: "Assignment 4: STL", percentage: 87 }] },
    { subject: "Web Development", score: 87, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 92 }, { name: "Assignment 2: JavaScript Basics", percentage: 88 }, { name: "Assignment 3: React Components", percentage: 85 }, { name: "Assignment 4: Full Stack Project", percentage: 90 }] },
  ] },
  { id: "24G2A30152", name: "SULAM SANDEEP", email: "sandeep@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA65", attendance: 78, marks: 72, assignments: 75, participation: 65, performanceScore: 72, riskLevel: "medium", recommendations: ["Increase class participation", "Join study groups", "Attend extra tutorials"], trend: [75, 74, 73, 72, 72], subjects: [
    { subject: "Java", score: 75, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 78 }, { name: "Assignment 2: Collections", percentage: 72 }, { name: "Assignment 3: Multithreading", percentage: 70 }, { name: "Assignment 4: GUI Development", percentage: 74 }] },
    { subject: "Python", score: 70, assignments: [{ name: "Assignment 1: Data Types", percentage: 75 }, { name: "Assignment 2: Functions & Modules", percentage: 68 }, { name: "Assignment 3: File Handling", percentage: 72 }, { name: "Assignment 4: Web Scraping", percentage: 65 }] },
    { subject: "C", score: 68, assignments: [{ name: "Assignment 1: Pointers", percentage: 72 }, { name: "Assignment 2: Dynamic Memory", percentage: 65 }, { name: "Assignment 3: File Operations", percentage: 70 }, { name: "Assignment 4: Data Structures", percentage: 64 }] },
    { subject: "C++", score: 73, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 76 }, { name: "Assignment 2: Inheritance", percentage: 71 }, { name: "Assignment 3: Templates", percentage: 74 }, { name: "Assignment 4: STL", percentage: 70 }] },
    { subject: "Web Development", score: 72, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 78 }, { name: "Assignment 2: JavaScript Basics", percentage: 74 }, { name: "Assignment 3: React Components", percentage: 70 }, { name: "Assignment 4: Full Stack Project", percentage: 66 }] },
  ] },
  { id: "24G2A30176", name: "YELLU HARI CHANDU", email: "harichandu@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA66", attendance: 55, marks: 58, assignments: 60, participation: 45, performanceScore: 55, riskLevel: "high", recommendations: ["Mandatory attendance counseling", "Personalized tutoring", "Weekly progress reviews"], trend: [70, 65, 62, 58, 55], subjects: [
    { subject: "Java", score: 55, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 60 }, { name: "Assignment 2: Collections", percentage: 55 }, { name: "Assignment 3: Multithreading", percentage: 50 }, { name: "Assignment 4: GUI Development", percentage: 52 }] },
    { subject: "Python", score: 58, assignments: [{ name: "Assignment 1: Data Types", percentage: 62 }, { name: "Assignment 2: Functions & Modules", percentage: 58 }, { name: "Assignment 3: File Handling", percentage: 55 }, { name: "Assignment 4: Web Scraping", percentage: 50 }] },
    { subject: "C", score: 52, assignments: [{ name: "Assignment 1: Pointers", percentage: 55 }, { name: "Assignment 2: Dynamic Memory", percentage: 50 }, { name: "Assignment 3: File Operations", percentage: 48 }, { name: "Assignment 4: Data Structures", percentage: 45 }] },
    { subject: "C++", score: 56, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 60 }, { name: "Assignment 2: Inheritance", percentage: 55 }, { name: "Assignment 3: Templates", percentage: 52 }, { name: "Assignment 4: STL", percentage: 50 }] },
    { subject: "Web Development", score: 60, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 65 }, { name: "Assignment 2: JavaScript Basics", percentage: 60 }, { name: "Assignment 3: React Components", percentage: 55 }, { name: "Assignment 4: Full Stack Project", percentage: 50 }] },
  ] },
  { id: "24G2A30132", name: "S.Bala yugandhar", email: "bala@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA66", attendance: 95, marks: 91, assignments: 93, participation: 88, performanceScore: 92, riskLevel: "low", recommendations: ["Apply for research assistant", "Mentor junior students"], trend: [85, 88, 90, 91, 92], subjects: [
    { subject: "Java", score: 95, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 96 }, { name: "Assignment 2: Collections", percentage: 94 }, { name: "Assignment 3: Multithreading", percentage: 95 }, { name: "Assignment 4: GUI Development", percentage: 93 }] },
    { subject: "Python", score: 92, assignments: [{ name: "Assignment 1: Data Types", percentage: 94 }, { name: "Assignment 2: Functions & Modules", percentage: 92 }, { name: "Assignment 3: File Handling", percentage: 90 }, { name: "Assignment 4: Web Scraping", percentage: 93 }] },
    { subject: "C", score: 90, assignments: [{ name: "Assignment 1: Pointers", percentage: 92 }, { name: "Assignment 2: Dynamic Memory", percentage: 88 }, { name: "Assignment 3: File Operations", percentage: 91 }, { name: "Assignment 4: Data Structures", percentage: 89 }] },
    { subject: "C++", score: 93, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 95 }, { name: "Assignment 2: Inheritance", percentage: 92 }, { name: "Assignment 3: Templates", percentage: 94 }, { name: "Assignment 4: STL", percentage: 91 }] },
    { subject: "Web Development", score: 91, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 93 }, { name: "Assignment 2: JavaScript Basics", percentage: 90 }, { name: "Assignment 3: React Components", percentage: 92 }, { name: "Assignment 4: Full Stack Project", percentage: 89 }] },
  ] },
  { id: "24G2A30133", name: "SANCHI GOPI CHANDU", email: "gopichandu@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA66", attendance: 68, marks: 65, assignments: 70, participation: 60, performanceScore: 66, riskLevel: "medium", recommendations: ["Improve attendance", "Use library resources", "Peer mentoring program"], trend: [72, 70, 68, 67, 66], subjects: [
    { subject: "Java", score: 68, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 72 }, { name: "Assignment 2: Collections", percentage: 68 }, { name: "Assignment 3: Multithreading", percentage: 65 }, { name: "Assignment 4: GUI Development", percentage: 67 }] },
    { subject: "Python", score: 70, assignments: [{ name: "Assignment 1: Data Types", percentage: 74 }, { name: "Assignment 2: Functions & Modules", percentage: 70 }, { name: "Assignment 3: File Handling", percentage: 68 }, { name: "Assignment 4: Web Scraping", percentage: 66 }] },
    { subject: "C", score: 64, assignments: [{ name: "Assignment 1: Pointers", percentage: 68 }, { name: "Assignment 2: Dynamic Memory", percentage: 62 }, { name: "Assignment 3: File Operations", percentage: 65 }, { name: "Assignment 4: Data Structures", percentage: 60 }] },
    { subject: "C++", score: 66, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 70 }, { name: "Assignment 2: Inheritance", percentage: 65 }, { name: "Assignment 3: Templates", percentage: 68 }, { name: "Assignment 4: STL", percentage: 62 }] },
    { subject: "Web Development", score: 72, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 76 }, { name: "Assignment 2: JavaScript Basics", percentage: 72 }, { name: "Assignment 3: React Components", percentage: 70 }, { name: "Assignment 4: Full Stack Project", percentage: 68 }] },
  ] },
  { id: "24G2A30161", name: "VADDI SIVAJI", email: "sivaji@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA66", attendance: 85, marks: 82, assignments: 80, participation: 78, performanceScore: 81, riskLevel: "low", recommendations: ["Continue consistent performance", "Take on leadership roles"], trend: [78, 79, 80, 80, 81], subjects: [
    { subject: "Java", score: 84, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 86 }, { name: "Assignment 2: Collections", percentage: 83 }, { name: "Assignment 3: Multithreading", percentage: 82 }, { name: "Assignment 4: GUI Development", percentage: 85 }] },
    { subject: "Python", score: 82, assignments: [{ name: "Assignment 1: Data Types", percentage: 85 }, { name: "Assignment 2: Functions & Modules", percentage: 82 }, { name: "Assignment 3: File Handling", percentage: 80 }, { name: "Assignment 4: Web Scraping", percentage: 81 }] },
    { subject: "C", score: 78, assignments: [{ name: "Assignment 1: Pointers", percentage: 80 }, { name: "Assignment 2: Dynamic Memory", percentage: 76 }, { name: "Assignment 3: File Operations", percentage: 79 }, { name: "Assignment 4: Data Structures", percentage: 77 }] },
    { subject: "C++", score: 83, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 85 }, { name: "Assignment 2: Inheritance", percentage: 82 }, { name: "Assignment 3: Templates", percentage: 84 }, { name: "Assignment 4: STL", percentage: 81 }] },
    { subject: "Web Development", score: 80, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 83 }, { name: "Assignment 2: JavaScript Basics", percentage: 80 }, { name: "Assignment 3: React Components", percentage: 78 }, { name: "Assignment 4: Full Stack Project", percentage: 79 }] },
  ] },
  { id: "24G2A30177", name: "YETURU PRAVALLIKA", email: "pravallika@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA66", attendance: 90, marks: 87, assignments: 89, participation: 85, performanceScore: 88, riskLevel: "low", recommendations: ["Maintain excellent performance", "Participate in coding competitions"], trend: [82, 84, 86, 87, 88], subjects: [
    { subject: "Java", score: 90, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 92 }, { name: "Assignment 2: Collections", percentage: 89 }, { name: "Assignment 3: Multithreading", percentage: 91 }, { name: "Assignment 4: GUI Development", percentage: 88 }] },
    { subject: "Python", score: 88, assignments: [{ name: "Assignment 1: Data Types", percentage: 90 }, { name: "Assignment 2: Functions & Modules", percentage: 87 }, { name: "Assignment 3: File Handling", percentage: 89 }, { name: "Assignment 4: Web Scraping", percentage: 86 }] },
    { subject: "C", score: 85, assignments: [{ name: "Assignment 1: Pointers", percentage: 87 }, { name: "Assignment 2: Dynamic Memory", percentage: 84 }, { name: "Assignment 3: File Operations", percentage: 86 }, { name: "Assignment 4: Data Structures", percentage: 83 }] },
    { subject: "C++", score: 89, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 91 }, { name: "Assignment 2: Inheritance", percentage: 88 }, { name: "Assignment 3: Templates", percentage: 90 }, { name: "Assignment 4: STL", percentage: 87 }] },
    { subject: "Web Development", score: 87, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 89 }, { name: "Assignment 2: JavaScript Basics", percentage: 86 }, { name: "Assignment 3: React Components", percentage: 88 }, { name: "Assignment 4: Full Stack Project", percentage: 85 }] },
  ] },
  { id: "24G2A30167", name: "Vemula Aswini", email: "aswini@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA67", attendance: 75, marks: 70, assignments: 72, participation: 68, performanceScore: 71, riskLevel: "medium", recommendations: ["Improve participation", "Practice coding daily", "Attend workshops"], trend: [74, 73, 72, 71, 71], subjects: [
    { subject: "Java", score: 73, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 76 }, { name: "Assignment 2: Collections", percentage: 72 }, { name: "Assignment 3: Multithreading", percentage: 74 }, { name: "Assignment 4: GUI Development", percentage: 70 }] },
    { subject: "Python", score: 71, assignments: [{ name: "Assignment 1: Data Types", percentage: 74 }, { name: "Assignment 2: Functions & Modules", percentage: 70 }, { name: "Assignment 3: File Handling", percentage: 72 }, { name: "Assignment 4: Web Scraping", percentage: 68 }] },
    { subject: "C", score: 68, assignments: [{ name: "Assignment 1: Pointers", percentage: 70 }, { name: "Assignment 2: Dynamic Memory", percentage: 66 }, { name: "Assignment 3: File Operations", percentage: 69 }, { name: "Assignment 4: Data Structures", percentage: 67 }] },
    { subject: "C++", score: 72, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 75 }, { name: "Assignment 2: Inheritance", percentage: 71 }, { name: "Assignment 3: Templates", percentage: 73 }, { name: "Assignment 4: STL", percentage: 69 }] },
    { subject: "Web Development", score: 70, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 73 }, { name: "Assignment 2: JavaScript Basics", percentage: 70 }, { name: "Assignment 3: React Components", percentage: 68 }, { name: "Assignment 4: Full Stack Project", percentage: 69 }] },
  ] },
  { id: "24G2A30146", name: "SHAIK SHAREEF", email: "shareef@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA67", attendance: 88, marks: 84, assignments: 86, participation: 82, performanceScore: 85, riskLevel: "low", recommendations: ["Maintain good performance", "Explore advanced topics"], trend: [80, 82, 83, 84, 85], subjects: [
    { subject: "Java", score: 87, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 89 }, { name: "Assignment 2: Collections", percentage: 86 }, { name: "Assignment 3: Multithreading", percentage: 88 }, { name: "Assignment 4: GUI Development", percentage: 85 }] },
    { subject: "Python", score: 85, assignments: [{ name: "Assignment 1: Data Types", percentage: 87 }, { name: "Assignment 2: Functions & Modules", percentage: 84 }, { name: "Assignment 3: File Handling", percentage: 86 }, { name: "Assignment 4: Web Scraping", percentage: 83 }] },
    { subject: "C", score: 82, assignments: [{ name: "Assignment 1: Pointers", percentage: 84 }, { name: "Assignment 2: Dynamic Memory", percentage: 80 }, { name: "Assignment 3: File Operations", percentage: 83 }, { name: "Assignment 4: Data Structures", percentage: 81 }] },
    { subject: "C++", score: 86, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 88 }, { name: "Assignment 2: Inheritance", percentage: 85 }, { name: "Assignment 3: Templates", percentage: 87 }, { name: "Assignment 4: STL", percentage: 84 }] },
    { subject: "Web Development", score: 84, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 86 }, { name: "Assignment 2: JavaScript Basics", percentage: 83 }, { name: "Assignment 3: React Components", percentage: 85 }, { name: "Assignment 4: Full Stack Project", percentage: 82 }] },
  ] },
  { id: "24G2A30160", name: "Uppu Ajay", email: "ajay@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA67", attendance: 72, marks: 68, assignments: 70, participation: 65, performanceScore: 69, riskLevel: "medium", recommendations: ["Improve attendance", "Join study groups", "Practice more problems"], trend: [73, 72, 70, 69, 69], subjects: [
    { subject: "Java", score: 70, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 73 }, { name: "Assignment 2: Collections", percentage: 69 }, { name: "Assignment 3: Multithreading", percentage: 71 }, { name: "Assignment 4: GUI Development", percentage: 67 }] },
    { subject: "Python", score: 68, assignments: [{ name: "Assignment 1: Data Types", percentage: 71 }, { name: "Assignment 2: Functions & Modules", percentage: 67 }, { name: "Assignment 3: File Handling", percentage: 69 }, { name: "Assignment 4: Web Scraping", percentage: 65 }] },
    { subject: "C", score: 65, assignments: [{ name: "Assignment 1: Pointers", percentage: 68 }, { name: "Assignment 2: Dynamic Memory", percentage: 63 }, { name: "Assignment 3: File Operations", percentage: 66 }, { name: "Assignment 4: Data Structures", percentage: 62 }] },
    { subject: "C++", score: 69, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 72 }, { name: "Assignment 2: Inheritance", percentage: 68 }, { name: "Assignment 3: Templates", percentage: 70 }, { name: "Assignment 4: STL", percentage: 66 }] },
    { subject: "Web Development", score: 67, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 70 }, { name: "Assignment 2: JavaScript Basics", percentage: 66 }, { name: "Assignment 3: React Components", percentage: 68 }, { name: "Assignment 4: Full Stack Project", percentage: 64 }] },
  ] },
  { id: "24g2a30158", name: "GummaAlekhyalaxmi", email: "alekhya@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA67", attendance: 93, marks: 90, assignments: 91, participation: 87, performanceScore: 90, riskLevel: "low", recommendations: ["Maintain top performance", "Apply for internships"], trend: [85, 87, 88, 89, 90], subjects: [
    { subject: "Java", score: 93, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 95 }, { name: "Assignment 2: Collections", percentage: 92 }, { name: "Assignment 3: Multithreading", percentage: 94 }, { name: "Assignment 4: GUI Development", percentage: 91 }] },
    { subject: "Python", score: 91, assignments: [{ name: "Assignment 1: Data Types", percentage: 93 }, { name: "Assignment 2: Functions & Modules", percentage: 90 }, { name: "Assignment 3: File Handling", percentage: 92 }, { name: "Assignment 4: Web Scraping", percentage: 89 }] },
    { subject: "C", score: 88, assignments: [{ name: "Assignment 1: Pointers", percentage: 90 }, { name: "Assignment 2: Dynamic Memory", percentage: 86 }, { name: "Assignment 3: File Operations", percentage: 89 }, { name: "Assignment 4: Data Structures", percentage: 87 }] },
    { subject: "C++", score: 92, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 94 }, { name: "Assignment 2: Inheritance", percentage: 91 }, { name: "Assignment 3: Templates", percentage: 93 }, { name: "Assignment 4: STL", percentage: 90 }] },
    { subject: "Web Development", score: 90, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 92 }, { name: "Assignment 2: JavaScript Basics", percentage: 89 }, { name: "Assignment 3: React Components", percentage: 91 }, { name: "Assignment 4: Full Stack Project", percentage: 88 }] },
  ] },
  { id: "25G2A30L04", name: "PALLAVALI JAYA RAMI REDDY", email: "jaya@college.edu", course: "B.Tech CSE", year: 1, section: "NOVA67", attendance: 80, marks: 76, assignments: 78, participation: 72, performanceScore: 77, riskLevel: "low", recommendations: ["Continue steady progress", "Participate in hackathons"], trend: [72, 74, 75, 76, 77], subjects: [
    { subject: "Java", score: 79, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 82 }, { name: "Assignment 2: Collections", percentage: 78 }, { name: "Assignment 3: Multithreading", percentage: 80 }, { name: "Assignment 4: GUI Development", percentage: 76 }] },
    { subject: "Python", score: 77, assignments: [{ name: "Assignment 1: Data Types", percentage: 80 }, { name: "Assignment 2: Functions & Modules", percentage: 76 }, { name: "Assignment 3: File Handling", percentage: 78 }, { name: "Assignment 4: Web Scraping", percentage: 74 }] },
    { subject: "C", score: 74, assignments: [{ name: "Assignment 1: Pointers", percentage: 77 }, { name: "Assignment 2: Dynamic Memory", percentage: 72 }, { name: "Assignment 3: File Operations", percentage: 75 }, { name: "Assignment 4: Data Structures", percentage: 71 }] },
    { subject: "C++", score: 78, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 81 }, { name: "Assignment 2: Inheritance", percentage: 77 }, { name: "Assignment 3: Templates", percentage: 79 }, { name: "Assignment 4: STL", percentage: 75 }] },
    { subject: "Web Development", score: 76, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 79 }, { name: "Assignment 2: JavaScript Basics", percentage: 75 }, { name: "Assignment 3: React Components", percentage: 77 }, { name: "Assignment 4: Full Stack Project", percentage: 73 }] },
  ] },
  { id: "24G2A30140", name: "SHAIK JABEER", email: "jabeer@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA68", attendance: 65, marks: 62, assignments: 64, participation: 58, performanceScore: 62, riskLevel: "medium", recommendations: ["Improve attendance", "Seek academic support", "Practice regularly"], trend: [70, 68, 66, 64, 62], subjects: [
    { subject: "Java", score: 64, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 67 }, { name: "Assignment 2: Collections", percentage: 63 }, { name: "Assignment 3: Multithreading", percentage: 65 }, { name: "Assignment 4: GUI Development", percentage: 61 }] },
    { subject: "Python", score: 62, assignments: [{ name: "Assignment 1: Data Types", percentage: 65 }, { name: "Assignment 2: Functions & Modules", percentage: 61 }, { name: "Assignment 3: File Handling", percentage: 63 }, { name: "Assignment 4: Web Scraping", percentage: 59 }] },
    { subject: "C", score: 58, assignments: [{ name: "Assignment 1: Pointers", percentage: 61 }, { name: "Assignment 2: Dynamic Memory", percentage: 56 }, { name: "Assignment 3: File Operations", percentage: 59 }, { name: "Assignment 4: Data Structures", percentage: 55 }] },
    { subject: "C++", score: 63, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 66 }, { name: "Assignment 2: Inheritance", percentage: 62 }, { name: "Assignment 3: Templates", percentage: 64 }, { name: "Assignment 4: STL", percentage: 60 }] },
    { subject: "Web Development", score: 61, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 64 }, { name: "Assignment 2: JavaScript Basics", percentage: 60 }, { name: "Assignment 3: React Components", percentage: 62 }, { name: "Assignment 4: Full Stack Project", percentage: 58 }] },
  ] },
  { id: "24G2A30142", name: "SHAIK KHAJA MOINUDDIN", email: "khaja@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA68", attendance: 82, marks: 79, assignments: 81, participation: 76, performanceScore: 80, riskLevel: "low", recommendations: ["Maintain performance", "Take advanced courses"], trend: [75, 77, 78, 79, 80], subjects: [
    { subject: "Java", score: 82, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 85 }, { name: "Assignment 2: Collections", percentage: 81 }, { name: "Assignment 3: Multithreading", percentage: 83 }, { name: "Assignment 4: GUI Development", percentage: 79 }] },
    { subject: "Python", score: 80, assignments: [{ name: "Assignment 1: Data Types", percentage: 83 }, { name: "Assignment 2: Functions & Modules", percentage: 79 }, { name: "Assignment 3: File Handling", percentage: 81 }, { name: "Assignment 4: Web Scraping", percentage: 77 }] },
    { subject: "C", score: 77, assignments: [{ name: "Assignment 1: Pointers", percentage: 80 }, { name: "Assignment 2: Dynamic Memory", percentage: 75 }, { name: "Assignment 3: File Operations", percentage: 78 }, { name: "Assignment 4: Data Structures", percentage: 74 }] },
    { subject: "C++", score: 81, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 84 }, { name: "Assignment 2: Inheritance", percentage: 80 }, { name: "Assignment 3: Templates", percentage: 82 }, { name: "Assignment 4: STL", percentage: 78 }] },
    { subject: "Web Development", score: 79, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 82 }, { name: "Assignment 2: JavaScript Basics", percentage: 78 }, { name: "Assignment 3: React Components", percentage: 80 }, { name: "Assignment 4: Full Stack Project", percentage: 76 }] },
  ] },
  { id: "24G2A30135", name: "SANNIBOINA NISHITHA", email: "nishitha@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA68", attendance: 96, marks: 94, assignments: 95, participation: 92, performanceScore: 94, riskLevel: "low", recommendations: ["Apply for research programs", "Mentor peers"], trend: [88, 90, 92, 93, 94], subjects: [
    { subject: "Java", score: 96, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 97 }, { name: "Assignment 2: Collections", percentage: 95 }, { name: "Assignment 3: Multithreading", percentage: 96 }, { name: "Assignment 4: GUI Development", percentage: 94 }] },
    { subject: "Python", score: 94, assignments: [{ name: "Assignment 1: Data Types", percentage: 96 }, { name: "Assignment 2: Functions & Modules", percentage: 93 }, { name: "Assignment 3: File Handling", percentage: 95 }, { name: "Assignment 4: Web Scraping", percentage: 92 }] },
    { subject: "C", score: 92, assignments: [{ name: "Assignment 1: Pointers", percentage: 94 }, { name: "Assignment 2: Dynamic Memory", percentage: 90 }, { name: "Assignment 3: File Operations", percentage: 93 }, { name: "Assignment 4: Data Structures", percentage: 91 }] },
    { subject: "C++", score: 95, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 96 }, { name: "Assignment 2: Inheritance", percentage: 94 }, { name: "Assignment 3: Templates", percentage: 95 }, { name: "Assignment 4: STL", percentage: 93 }] },
    { subject: "Web Development", score: 93, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 95 }, { name: "Assignment 2: JavaScript Basics", percentage: 92 }, { name: "Assignment 3: React Components", percentage: 94 }, { name: "Assignment 4: Full Stack Project", percentage: 91 }] },
  ] },
  { id: "24G2A30143", name: "Shaik Mahammad rasool", email: "rasool@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA68", attendance: 70, marks: 66, assignments: 68, participation: 62, performanceScore: 67, riskLevel: "medium", recommendations: ["Improve attendance", "Practice coding", "Join study groups"], trend: [72, 70, 69, 68, 67], subjects: [
    { subject: "Java", score: 69, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 72 }, { name: "Assignment 2: Collections", percentage: 68 }, { name: "Assignment 3: Multithreading", percentage: 70 }, { name: "Assignment 4: GUI Development", percentage: 66 }] },
    { subject: "Python", score: 67, assignments: [{ name: "Assignment 1: Data Types", percentage: 70 }, { name: "Assignment 2: Functions & Modules", percentage: 66 }, { name: "Assignment 3: File Handling", percentage: 68 }, { name: "Assignment 4: Web Scraping", percentage: 64 }] },
    { subject: "C", score: 63, assignments: [{ name: "Assignment 1: Pointers", percentage: 66 }, { name: "Assignment 2: Dynamic Memory", percentage: 61 }, { name: "Assignment 3: File Operations", percentage: 64 }, { name: "Assignment 4: Data Structures", percentage: 60 }] },
    { subject: "C++", score: 68, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 71 }, { name: "Assignment 2: Inheritance", percentage: 67 }, { name: "Assignment 3: Templates", percentage: 69 }, { name: "Assignment 4: STL", percentage: 65 }] },
    { subject: "Web Development", score: 66, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 69 }, { name: "Assignment 2: JavaScript Basics", percentage: 65 }, { name: "Assignment 3: React Components", percentage: 67 }, { name: "Assignment 4: Full Stack Project", percentage: 63 }] },
  ] },
  { id: "25G2A30L05", name: "Pathapati pradeep", email: "pradeep@college.edu", course: "B.Tech CSE", year: 1, section: "NOVA68", attendance: 86, marks: 83, assignments: 84, participation: 80, performanceScore: 83, riskLevel: "low", recommendations: ["Maintain good performance", "Explore advanced topics"], trend: [78, 80, 81, 82, 83], subjects: [
    { subject: "Java", score: 85, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 88 }, { name: "Assignment 2: Collections", percentage: 84 }, { name: "Assignment 3: Multithreading", percentage: 86 }, { name: "Assignment 4: GUI Development", percentage: 82 }] },
    { subject: "Python", score: 83, assignments: [{ name: "Assignment 1: Data Types", percentage: 86 }, { name: "Assignment 2: Functions & Modules", percentage: 82 }, { name: "Assignment 3: File Handling", percentage: 84 }, { name: "Assignment 4: Web Scraping", percentage: 80 }] },
    { subject: "C", score: 80, assignments: [{ name: "Assignment 1: Pointers", percentage: 83 }, { name: "Assignment 2: Dynamic Memory", percentage: 78 }, { name: "Assignment 3: File Operations", percentage: 81 }, { name: "Assignment 4: Data Structures", percentage: 77 }] },
    { subject: "C++", score: 84, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 87 }, { name: "Assignment 2: Inheritance", percentage: 83 }, { name: "Assignment 3: Templates", percentage: 85 }, { name: "Assignment 4: STL", percentage: 81 }] },
    { subject: "Web Development", score: 82, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 85 }, { name: "Assignment 2: JavaScript Basics", percentage: 81 }, { name: "Assignment 3: React Components", percentage: 83 }, { name: "Assignment 4: Full Stack Project", percentage: 79 }] },
  ] },
  { id: "25G2A30L03", name: "M Siva kumar Raju", email: "sivakumar@college.edu", course: "B.Tech CSE", year: 1, section: "NOVA69", attendance: 84, marks: 81, assignments: 82, participation: 78, performanceScore: 81, riskLevel: "low", recommendations: ["Continue good performance", "Participate in competitions"], trend: [76, 78, 79, 80, 81], subjects: [
    { subject: "Java", score: 83, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 86 }, { name: "Assignment 2: Collections", percentage: 82 }, { name: "Assignment 3: Multithreading", percentage: 84 }, { name: "Assignment 4: GUI Development", percentage: 80 }] },
    { subject: "Python", score: 81, assignments: [{ name: "Assignment 1: Data Types", percentage: 84 }, { name: "Assignment 2: Functions & Modules", percentage: 80 }, { name: "Assignment 3: File Handling", percentage: 82 }, { name: "Assignment 4: Web Scraping", percentage: 78 }] },
    { subject: "C", score: 78, assignments: [{ name: "Assignment 1: Pointers", percentage: 81 }, { name: "Assignment 2: Dynamic Memory", percentage: 76 }, { name: "Assignment 3: File Operations", percentage: 79 }, { name: "Assignment 4: Data Structures", percentage: 75 }] },
    { subject: "C++", score: 82, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 85 }, { name: "Assignment 2: Inheritance", percentage: 81 }, { name: "Assignment 3: Templates", percentage: 83 }, { name: "Assignment 4: STL", percentage: 79 }] },
    { subject: "Web Development", score: 80, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 83 }, { name: "Assignment 2: JavaScript Basics", percentage: 79 }, { name: "Assignment 3: React Components", percentage: 81 }, { name: "Assignment 4: Full Stack Project", percentage: 77 }] },
  ] },
  { id: "24G2A30145", name: "SHAIK MUJAMIL", email: "mujamil@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA69", attendance: 74, marks: 71, assignments: 73, participation: 68, performanceScore: 72, riskLevel: "medium", recommendations: ["Improve participation", "Practice more", "Attend tutorials"], trend: [75, 74, 73, 72, 72], subjects: [
    { subject: "Java", score: 74, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 77 }, { name: "Assignment 2: Collections", percentage: 73 }, { name: "Assignment 3: Multithreading", percentage: 75 }, { name: "Assignment 4: GUI Development", percentage: 71 }] },
    { subject: "Python", score: 72, assignments: [{ name: "Assignment 1: Data Types", percentage: 75 }, { name: "Assignment 2: Functions & Modules", percentage: 71 }, { name: "Assignment 3: File Handling", percentage: 73 }, { name: "Assignment 4: Web Scraping", percentage: 69 }] },
    { subject: "C", score: 69, assignments: [{ name: "Assignment 1: Pointers", percentage: 72 }, { name: "Assignment 2: Dynamic Memory", percentage: 67 }, { name: "Assignment 3: File Operations", percentage: 70 }, { name: "Assignment 4: Data Structures", percentage: 66 }] },
    { subject: "C++", score: 73, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 76 }, { name: "Assignment 2: Inheritance", percentage: 72 }, { name: "Assignment 3: Templates", percentage: 74 }, { name: "Assignment 4: STL", percentage: 70 }] },
    { subject: "Web Development", score: 71, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 74 }, { name: "Assignment 2: JavaScript Basics", percentage: 70 }, { name: "Assignment 3: React Components", percentage: 72 }, { name: "Assignment 4: Full Stack Project", percentage: 68 }] },
  ] },
  { id: "24G2A30155", name: "THUPILI KAVYA", email: "kavya@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA69", attendance: 91, marks: 89, assignments: 90, participation: 86, performanceScore: 89, riskLevel: "low", recommendations: ["Maintain excellent performance", "Apply for internships"], trend: [83, 85, 87, 88, 89], subjects: [
    { subject: "Java", score: 91, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 93 }, { name: "Assignment 2: Collections", percentage: 90 }, { name: "Assignment 3: Multithreading", percentage: 92 }, { name: "Assignment 4: GUI Development", percentage: 89 }] },
    { subject: "Python", score: 89, assignments: [{ name: "Assignment 1: Data Types", percentage: 91 }, { name: "Assignment 2: Functions & Modules", percentage: 88 }, { name: "Assignment 3: File Handling", percentage: 90 }, { name: "Assignment 4: Web Scraping", percentage: 87 }] },
    { subject: "C", score: 86, assignments: [{ name: "Assignment 1: Pointers", percentage: 88 }, { name: "Assignment 2: Dynamic Memory", percentage: 84 }, { name: "Assignment 3: File Operations", percentage: 87 }, { name: "Assignment 4: Data Structures", percentage: 85 }] },
    { subject: "C++", score: 90, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 92 }, { name: "Assignment 2: Inheritance", percentage: 89 }, { name: "Assignment 3: Templates", percentage: 91 }, { name: "Assignment 4: STL", percentage: 88 }] },
    { subject: "Web Development", score: 88, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 90 }, { name: "Assignment 2: JavaScript Basics", percentage: 87 }, { name: "Assignment 3: React Components", percentage: 89 }, { name: "Assignment 4: Full Stack Project", percentage: 86 }] },
  ] },
  { id: "24G2A30164", name: "VALIPI HEMANTH", email: "hemanth@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA69", attendance: 76, marks: 73, assignments: 74, participation: 70, performanceScore: 73, riskLevel: "medium", recommendations: ["Improve attendance", "Practice coding daily", "Join study groups"], trend: [77, 76, 75, 74, 73], subjects: [
    { subject: "Java", score: 75, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 78 }, { name: "Assignment 2: Collections", percentage: 74 }, { name: "Assignment 3: Multithreading", percentage: 76 }, { name: "Assignment 4: GUI Development", percentage: 72 }] },
    { subject: "Python", score: 73, assignments: [{ name: "Assignment 1: Data Types", percentage: 76 }, { name: "Assignment 2: Functions & Modules", percentage: 72 }, { name: "Assignment 3: File Handling", percentage: 74 }, { name: "Assignment 4: Web Scraping", percentage: 70 }] },
    { subject: "C", score: 70, assignments: [{ name: "Assignment 1: Pointers", percentage: 73 }, { name: "Assignment 2: Dynamic Memory", percentage: 68 }, { name: "Assignment 3: File Operations", percentage: 71 }, { name: "Assignment 4: Data Structures", percentage: 67 }] },
    { subject: "C++", score: 74, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 77 }, { name: "Assignment 2: Inheritance", percentage: 73 }, { name: "Assignment 3: Templates", percentage: 75 }, { name: "Assignment 4: STL", percentage: 71 }] },
    { subject: "Web Development", score: 72, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 75 }, { name: "Assignment 2: JavaScript Basics", percentage: 71 }, { name: "Assignment 3: React Components", percentage: 73 }, { name: "Assignment 4: Full Stack Project", percentage: 69 }] },
  ] },
  { id: "24G2A30168", name: "Venkata kirti Mathakala", email: "kirti@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA69", attendance: 89, marks: 86, assignments: 87, participation: 84, performanceScore: 87, riskLevel: "low", recommendations: ["Maintain good performance", "Take on challenging projects"], trend: [81, 83, 85, 86, 87], subjects: [
    { subject: "Java", score: 89, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 91 }, { name: "Assignment 2: Collections", percentage: 88 }, { name: "Assignment 3: Multithreading", percentage: 90 }, { name: "Assignment 4: GUI Development", percentage: 87 }] },
    { subject: "Python", score: 87, assignments: [{ name: "Assignment 1: Data Types", percentage: 89 }, { name: "Assignment 2: Functions & Modules", percentage: 86 }, { name: "Assignment 3: File Handling", percentage: 88 }, { name: "Assignment 4: Web Scraping", percentage: 85 }] },
    { subject: "C", score: 84, assignments: [{ name: "Assignment 1: Pointers", percentage: 86 }, { name: "Assignment 2: Dynamic Memory", percentage: 82 }, { name: "Assignment 3: File Operations", percentage: 85 }, { name: "Assignment 4: Data Structures", percentage: 83 }] },
    { subject: "C++", score: 88, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 90 }, { name: "Assignment 2: Inheritance", percentage: 87 }, { name: "Assignment 3: Templates", percentage: 89 }, { name: "Assignment 4: STL", percentage: 86 }] },
    { subject: "Web Development", score: 86, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 88 }, { name: "Assignment 2: JavaScript Basics", percentage: 85 }, { name: "Assignment 3: React Components", percentage: 87 }, { name: "Assignment 4: Full Stack Project", percentage: 84 }] },
  ] },
  { id: "24G2A30163", name: "Vakiri. Anjali", email: "anjali@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA70", attendance: 87, marks: 85, assignments: 86, participation: 82, performanceScore: 85, riskLevel: "low", recommendations: ["Maintain performance", "Participate in workshops"], trend: [80, 82, 83, 84, 85], subjects: [
    { subject: "Java", score: 87, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 89 }, { name: "Assignment 2: Collections", percentage: 86 }, { name: "Assignment 3: Multithreading", percentage: 88 }, { name: "Assignment 4: GUI Development", percentage: 85 }] },
    { subject: "Python", score: 85, assignments: [{ name: "Assignment 1: Data Types", percentage: 87 }, { name: "Assignment 2: Functions & Modules", percentage: 84 }, { name: "Assignment 3: File Handling", percentage: 86 }, { name: "Assignment 4: Web Scraping", percentage: 83 }] },
    { subject: "C", score: 82, assignments: [{ name: "Assignment 1: Pointers", percentage: 84 }, { name: "Assignment 2: Dynamic Memory", percentage: 80 }, { name: "Assignment 3: File Operations", percentage: 83 }, { name: "Assignment 4: Data Structures", percentage: 81 }] },
    { subject: "C++", score: 86, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 88 }, { name: "Assignment 2: Inheritance", percentage: 85 }, { name: "Assignment 3: Templates", percentage: 87 }, { name: "Assignment 4: STL", percentage: 84 }] },
    { subject: "Web Development", score: 84, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 86 }, { name: "Assignment 2: JavaScript Basics", percentage: 83 }, { name: "Assignment 3: React Components", percentage: 85 }, { name: "Assignment 4: Full Stack Project", percentage: 82 }] },
  ] },
  { id: "24G2A30131", name: "RAVULA AKSHAYA", email: "akshaya@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA70", attendance: 94, marks: 92, assignments: 93, participation: 90, performanceScore: 92, riskLevel: "low", recommendations: ["Apply for research assistant", "Mentor junior students"], trend: [86, 88, 90, 91, 92], subjects: [
    { subject: "Java", score: 94, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 96 }, { name: "Assignment 2: Collections", percentage: 93 }, { name: "Assignment 3: Multithreading", percentage: 95 }, { name: "Assignment 4: GUI Development", percentage: 92 }] },
    { subject: "Python", score: 92, assignments: [{ name: "Assignment 1: Data Types", percentage: 94 }, { name: "Assignment 2: Functions & Modules", percentage: 91 }, { name: "Assignment 3: File Handling", percentage: 93 }, { name: "Assignment 4: Web Scraping", percentage: 90 }] },
    { subject: "C", score: 89, assignments: [{ name: "Assignment 1: Pointers", percentage: 91 }, { name: "Assignment 2: Dynamic Memory", percentage: 87 }, { name: "Assignment 3: File Operations", percentage: 90 }, { name: "Assignment 4: Data Structures", percentage: 88 }] },
    { subject: "C++", score: 93, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 95 }, { name: "Assignment 2: Inheritance", percentage: 92 }, { name: "Assignment 3: Templates", percentage: 94 }, { name: "Assignment 4: STL", percentage: 91 }] },
    { subject: "Web Development", score: 91, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 93 }, { name: "Assignment 2: JavaScript Basics", percentage: 90 }, { name: "Assignment 3: React Components", percentage: 92 }, { name: "Assignment 4: Full Stack Project", percentage: 89 }] },
  ] },
  { id: "24G2A30171", name: "Yalamakuri sravani", email: "sravani@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA70", attendance: 79, marks: 75, assignments: 77, participation: 72, performanceScore: 76, riskLevel: "low", recommendations: ["Continue steady progress", "Participate in more activities"], trend: [72, 73, 74, 75, 76], subjects: [
    { subject: "Java", score: 78, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 81 }, { name: "Assignment 2: Collections", percentage: 77 }, { name: "Assignment 3: Multithreading", percentage: 79 }, { name: "Assignment 4: GUI Development", percentage: 75 }] },
    { subject: "Python", score: 76, assignments: [{ name: "Assignment 1: Data Types", percentage: 79 }, { name: "Assignment 2: Functions & Modules", percentage: 75 }, { name: "Assignment 3: File Handling", percentage: 77 }, { name: "Assignment 4: Web Scraping", percentage: 73 }] },
    { subject: "C", score: 73, assignments: [{ name: "Assignment 1: Pointers", percentage: 76 }, { name: "Assignment 2: Dynamic Memory", percentage: 71 }, { name: "Assignment 3: File Operations", percentage: 74 }, { name: "Assignment 4: Data Structures", percentage: 70 }] },
    { subject: "C++", score: 77, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 80 }, { name: "Assignment 2: Inheritance", percentage: 76 }, { name: "Assignment 3: Templates", percentage: 78 }, { name: "Assignment 4: STL", percentage: 74 }] },
    { subject: "Web Development", score: 75, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 78 }, { name: "Assignment 2: JavaScript Basics", percentage: 74 }, { name: "Assignment 3: React Components", percentage: 76 }, { name: "Assignment 4: Full Stack Project", percentage: 72 }] },
  ] },
  { id: "24G2A30153", name: "Tambisetty maheswari", email: "maheswari@college.edu", course: "B.Tech CSE", year: 2, section: "NOVA70", attendance: 83, marks: 80, assignments: 82, participation: 78, performanceScore: 81, riskLevel: "low", recommendations: ["Maintain good performance", "Take advanced courses"], trend: [76, 78, 79, 80, 81], subjects: [
    { subject: "Java", score: 83, assignments: [{ name: "Assignment 1: OOP Basics", percentage: 86 }, { name: "Assignment 2: Collections", percentage: 82 }, { name: "Assignment 3: Multithreading", percentage: 84 }, { name: "Assignment 4: GUI Development", percentage: 80 }] },
    { subject: "Python", score: 81, assignments: [{ name: "Assignment 1: Data Types", percentage: 84 }, { name: "Assignment 2: Functions & Modules", percentage: 80 }, { name: "Assignment 3: File Handling", percentage: 82 }, { name: "Assignment 4: Web Scraping", percentage: 78 }] },
    { subject: "C", score: 78, assignments: [{ name: "Assignment 1: Pointers", percentage: 81 }, { name: "Assignment 2: Dynamic Memory", percentage: 76 }, { name: "Assignment 3: File Operations", percentage: 79 }, { name: "Assignment 4: Data Structures", percentage: 75 }] },
    { subject: "C++", score: 82, assignments: [{ name: "Assignment 1: Classes & Objects", percentage: 85 }, { name: "Assignment 2: Inheritance", percentage: 81 }, { name: "Assignment 3: Templates", percentage: 83 }, { name: "Assignment 4: STL", percentage: 79 }] },
    { subject: "Web Development", score: 80, assignments: [{ name: "Assignment 1: HTML & CSS", percentage: 83 }, { name: "Assignment 2: JavaScript Basics", percentage: 79 }, { name: "Assignment 3: React Components", percentage: 81 }, { name: "Assignment 4: Full Stack Project", percentage: 77 }] },
  ] },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [libraryData, setLibraryData] = useState<LibraryData>(initialLibraryData);
  const [students, setStudents] = useState<StudentData[]>(initialStudents);

  const handleLogin = (role: "librarian" | "student", studentId?: string) => {
    if (role === "librarian") {
      setUser({ role: "librarian", name: "Librarian", id: "LIB001" });
    } else {
      const student = students.find((s) => s.id === studentId);
      if (student) {
        setUser({ role: "student", name: student.name, id: student.id });
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} students={students} />;
  }

  if (user.role === "librarian") {
    return (
      <LibrarianDashboard
        libraryData={libraryData}
        setLibraryData={setLibraryData}
        students={students}
        onLogout={handleLogout}
      />
    );
  }

  const currentStudent = students.find((s) => s.id === user.id);
  return (
    <StudentDashboard
      student={currentStudent!}
      libraryData={libraryData}
      onLogout={handleLogout}
    />
  );
}