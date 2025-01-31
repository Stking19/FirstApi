import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [userinput, setUserinput] = useState({
    email: "",
    password: ""
  })

  const url = "https://student-voting-app.onrender.com/api/user/log-in"
  const navigate = useNavigate()

  const validateField = (name, value) => {
    let error = ""

    if (name === "email") {
      if (!value.trim()) error = "Email is required."
      else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = "Invalid email format."
    } else if (name === "password") {
      if (!value) error = "Password is required."
      else if (value.length < 6) error = "Password must be at least 6 characters."
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserinput((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const isFormValid = Object.values(errors).every((err) => err === "") &&
    Object.values(userinput).every((field) => field !== "")

    const signUp = ()=>{
      navigate("/Register")
    }

  async function submitLogin(e) {
    if (!isFormValid) return
    

    setLoading(true)
    try {
      const res = await axios.post(url, userinput)
      console.log(res)
      alert(res.data.message)
      // localStorage.setItem("id", JSON.stringify(res.data.data._id))
      navigate("/Landingpage")


    } catch (error) {
      console.log(error)
      alert(error.response.data.message)


    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='loginForm'>
      <div className='profile'>
        <div className='pImage'>
          <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid" alt="Profile" />
        </div>
      </div>
      <div className='wrapper'>
        <input
          name="email"
          type="text"
          value={userinput.email}
          onChange={handleChange}
          placeholder='Email'
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          name="password"
          type="password"
          value={userinput.password}
          onChange={handleChange}
          placeholder='Password'
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button onClick={submitLogin} disabled={!isFormValid || loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <p>Don't have an account? <span onClick={signUp}>Sign up</span></p>
      </div>
    </div>
  )
}

export default Login