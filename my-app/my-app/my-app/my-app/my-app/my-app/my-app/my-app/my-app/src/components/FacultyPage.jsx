import "./FacultyPage.css";

export default function FacultyPage({ faculty }) {
  const { facultyName } = faculty || {};

  return (
    <div className="faculty-dashboard">
      {/* Sidebar */}
      <div className="faculty-sidebar">
        <ul className="faculty-sidebar-nav">
          <li><span>Dashboard</span></li>
          <li><span>Create Quiz</span></li>
          <li><span>Manage Quizzes</span></li>
          <li><span>Proctoring Reports</span></li>
          <li><span>Student Analysis</span></li>
          <li><span>Announcements</span></li>
          <li><span>Profile</span></li>
          <li><span>Logout</span></li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="faculty-main-content">
        <h2 className="faculty-heading">Faculty Dashboard</h2>
        <p className="faculty-welcome">Welcome, {facultyName || "Faculty Member"}!</p>

        {/* Themed Card for Create Quiz */}
        <div className="create-quiz-card">
          <h3>Create Your Quiz</h3>
          <p>Quickly create and manage your quizzes from here.</p>
          <button className="create-btn">+ Create New Quiz</button>
        </div>
      </main>
    </div>
  );
}
