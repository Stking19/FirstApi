import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [userinput, setUserinput] = useState({
        fullName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        phoneNumber: '',
        gender: ''
    })

    const navigate = useNavigate()

    const url = 'https://student-voting-app.onrender.com/api/user/sign-up'
//   console.log(url)
    const validate = () => {
        let newErrors = {}

        if (!userinput.fullName.trim()) newErrors.fullName = "Full Name is required."
        if (!userinput.email.trim()) newErrors.email = "Email is required."
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userinput.email)) newErrors.email = "Invalid email format."

        if (!userinput.password) newErrors.password = "Password is required."
        else if (userinput.password.length < 6 || userinput.password.length > 8) newErrors.password = "Password must be 6-8 characters."

        if (!userinput.gender) newErrors.gender = "Please select a gender."

        if (!userinput.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required."

        if (!userinput.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required."
        else if (!/^\d{10,}$/.test(userinput.phoneNumber)) newErrors.phoneNumber = "Phone Number must be at least 10 digits."

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const registerUser = async () => {
        if (!validate()) return 

        setLoading(true)
        try {
            const response = await axios.post(url, userinput)
            console.log(response)
            alert(response.data.message)
            setUserinput({ fullName: '', email: '', password: '', dateOfBirth: '', phoneNumber: '', gender: '' })
            setErrors({})
            navigate("/")

        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register">
            <div className='Head'>Registration</div>
            <div className='wrapper'>
                <input
                    onChange={(e) => setUserinput({ ...userinput, fullName: e.target.value })}
                    value={userinput.fullName}
                    type='text'
                    placeholder='Full Name'
                />
                {errors.fullName && <p className="error" style={{
                    color:"red"
                }}>{errors.fullName}</p>}

                <input
                    onChange={(e) => setUserinput({ ...userinput, email: e.target.value })}
                    value={userinput.email}
                    type='email'
                    placeholder='Email'
                />
                {errors.email && <p className="error" style={{
                    color:"red"
                }}>{errors.email}</p>}

                <input
                    onChange={(e) => setUserinput({ ...userinput, password: e.target.value })}
                    value={userinput.password}
                    maxLength={8}
                    type='password'
                    placeholder='Password'
                />
                {errors.password && <p className="error" style={{
                    color:"red"
                }}>{errors.password}</p>}
                <select
                    onChange={(e) => setUserinput({ ...userinput, gender: e.target.value })}
                    value={userinput.gender}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="error" style={{
                    color:"red"
                }}>{errors.gender}</p>}
                <input
                    onChange={(e) => setUserinput({ ...userinput, dateOfBirth: e.target.value })}
                    value={userinput.dateOfBirth}
                    type='date'
                />
                {errors.dateOfBirth && <p className="error" style={{
                    color:"red"
                }}>{errors.dateOfBirth}</p>}
                <input
                    onChange={(e) => setUserinput({ ...userinput, phoneNumber: e.target.value })}
                    value={userinput.phoneNumber}
                    maxLength={11}
                    type='tel'
                    placeholder='Phone Number'
                />
                {errors.phoneNumber && <p className="error" style={{
                    color:"red"
                }}>{errors.phoneNumber}</p>}

                <button onClick={registerUser} disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </button>
            </div>
        </div>
    )
}

export default Register