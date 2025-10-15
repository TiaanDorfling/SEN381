import React from "react";
import Navbar from "../layout/navbar";
// import "App.css";

function Home() {
  // Example mock data — replace later with dynamic data from backend
  const progress = 65; // %
  const completedCourses = ["Web Development", "Database Systems"];
  const grades = [
    { course: "Web Development", grade: "A" },
    { course: "Database Systems", grade: "B+" },
  ];

  return (
    <div className="home-container">
      <Navbar />

      {/* Overview Section */}
      <div className="overview">
        <h2>Welcome back!</h2>
        <p>
          Here’s a quick overview of your learning progress. Stay motivated and
          keep pushing forward—every module completed brings you closer to
          success!
        </p>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <h3>Your Course Progress</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{progress}% completed</p>
      </div>

      {/* Completed Courses Section */}
      <div className="completed-section">
        <h3>Completed Courses</h3>
        <ul>
          {completedCourses.length > 0 ? (
            completedCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))
          ) : (
            <p>No completed courses yet.</p>
          )}
        </ul>
      </div>

      {/* Grades Section */}
      <div className="grades-section">
        <h3>Your Grades</h3>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, index) => (
              <tr key={index}>
                <td>{g.course}</td>
                <td>{g.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
