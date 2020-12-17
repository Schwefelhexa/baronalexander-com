import { useCallback, useEffect, useState } from 'react';
import { getPreviewMode, setPreviewMode } from '.';

export const usePreviewMode = (): [
  boolean,
  (preview: boolean) => void,
  boolean
] => {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPreviewMode()
      .then((preview) => setPreview(preview))
      .finally(() => setLoading(false));
  }, []);

  const togglePreview = useCallback((preview) => {
    setLoading(true);
    setPreviewMode(preview)
      .then(() => setPreview(preview))
      .finally(() => setLoading(false));
  }, []);

  return [preview, togglePreview, loading];
};
