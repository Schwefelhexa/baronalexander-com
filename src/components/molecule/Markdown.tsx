import React from 'react';
import ReactMarkdown from 'react-markdown';

export interface MarkdownProps {
  children: string;
  className?: string;
}
const Markdown: React.FC<MarkdownProps> = ({ children, className }) => (
  <div className={`markdown ${className}`}>
    <ReactMarkdown>{children}</ReactMarkdown>
  </div>
);
export default Markdown;
