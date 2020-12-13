import { useEffect, useState } from 'react';

const usePreview = (
  initial?: boolean
): [boolean, (preview: boolean) => Promise<void>] => {
  const [preview, _setPreview] = useState(initial ?? false);

  useEffect(() => {
    fetch('/api/auth/preview')
      .then((res) => res.json())
      .then(({ preview }: { preview: boolean }) => _setPreview(preview));
  }, [_setPreview]);

  const setPreview = (preview: boolean) =>
    fetch('/api/auth/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enable: preview }),
    })
      .then((res) => res.json())
      .then(({ preview }: { preview: boolean }) => _setPreview(preview));
  return [preview, setPreview];
};
export default usePreview;
