import React, { useState } from 'react';
import PropTypes from 'prop-types'
import blogService from '../services/blogs';
const Blog = ({ blog, user }) => {

  const [showDetails, setDetailsVisibility] = useState(false);

  const handleToggleViewDetails = () => {
    setDetailsVisibility(!showDetails);
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('blog', blog);

  const handleLike = () => {
    const payload = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    blogService.update(blog.id, payload);
  }

  const handleRemove = () => {
    const shouldDelete = window.confirm(`Remove ${blog.title}?`);
    if(shouldDelete){
      blogService.remove(blog.id, user);
    }
    //deleting logic
  }

  return <div style={blogStyle}>
    {blog.title}
    <button onClick={handleToggleViewDetails}>view</button>
    {showDetails && <div>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={handleLike}>like</button></p>
      <p>{blog.author}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>}
  </div>
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog;
