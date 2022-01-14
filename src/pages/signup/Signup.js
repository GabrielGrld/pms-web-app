import { useState } from 'react'

//styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbanail] = useState(null)

    return (
        <div>
          <form className="auth-form">
            <h1>Sign up</h1>
            <label>
              <span>Email:</span>
              <input
                  required
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
              />
            </label>
            <label>
              <span>Password:</span>
              <input
                  required
                  type="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
              />
            </label>

            <label>
              <span>Display Name:</span>
              <input
                  required
                  type="text"
                  onChange={(e)=>setDisplayName(e.target.value)}
                  value={displayName}
              />
            </label>

            <label>
              <span>Profile Thumbnail:</span>
              <input
                  required
                  type="file"

                  />
            </label>
            <button className='btn'>Sign Up </button>

          </form>
        </div>
    )
}
