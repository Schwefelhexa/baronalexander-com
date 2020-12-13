import { useState } from 'react';

const usePreview = (
  initial?: boolean
): [boolean, (preview: boolean) => Promise<void>] => {
  const [preview, _setPreview] = useState(initial ?? false);

  const setPreview = (preview: boolean) =>
    fetch(`/api/auth/preview?enable=${preview}`).then(() =>
      _setPreview(preview)
    );
  return [preview, setPreview];
};
export default usePreview;
