import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useAuthHeader from "../hooks/useAuthHeader";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function BlogEditor() {
  const getAuthHearer = useAuthHeader();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const { courseId, sectionId, position } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title: title,
      content: markdown,

      courseId: courseId,
      sectionId: sectionId,
      position: position,
    };

    try {
      await axios.post(`${baseURL}/courses/blogs`, blogData,
        {
          headers: getAuthHearer()
        } 
      );
      toast.success('Created course successfully!', {
        position: "top-center",
        autoClose: 3000, // Standard 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        icon: true, // Disables icon if it appears too large
      });
      setMarkdown("");
      setTitle("");
    } catch (error) {
      console.error("Error posting blog:", error);
      toast.error('Failed to upload blog!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
    }
  };

  return (
    <div className="blog-editor-container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
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
