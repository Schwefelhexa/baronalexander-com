import React from 'react';
import ReactMarkdown from 'react-markdown';

export interface MarkdownProps {
  children: string;
}
const Markdown: React.FC<MarkdownProps> = ({ children }) => (
  <div className="markdown">
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
);
export default Markdown;
