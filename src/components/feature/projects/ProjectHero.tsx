import React from 'react';
import { Image, ResponsiveImageType } from 'react-datocms';
import classNames from 'classnames';
import Text from '../../atomic/Text';

interface BaseProps {
  title: string;

  image: ResponsiveImageType;
}
type CompactProps = { compact: true };
type ExpandedProps = { compact: false | undefined; techStack: string[] };

export type ProjectHeroProps = BaseProps & (CompactProps | ExpandedProps);
const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  image,
  ...props
}) => {
  return (
    <div>
      <Image
        className={classNames('shadow-xl', {
          'mb-8': !props.compact,
          'mb-4': props.compact,
        })}
        data={image}
      />
      <Text size="large" className="mb-2">
        {title}
      </Text>
      {!props.compact && <Text>{props.techStack.join(', ')}</Text>}
    </div>
  );
};
export default ProjectHero;
