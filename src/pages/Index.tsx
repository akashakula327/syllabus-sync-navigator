
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import Dashboard from "../components/dashboard/Dashboard";
import FacultyDashboard from "../components/faculty/FacultyDashboard";
import HODDashboard from "../components/hod/HODDashboard";
import { useAuth } from "../hooks/useAuth";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/faculty" element={<ProtectedRoute><FacultyDashboard /></ProtectedRoute>} />
            <Route path="/hod" element={<ProtectedRoute><HODDashboard /></ProtectedRoute>} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  
  return (
    <div>
      {children}
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
      <div className="text-center text-white px-8">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            SyllabusSync
          </h1>
          <p className="text-2xl font-light opacity-90">Real-Time Academic Progress Tracker</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-3">Smart Syllabus Mapping</h3>
            <p className="opacity-80">Structured decomposition with prerequisite tracking</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-3">Live Coverage Analytics</h3>
            <p className="opacity-80">Real-time progress tracking with visual heatmaps</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-3">Proactive Intervention</h3>
            <p className="opacity-80">Automated alerts and catch-up planning</p>
          </div>
        </div>
        
        <div className="space-x-4">
          <a 
            href="/login" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Login
          </a>
          <a 
            href="/register" 
            className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
