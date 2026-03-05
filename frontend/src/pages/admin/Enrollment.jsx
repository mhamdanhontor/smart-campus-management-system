import { useEffect, useState } from "react"
import api from "../../services/api"

function Enrollment() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const response = await api.get("/courses")
    setCourses(response.data)
  }

  const fetchStudents = async (courseId) => {
    const response = await api.get(`/courses/${courseId}/students`)
    setStudents(response.data)
  }

  const handleRemove = async (studentId) => {
    await api.delete(`/courses/${selectedCourse}/students/${studentId}`)
    fetchStudents(selectedCourse)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Enrollment Management</h2>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <select
          value={selectedCourse}
          onChange={(e) => {
            const id = e.target.value
            setSelectedCourse(id)
            fetchStudents(id)
          }}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Enrolled Students
          </h3>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Student Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b">
                  <td className="py-2">{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(student.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && (
            <p className="text-gray-500 mt-4">
              No students enrolled.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Enrollment