import React, { createContext, useCallback, useEffect, useState } from 'react';

export interface PreviewContextType {
  preview: boolean;
  setPreview: (preview: boolean) => Promise<boolean>;
}
export const previewContext = createContext<PreviewContextType>(
  {} as PreviewContextType
);

const PreviewProvider: React.FC = ({ children }) => {
  const [preview, _setPreview] = useState(false);

  // Fetch current state
  useEffect(() => {
    fetch('/api/auth/preview')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(({ preview }: { preview: boolean }) => _setPreview(preview))
      .catch(() => _setPreview(false));
  }, [_setPreview]);

  const setPreview = useCallback(
    (preview: boolean) =>
      fetch('/api/auth/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enable: preview }),
      })
        .then((res) => res.json())
        .then(({ preview }: { preview: boolean }) => {
          _setPreview(preview);
          return preview;
        }),
    []
  );

  return (
    <previewContext.Provider value={{ preview, setPreview }}>
      {children}
    </previewContext.Provider>
  );
};
export default PreviewProvider;
