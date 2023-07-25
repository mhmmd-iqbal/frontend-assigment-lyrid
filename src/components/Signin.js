import './Signin.css'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/login', {
        email,
        password
      }).then((result) => {
        let {token} = result.data.data
        NotificationManager.success('Login berhasil!')

        setTimeout(() => {
          localStorage.setItem('token', token);
          navigate('/')
        }, 1000);
      })
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          NotificationManager.warning('Email dan password salah')
        } else {
          NotificationManager.error(error.response.data.message)
        }
      } else {
        NotificationManager.error('Connection refused')
      }
    }
  }

  return (
  <>
    <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form>
                <div className="form-floating mb-3">
                  <input 
                  type="email" 
                  className="form-control" 
                  id="floatingInput" 
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input 
                  type="password" 
                  className="form-control" 
                  id="floatingPassword" 
                  placeholder="Password" 
                  onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                
                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" onClick={handleSubmit}>Sign
                    in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default Signin