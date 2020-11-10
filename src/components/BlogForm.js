import React, {useState} from 'react';
import blogService from '../services/blogs';

const BlogForm = ({user}) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const onTitleChange = (event) => {
		setTitle(event.target.value);
	}

	const onAuthorChange = (event) => {
		setAuthor(event.target.value);
	}

	const onUrlChange = (event) => {
		setUrl(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		blogService.create({title, author, url}, user);
	}

	return <div>
		<h3>Create New</h3>
		<form onSubmit={handleSubmit}>
			<div>title: <input type="text" value={title} onChange={onTitleChange}/></div>
			<div>author: <input type="text" value={author} onChange={onAuthorChange}/></div>
			<div>url: <input type="text" value={url} onChange={onUrlChange}/></div>
			<button type="submit">Create</button>
		</form>
	</div>
};

export default BlogForm;