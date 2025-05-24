// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import PurchasesPage from "./pages/PurchasesPage";
// import TransfersPage from "./pages/TransfersPage";
// import AssignmentsPage from "./pages/AssignmentsPage";
// import LoginPage from "./pages/LoginPage";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/purchases"
//             element={
//               <ProtectedRoute allowedRoles={["ADMIN", "LOGISTICS_OFFICER"]}>
//                 <PurchasesPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/transfers"
//             element={
//               <ProtectedRoute allowedRoles={["ADMIN", "LOGISTICS_OFFICER"]}>
//                 <TransfersPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/assignments"
//             element={
//               <ProtectedRoute allowedRoles={["ADMIN", "BASE_COMMANDER"]}>
//                 <AssignmentsPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

//==================================stable=================================================

// src/App.js
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import PurchasesPage from "./pages/PurchasesPage";
// import TransfersPage from "./pages/TransfersPage";
// import AssignmentsPage from "./pages/AssignmentsPage";
// import LoginPage from "./pages/LoginPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthProvider } from "./context/AuthContext"; // ✅ ADD THIS
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <AuthProvider> {/* ✅ Wrap entire app */}
//       <Router>
//         <Routes>

//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Navbar />
//                 <Dashboard />
//                 <Footer />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/purchases"
//             element={
//               <ProtectedRoute>
//                 <Navbar />
//                 <PurchasesPage />
//                 <Footer />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/transfers"
//             element={
//               <ProtectedRoute>
//                 <Navbar />
//                 <TransfersPage />
//                 <Footer />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/assignments"
//             element={
//               <ProtectedRoute>
//                 <Navbar />
//                 <AssignmentsPage />
//                 <Footer />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/login" element={<LoginPage />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// ===============================================================================

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import PurchasesPage from "./pages/PurchasesPage";
import TransfersPage from "./pages/TransfersPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchases"
            element={
              <ProtectedRoute>
                <Navbar />
                <PurchasesPage />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfers"
            element={
              <ProtectedRoute>
                <Navbar />
                <TransfersPage />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <Navbar />
                <AssignmentsPage />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AdminRoute>
                <Navbar />
                <RegisterPage />
                <Footer />
              </AdminRoute>

            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



