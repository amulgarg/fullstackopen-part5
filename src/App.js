import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import './App.css';

const App = () => {
  const loggedInUser = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(loggedInUser);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  const setUserOnLogin = (user) => {
    setUser(user);
  }

  const logout = () => {
    window.localStorage.removeItem('user');
    setSuccessMessage(null);
    setErrorMessage(null);
		setUserOnLogin(null);
	}

  return (
    <div>
      <h2>blogs</h2>
      {successMessage? <div className="success-message">{successMessage}</div>: null}
      {errorMessage? <div className="error-message">{errorMessage}</div>: null}

      {!user && <LoginForm user={user} onLogin={setUserOnLogin} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />}

      {user && <div>
        <div>{user.name} logged in <button onClick={logout}>logout</button></div>
        <br/>
        <BlogForm user={user} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}
    </div>
  )
}

export default App