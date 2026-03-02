import React from 'react';

const RichTextRenderer = ({
  content,
  headingIdPrefix = "heading",
}: {
  content?: string;
  headingIdPrefix?: string;
}) => {
  if (!content) return null;

  let validJson;
  try {
    validJson = JSON.parse(content);
  } catch {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  const renderNode = ((headingCounter) => (node: unknown, index: number): React.ReactNode => {
    if (!node) return null;
    const nodeObj = node as any;
    if (nodeObj.type === 'text') {
      let text = nodeObj.text;
      if (nodeObj.format & 1) text = <strong>{text}</strong>;
      if (nodeObj.format & 2) text = <em>{text}</em>;
      if (nodeObj.format & 8) text = <u>{text}</u>;
      return <span key={index}>{text}</span>;
    }
    if (nodeObj.type === 'paragraph') {
      return <p key={index}>{nodeObj.children?.map((c: unknown, i: number) => renderNode(c, i))}</p>;
    }
    if (nodeObj.type === 'heading') {
      const allowed = new Set<keyof React.JSX.IntrinsicElements>([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
      ]);
      const Tag = allowed.has(nodeObj.level as keyof React.JSX.IntrinsicElements) ? nodeObj.level as keyof React.JSX.IntrinsicElements : 'h2';

      const id = `${headingIdPrefix}-${headingCounter}`;
      headingCounter += 1;

      return (
        <Tag key={index} id={id} className="font-bold my-4 text-xl">
          {nodeObj.children?.map((c: unknown, i: number) => renderNode(c, i))}
        </Tag>
      );
    }
    return <div key={index}>{(nodeObj as any).children?.map((c: unknown, i: number) => renderNode(c, i))}</div>;
  })(0);

  return <div className="prose max-w-none text-left">{renderNode(validJson.root, 0)}</div>;
};

RichTextRenderer.displayName = 'RichTextRenderer';

export { RichTextRenderer };
