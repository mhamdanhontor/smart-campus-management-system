import { useEffect, useState } from "react"
import api from "../../services/api"

function MyAttendance() {
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    fetchAttendance()
  }, [])

  const fetchAttendance = async () => {
    const response = await api.get("/attendance/my")
    setAttendance(response.data)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Attendance</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Course</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="py-2">
                  {record.course?.title}
                </td>
                <td>{record.date}</td>
                <td>
                  {record.status ? (
                    <span className="text-green-600 font-semibold">
                      Present
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Absent
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {attendance.length === 0 && (
          <p className="text-gray-500 mt-4">
            No attendance records yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default MyAttendance