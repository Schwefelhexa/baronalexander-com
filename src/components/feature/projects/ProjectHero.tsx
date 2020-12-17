import React from 'react';
import { Image, ResponsiveImageType } from 'react-datocms';
import Text from '../../atomic/Text';

export interface ProjectHeroProps {
  title: string;
  techStack: string[];
  image: ResponsiveImageType;
}
const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  techStack,
  image,
}) => (
  <div>
    <Image className="shadow-xl mb-8" data={image} />
    <Text size="large" className="mb-2">
      {title}
    </Text>
    <Text>{techStack.join(', ')}</Text>
  </div>
);
export default ProjectHero;
