import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { useNavigate } from "react-router-dom";
export const AuthPage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {
      message(e.message)
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {
      console.log(e)
    } finally {
      navigate('/create')
    }
  }
  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <h1>Shorten URL</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  className="white-text"
                  type="email"
                  id="email"
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label className="white-text" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="input-field">
                <input
                  className="white-text"
                  type="password"
                  id="password"
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label className="white-text" htmlFor="password">
                  Password
                </label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              disabled={loading}
              style={{ marginRight: 10 }}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="btn blue lighten-1 black-text"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
