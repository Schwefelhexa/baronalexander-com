import React from 'react';
import 'twin.macro';

export interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
}
const Image: React.FC<ImageProps> = ({ src, alt, caption }) => (
  <figure>
    <img tw="w-full rounded-lg" src={src} alt={alt} />
    {caption && <figcaption tw="text-center">{caption}</figcaption>}
  </figure>
);
export default Image;
