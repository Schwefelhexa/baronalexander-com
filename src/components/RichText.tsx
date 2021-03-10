import React from 'react';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import 'twin.macro';
import Image from './Image';

export interface AssetData {
  sys: {
    id: string;
  };
  title: string;
  description: string;
  url: string;
  width?: number;
  height?: number;
  contentType: string;
}

const getById = (assets: AssetData[], id: string): AssetData | undefined =>
  assets.filter((a) => a.sys.id === id)[0];

const getOptions = (assets: AssetData[]): Options => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const id = node.data.target.sys.id as string;
      const asset = getById(assets, id);
      if (!asset)
        return (
          <p tw="text-red-600 text-4xl">
            No asset with ID "{id}" has been bundled!
          </p>
        );

      if (asset.contentType.startsWith('image/'))
        return (
          <Image
            src={asset.url}
            alt={asset.description}
            caption={asset.title}
          />
        );
      return <p>{JSON.stringify(asset)}</p>;
    },
  },
});

export interface RichTextProps {
  children: any;
  assets?: AssetData[];
}
const RichText: React.FC<RichTextProps> = ({ children, assets }) => {
  const rendered = documentToReactComponents(
    children,
    getOptions(assets ?? [])
  );

  return (
    <div tw="prose prose-lg prose-yellow text-gray-500 max-w-prose mx-auto">
      {rendered}
    </div>
  );
};
export default RichText;
