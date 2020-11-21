import React, { useState } from 'react';
import PropTypes from 'prop-types'
import blogService from '../services/blogs';
const Blog = ({ blog, user, likeHandler }) => {

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

  const handleLike = () => {
    const payload = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    blogService.update(blog.id, payload);
    if(likeHandler) likeHandler();
  }

  const handleRemove = () => {
    const shouldDelete = window.confirm(`Remove ${blog.title}?`);
    if(shouldDelete){
      blogService.remove(blog.id, user);
    }
    //deleting logic
  }

  return <div style={blogStyle} id={blog.url} data-blogid={blog.id} className="blog">
    <div className="heading">{blog.title} {blog.author} <button onClick={handleToggleViewDetails} className="view">view</button> </div>
    {showDetails && <div>
      <p className="url">{blog.url}</p>
      <p className="likes">Likes: {blog.likes} <button onClick={handleLike} className="like">like</button></p>
      <p>{blog.author}</p>
      <button onClick={handleRemove} className="remove">Remove</button>
    </div>}
  </div>
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog;
