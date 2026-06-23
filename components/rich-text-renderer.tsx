import React from 'react';

export function RichTextRenderer({ content }: { content?: string }) {
  if (!content) return null;

  let validJson;
  try {
    validJson = JSON.parse(content);
  } catch (e) {
    // Fallback if it's plain text or HTML string (legacy)
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // Recursive renderer for Lexical JSON
  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null;

    if (node.type === 'text') {
      let text = node.text;
      if (node.format & 1) text = <strong>{text}</strong>; // Bold
      if (node.format & 2) text = <em>{text}</em>;       // Italic
      if (node.format & 8) text = <u>{text}</u>;         // Underline
      return <span key={index}>{text}</span>;
    }

    if (node.type === 'link') {
      return (
        <a key={index} href={node.url} className="text-blue-600 underline" target={node.target || "_blank"} rel="noopener noreferrer">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </a>
      );
    }

    if (node.type === 'list') {
      const Tag = (node.listType === 'number' ? 'ol' : 'ul') as 'ol' | 'ul';
      const className = node.listType === 'number' ? 'list-decimal' : 'list-disc';
      return (
        <Tag key={index} className={`ml-5 ${className} my-4`}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </Tag>
      );
    }

    if (node.type === 'listitem') {
      return <li key={index}>{node.children?.map((child: any, i: number) => renderNode(child, i))}</li>;
    }

    if (node.type === 'heading') {
      const Tag = (node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h1';
      const sizes: Record<string, string> = { h1: 'text-4xl', h2: 'text-3xl', h3: 'text-2xl', h4: 'text-xl' };
      return (
        <Tag key={index} className={`font-bold my-4 ${sizes[node.tag] || ''}`}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </Tag>
      );
    }

    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </p>
      );
    }

    // Default: render children
    return (
      <div key={index}>
        {node.children?.map((child: any, i: number) => renderNode(child, i))}
      </div>
    );
  };

  return <div className="prose max-w-none">{renderNode(validJson.root, 0)}</div>;
}
