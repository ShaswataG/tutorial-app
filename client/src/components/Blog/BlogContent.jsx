import ReactMarkdown from 'react-markdown';

export default function BlogContent({ content }) {
    return (
        <div className=''>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
