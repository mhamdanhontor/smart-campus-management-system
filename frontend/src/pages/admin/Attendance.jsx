import { useEffect, useState } from "react"
import api from "../../services/api"

function Attendance() {

  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState(true)
  const [attendanceRecords, setAttendanceRecords] = useState([])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const response = await api.get("/courses")
setCourses(response.data || [])
  }

  const fetchStudents = async (courseId) => {
    const response = await api.get(`/courses/${courseId}/students`)
    setStudents(response.data || [])
  }

  const fetchAttendanceRecords = async (courseId) => {
    const response = await api.get(`/attendance/course/${courseId}`)
    setAttendanceRecords(response.data || [])
  }

  const handleMark = async (e) => {
    e.preventDefault()

    try {

      await api.post("/attendance/mark", {
        user_id: selectedStudent,
        course_id: selectedCourse,
        date,
        status,
      })

      alert("Attendance marked successfully")

      fetchAttendanceRecords(selectedCourse)

    } catch (error) {

      console.error(error.response?.data || error)

      alert("Attendance failed. Check backend.")

    }
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Mark Attendance
      </h2>

      <form
        onSubmit={handleMark}
        className="bg-white shadow rounded-lg p-6 space-y-4 max-w-lg"
      >

        <select
          value={selectedCourse}
          onChange={(e) => {
            const courseId = e.target.value
            setSelectedCourse(courseId)
            fetchStudents(courseId)
            fetchAttendanceRecords(courseId)
          }}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Course</option>

          {(courses || []).map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}

        </select>

        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >

          <option value="">Select Student</option>

          {(students || []).map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}

        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value === "true")}
          className="w-full border px-3 py-2 rounded"
        >

          <option value="true">Present</option>
          <option value="false">Absent</option>

        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Mark Attendance
        </button>

      </form>


      {selectedCourse && (

        <div className="mt-8 bg-white shadow rounded-lg p-6">

          <h3 className="text-xl font-semibold mb-4">
            Attendance Records
          </h3>

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Student</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {(attendanceRecords || []).map((record) => (

                <tr key={record.id} className="border-b">

                  <td className="py-2">
                    {record.user?.name}
                  </td>

                  <td>
                    {record.date}
                  </td>

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

        </div>

      )}

    </div>
  )
}

export default Attendance