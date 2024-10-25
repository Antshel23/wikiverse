import React, { useState } from 'react';

export const ArticleForm = function ({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [tags, setTags] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const articleData = {
      title,
      content,
      name: authorName,
      email: authorEmail,
      tags
    };

    try {
      const response = await fetch('/wiki', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        // Reset form and close adding mode
        onSubmit(false); // Close the form
        // Optionally, fetch new pages here to update the list
      } else {
        console.error('Failed to add article');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Content:
        <input value={content} onChange={(e) => setContent(e.target.value)} required />
      </label>
      <label>
        Author Name:
        <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
      </label>
      <label>
        Author Email:
        <input type="email" value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} required />
      </label>
      <label>
        Tags (space-separated):
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
