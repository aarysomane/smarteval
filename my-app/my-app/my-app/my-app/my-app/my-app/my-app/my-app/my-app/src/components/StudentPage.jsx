import "./StudentPage.css";

export default function StudentPage({ student }) {
  const { studentName, studentId } = student || {};

  return (
    <div className="student-dashboard">
      <div className="sidebar">
        <ul className="sidebar-nav">
        <li><span>Profile</span></li>
  <li><span>Analysis</span></li>
  <li><span>Attempt Quiz</span></li>
  
        </ul>
      </div>

      <main className="main-content">
        <h2>Dashboard Main Content</h2>
        <p>This area will display upcoming quizzes, scores, notifications, and more.</p>
      </main>
    </div>
  );
}
