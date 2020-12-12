import React from 'react';
import Link from 'next/link';
import RichTextType, { NodeType, NodeTypes } from '../core/model/RichText';
import Asset from '../core/model/Asset';

export type Assets = { [id: string]: Asset };
type RenderCollection = { [type in NodeType]: RenderFunction<type> };
type RenderFunction<TType extends NodeType> = (params: {
  key?: string;
  data: NodeTypes[TType];
  collection: RenderCollection;
  assets: Assets;
}) => React.ReactNode;

const renderCollection: RenderCollection = {
  document: ({ key, data, collection, assets }) =>
    data.content.map((element) =>
      collection[element.nodeType]({
        key: `${key}#${JSON.stringify(element)}`,
        data: element as never, // This works, TS just doesn't know
        collection,
        assets,
      })
    ),
  paragraph: ({ key, data, collection, assets }) => (
    <p className="text-lg leading-tight mb-4" key={key}>
      {data.content.map((element) =>
        collection[element.nodeType]({
          key: `${key}#${JSON.stringify(element)}`,
          data: element as never, // This works, TS just doesn't know
          collection,
          assets,
        })
      )}
    </p>
  ),
  hyperlink: ({ key, data, collection, assets }) => (
    <Link href={data.data.uri} key={key}>
      <a className="text-primary font-semibold hover:underline">
        {data.content.map((text) =>
          collection.text({
            key: `${key}#${JSON.stringify(text)}`,
            data: text,
            collection,
            assets,
          })
        )}
      </a>
    </Link>
  ),
  text: ({ key, data }) => <span key={key}>{data.value}</span>,
  'embedded-asset-block': ({ key, data, assets, collection }) => {
    const asset = assets[data.data.target.sys.id];
    if (!asset) return null;
    return (
      <div key={key} className="mb-8 mt-8 flex flex-col items-center">
        <img
          src={asset.url}
          alt={asset.description}
          className="md:mb-1 max-h-128"
        />
        {asset.description && (
          <span className="text-sm md:text-base max-w-full px-12 whitespace-nowrap overflow-hidden overflow-ellipsis">
            {asset.description}
          </span>
        )}
      </div>
    );
  },
};

interface Props {
  text: RichTextType;
  assets: Assets;
}
const RichText: React.FC<Props> = ({ text, assets }) => (
  <div className="w-full">
    {renderCollection.document({
      key: '',
      data: text,
      collection: renderCollection,
      assets,
    })}
  </div>
);
export default RichText;
