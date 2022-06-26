import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const CreatePage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        })
        navigate(`/details/${data.link._id}`)
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
  }
  return <div className="row">
    <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
      <div className="input-field">
        <input
          placeholder="Enter your URL"
          type="text"
          id="link"
          name="link"
          value={link}
          onChange={e => setLink(e.target.value)}
          onKeyPress={pressHandler}
        />
        <label htmlFor="link">
          Enter URL
        </label>
      </div>
    </div>
  </div>;
};
