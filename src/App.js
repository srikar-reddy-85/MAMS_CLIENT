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

// src/App.js
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
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; // ✅ ADD THIS

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap entire app */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchases"
            element={
              <ProtectedRoute>
                <PurchasesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfers"
            element={
              <ProtectedRoute>
                <TransfersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <AssignmentsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

