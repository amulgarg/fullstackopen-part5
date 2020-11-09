import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const loginUser = async (event) => {
    event.preventDefault();
    console.log('username password', username, password);
    const user = await loginService.login({username, password});
    console.log('user', user);
    setUser(user);
  }

  if(!user){
    return <div>
      <form onSubmit={loginUser}>
        <div>
          name: <input value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          password: <input type="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <br/>
        <div>{user.name} logged in</div>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App