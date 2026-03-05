import { useEffect, useState } from "react"
import api from "../../services/api"

function Courses() {

  const [courses, setCourses] = useState([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [creditHours, setCreditHours] = useState("")

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editCode, setEditCode] = useState("")
  const [editCreditHours, setEditCreditHours] = useState("")

  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchCourses()
  }, [])

const fetchCourses = async () => {

  const response = await api.get("/courses")

  setCourses(response.data)

}

  const handleCreate = async (e) => {

    e.preventDefault()

    try {

      await api.post("/courses", {
        title,
        description,
        code,
        credit_hours: creditHours,
      })

      setTitle("")
      setDescription("")
      setCode("")
      setCreditHours("")

      fetchCourses()

    } catch (error) {

      console.error(error.response?.data || error)

    }
  }

  const handleDelete = async (id) => {

    await api.delete(`/courses/${id}`)
    fetchCourses()

  }

  const startEdit = (course) => {

    setEditingId(course.id)
    setEditTitle(course.title)
    setEditDescription(course.description)
    setEditCode(course.code)
    setEditCreditHours(course.credit_hours)

  }

  const handleUpdate = async (id) => {

    await api.put(`/courses/${id}`, {
      title: editTitle,
      description: editDescription,
      code: editCode,
      credit_hours: editCreditHours,
    })

    setEditingId(null)
    fetchCourses()

  }

  return (

    <div>

      <h2 className="text-2xl font-bold mb-4">
        Manage Courses
      </h2>


      <form
        onSubmit={handleCreate}
        className="bg-white shadow rounded-lg p-4 mb-6 space-y-3"
      >

        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Credit Hours"
          value={creditHours}
          onChange={(e) => setCreditHours(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Course
        </button>

      </form>


      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 border px-3 py-2 rounded"
      />


      <div className="bg-white shadow rounded-lg p-4">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b">
              <th className="py-2">Title</th>
              <th>Description</th>
              <th>Code</th>
              <th>Credit Hours</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {(courses || [])

              .filter((course) =>

                course.title?.toLowerCase().includes(search.toLowerCase()) ||
                course.code?.toLowerCase().includes(search.toLowerCase())

              )

              .map((course) => (

                <tr key={course.id} className="border-b">

                  <td className="py-2">

                    {editingId === course.id ? (

                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />

                    ) : (

                      course.title

                    )}

                  </td>


                  <td>

                    {editingId === course.id ? (

                      <input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />

                    ) : (

                      course.description

                    )}

                  </td>


                  <td>

                    {editingId === course.id ? (

                      <input
                        value={editCode}
                        onChange={(e) => setEditCode(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />

                    ) : (

                      course.code

                    )}

                  </td>


                  <td>

                    {editingId === course.id ? (

                      <input
                        type="number"
                        value={editCreditHours}
                        onChange={(e) => setEditCreditHours(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />

                    ) : (

                      course.credit_hours

                    )}

                  </td>


                  <td className="space-x-2">

                    {editingId === course.id ? (

                      <button
                        onClick={() => handleUpdate(course.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>

                    ) : (

                      <button
                        onClick={() => startEdit(course)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                    )}

                    <button
                      onClick={() => handleDelete(course.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}

export default Courses