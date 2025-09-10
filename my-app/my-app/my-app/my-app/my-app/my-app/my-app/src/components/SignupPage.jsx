import { useState, useRef, useEffect } from "react";
import "./LoginPage.css"; // reuse same CSS for styling
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const navigate = useNavigate();

  // Vanta background
  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = FOG({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0x1f3b73,
        midtoneColor: 0x215caa,
        lowlightColor: 0x184a8c,
        baseColor: 0x2364aa,
        blurFactor: 0.78,
        speed: 5,
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Registered successfully! Please login.");
        navigate("/login");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong");
    }
  };

  return (
    <>
      <div id="vanta" ref={vantaRef}></div>
      <div className="login-container">
        <div className="login-card">
          <h1 className="title">SmartEval Sign Up</h1>

          {/* Role Switch */}
          <div className="role-switch">
            <button
              className={role === "student" ? "active" : ""}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              className={role === "faculty" ? "active" : ""}
              onClick={() => setRole("faculty")}
            >
              Faculty
            </button>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">
              Sign up as {role}
            </button>
          </form>

          <p className="signup-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}
