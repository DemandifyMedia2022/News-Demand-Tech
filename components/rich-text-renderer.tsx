import React from 'react';

export function RichTextRenderer({
  content,
  headingIdPrefix = "heading",
}: {
  content?: string;
  headingIdPrefix?: string;
}) {
  if (!content) return null;

  let validJson;
  try {
    validJson = JSON.parse(content);
  } catch (e) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  let headingIndex = 0;

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null;
    if (node.type === 'text') {
      let text = node.text;
      if (node.format & 1) text = <strong>{text}</strong>;
      if (node.format & 2) text = <em>{text}</em>;
      if (node.format & 8) text = <u>{text}</u>;
      return <span key={index}>{text}</span>;
    }
    if (node.type === 'paragraph') {
      return <p key={index} className="mb-4">{node.children?.map((c: any, i: number) => renderNode(c, i))}</p>;
    }
    if (node.type === 'heading') {
      const allowed = new Set<keyof React.JSX.IntrinsicElements>([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
      ]);
      const tag = (typeof node.tag === 'string' && allowed.has(node.tag as any)) ? (node.tag as keyof React.JSX.IntrinsicElements) : 'h2';
      const Tag: React.ElementType = tag;

      const id = `${headingIdPrefix}-${headingIndex}`;
      headingIndex += 1;

      return (
        <Tag key={index} id={id} className="font-bold my-4 text-xl">
          {node.children?.map((c: any, i: number) => renderNode(c, i))}
        </Tag>
      );
    }
    return <div key={index}>{node.children?.map((c: any, i: number) => renderNode(c, i))}</div>;
  };

  return <div className="prose max-w-none text-left">{renderNode(validJson.root, 0)}</div>;
}
