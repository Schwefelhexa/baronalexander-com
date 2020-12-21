import React from 'react';
import classNames from 'classnames';

export interface PreviewIndicatorProps {
  preview: boolean;
  setPreview: (preview: boolean) => void;
}
const PreviewIndicator: React.FC<PreviewIndicatorProps> = ({
  preview,
  setPreview,
}) => (
  <div
    className={classNames('w-full py-1 select-none cursor-pointer', {
      'bg-dark dark:bg-light text-light dark:text-dark': preview,
      'bg-light dark:bg-dark dark:text-light': !preview,
    })}
    onClick={() => setPreview(!preview)}
  >
    <p className="w-full text-center lg:text-xl">
      {preview
        ? 'You are seeing draft content'
        : 'You are seeing published content'}
    </p>
  </div>
);
export default PreviewIndicator;
