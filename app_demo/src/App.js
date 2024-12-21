import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("");

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Add new student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          grade: newGrade,
        }),
      });
      if (response.ok) {
        // Refresh the student list
        fetchStudents();
        // Clear the form
        setNewName("");
        setNewGrade("");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="App">
      <h1>Student Management</h1>

      {/* Add Student Form */}
      <div>
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Grade"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
          />
          <button type="submit">Add Student</button>
        </form>
      </div>

      {/* Student List */}
      <div>
        <h2>Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - Grade: {student.grade}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
