import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"

function Register() {

  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const handleRegister = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      await api.post("/register",{
        name,
        email,
        password
      })

      alert("Registration successful. Please login.")

      navigate("/login")

    } catch(error){

      console.error(error.response?.data || error)

      alert("Registration failed")

    }

    setLoading(false)

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Student Registration
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default Register