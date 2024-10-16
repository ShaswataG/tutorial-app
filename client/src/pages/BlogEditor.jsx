import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const baseURL = 'http://localhost:4000';

export default function BlogEditor() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title: title,
      content: markdown,
    };

    try {
      // Posting to your backend
      await axios.post(`${baseURL}/courses/blogs`, blogData);
      alert("Blog posted successfully!");
      setMarkdown("");
      setTitle("");
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  return (
    <div className="blog-editor-container">
      <h1>Write a Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="blog-title-input"
          required
        />
        <textarea
          className="markdown-input"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write your blog content in Markdown..."
          required
        ></textarea>
        <button type="submit" className="submit-button">
          Post Blog
        </button>
      </form>
      <div className="preview-section">
        <h2>Markdown Preview</h2>
        <div className="markdown-preview">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
