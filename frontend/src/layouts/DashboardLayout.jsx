import { useAuth } from "../context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"

function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const NavItem = ({ label, path }) => {
    const isActive = location.pathname === path

    return (
      <button
        onClick={() => navigate(path)}
        className={`block w-full text-left px-4 py-2 rounded transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-200"
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Smart Campus
        </h2>

        <nav className="space-y-3">

          {user?.role === "admin" && (
            <>
              <NavItem label="Dashboard" path="/admin/dashboard" />
              <NavItem label="Courses" path="/admin/courses" />
              <NavItem label="Attendance" path="/admin/attendance" />
              <NavItem label="Enrollment" path="/admin/enrollment" />
            </>
          )}

          {user?.role === "student" && (
            <>
              <NavItem label="Dashboard" path="/student/dashboard" />
              <NavItem label="My Attendance" path="/student/attendance" />
            </>
          )}

        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">

        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="font-semibold text-gray-700">
            Welcome, {user?.name}
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout