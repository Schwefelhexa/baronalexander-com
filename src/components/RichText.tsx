import React from 'react';
import Link from 'next/link';
import RichTextType, { NodeType, NodeTypes } from '../core/model/RichText';

type RenderCollection = { [type in NodeType]: RenderFunction<type> };
type RenderFunction<TType extends NodeType> = (params: {
  key: string;
  data: NodeTypes[TType];
  collection: RenderCollection;
}) => React.ReactNode;

const renderCollection: RenderCollection = {
  document: ({ key, data, collection }) =>
    data.content.map((element) =>
      collection[element.nodeType]({
        key: `${key}#${JSON.stringify(element)}`,
        data: element,
        collection,
      })
    ),
  paragraph: ({ key, data, collection }) => (
    <p className="text-lg leading-tight mb-4" key={key}>
      {data.content.map((element) =>
        collection[element.nodeType]({
          key: `${key}#${JSON.stringify(element)}`,
          data: element as never, // This works, TS just doesn't know
          collection,
        })
      )}
    </p>
  ),
  hyperlink: ({ key, data, collection }) => (
    <Link href={data.data.uri} key={key}>
      <a className="text-primary font-semibold hover:underline">
        {data.content.map((text) =>
          collection.text({
            key: `${key}#${JSON.stringify(text)}`,
            data: text,
            collection,
          })
        )}
      </a>
    </Link>
  ),
  text: ({ key, data }) => <span key={key}>{data.value}</span>,
};

interface Props {
  text: RichTextType;
}
const RichText: React.FC<Props> = ({ text }) => (
  <div className="w-full">
    {renderCollection.document({
      key: '',
      data: text,
      collection: renderCollection,
    })}
  </div>
);
export default RichText;
