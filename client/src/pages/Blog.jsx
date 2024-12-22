import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogContent from '../components/Blog/BlogContent';

const baseURL = process.env.REACT_APP_BASE_URL;

export default function Blog() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${baseURL}/courses/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            });
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <section className='blog'>
            <h1>{title}</h1>
            <BlogContent content={content}/>
        </section>
    )
}