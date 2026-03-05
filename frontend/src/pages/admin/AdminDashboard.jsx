import { useEffect, useState } from "react"
import api from "../../services/api"

function AdminDashboard() {

  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {

    try {

      const response = await api.get("/admin/stats")

      setStats(response.data)

    } catch (error) {

      console.error("Stats Error:", error.response?.data || error)

    }

  }

  if (!stats) {
    return <p className="text-gray-500">Loading dashboard...</p>
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

        <StatCard
          title="Total Courses"
          value={stats.total_courses}
          color="blue"
        />

        <StatCard
          title="Total Students"
          value={stats.total_students}
          color="green"
        />

        <StatCard
          title="Attendance Records"
          value={stats.total_attendance}
          color="purple"
        />

        <StatCard
          title="Present"
          value={stats.present}
          color="emerald"
        />

        <StatCard
          title="Absent"
          value={stats.absent}
          color="red"
        />

      </div>

    </div>
  )
}


function StatCard({ title, value, color }) {

  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    emerald: "bg-emerald-600",
    red: "bg-red-600"
  }

  return (
    <div className={`${colors[color]} text-white p-6 rounded-xl shadow-lg`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}

export default AdminDashboard