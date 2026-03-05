import { useEffect, useState } from "react"
import api from "../../services/api"

function StudentDashboard() {
  const [courses, setCourses] = useState(0)
  const [present, setPresent] = useState(0)
  const [absent, setAbsent] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const coursesRes = await api.get("/my-courses")
    setCourses(coursesRes.data.length)

    const attendanceRes = await api.get("/attendance/my")

    const presentCount = attendanceRes.data.filter(a => a.status).length
    const absentCount = attendanceRes.data.filter(a => !a.status).length

    setPresent(presentCount)
    setAbsent(absentCount)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Enrolled Courses" value={courses} color="blue" />
        <StatCard title="Present Days" value={present} color="green" />
        <StatCard title="Absent Days" value={absent} color="red" />
      </div>
    </div>
  )
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
  }

  return (
    <div className={`${colors[color]} text-white p-6 rounded-xl shadow-lg`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}

export default StudentDashboard