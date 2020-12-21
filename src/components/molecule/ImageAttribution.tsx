import React from 'react';
import Text from '../atomic/Text';

export interface ImageAttributionProps {
  imageDescription?: string;
  photographer: string;
  platform: string;
}
const ImageAttribution: React.FC<ImageAttributionProps> = ({
  platform,
  photographer,
  imageDescription,
}) => (
  <Text size="small">
    {imageDescription && imageDescription + ' '}
    {imageDescription ? 'by' : 'By'} {photographer} via {platform}
  </Text>
);
export default ImageAttribution;
