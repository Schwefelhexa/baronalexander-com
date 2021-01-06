import { useCallback, useEffect, useState } from 'react';
import { getPreviewMode, setPreviewMode } from '.';

export const usePreviewMode = (): [
  boolean,
  (preview: boolean) => Promise<void>,
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
    return setPreviewMode(preview)
      .then(() => setPreview(preview))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return [preview, togglePreview, loading];
};
