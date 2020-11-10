import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
  const loggedInUser = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(loggedInUser);

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
		setUserOnLogin(null);
	}

  if(!user){
    return <LoginForm user={user} onLogin={setUserOnLogin}/>
  }

  return (
    <div>
      <h2>blogs</h2>
      <br/>
        <div>{user.name} logged in <button onClick={logout}>logout</button></div>
      <br/>
      <BlogForm user={user}/>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App