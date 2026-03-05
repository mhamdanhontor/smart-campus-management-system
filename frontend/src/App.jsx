import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/auth/Login"
import AdminDashboard from "./pages/admin/AdminDashboard"
import StudentDashboard from "./pages/student/StudentDashboard"
import DashboardLayout from "./layouts/DashboardLayout"
import Courses from "./pages/admin/Courses"
import { useAuth } from "./context/AuthContext"
import Attendance from "./pages/admin/Attendance"
import MyAttendance from "./pages/student/MyAttendance"
import Enrollment from "./pages/admin/Enrollment"
import Register from "./pages/auth/Register"
function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    {user?.role === "admin" && (
    <>
        <Route
        path="/admin/dashboard"
        element={
            <DashboardLayout>
            <AdminDashboard />
            </DashboardLayout>
        }
        />

        <Route
        path="/admin/courses"
        element={
            <DashboardLayout>
            <Courses />
            </DashboardLayout>
        }
        />
        <Route
        path="/admin/attendance"
        element={
            <DashboardLayout>
            <Attendance />
            </DashboardLayout>
        }
        />
        <Route
          path="/admin/enrollment"
          element={
            <DashboardLayout>
              <Enrollment />
            </DashboardLayout>
          }
        />
    </>
    )}
      {user?.role === "student" && (
        <><Route
          path="/student/dashboard"
          element={<DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>} /><Route
            path="/student/attendance"
            element={<DashboardLayout>
              <MyAttendance />
            </DashboardLayout>} /></>
      )}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App