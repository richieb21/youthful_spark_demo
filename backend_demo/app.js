const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// In-memory database (for demo purposes)
let students = [
  { id: 1, name: "Alice", grade: "A" },
  { id: 2, name: "Bob", grade: "B" },
  { id: 3, name: "Charlie", grade: "A+" },
];

// Routes
// GET - Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET - Get student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// POST - Add new student
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    grade: req.body.grade,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT - Update student
app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[studentIndex] = {
    id: studentId,
    name: req.body.name,
    grade: req.body.grade,
  };

  res.json(students[studentIndex]);
});

// DELETE - Remove student
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students = students.filter((s) => s.id !== studentId);
  res.json({ message: "Student deleted successfully" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
