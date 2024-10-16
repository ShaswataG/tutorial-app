import ReactMarkdown from 'react-markdown';

export default function BlogContent({ content }) {
    return (
        <div>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
