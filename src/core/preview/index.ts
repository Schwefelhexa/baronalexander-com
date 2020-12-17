export const getPreviewMode = (): Promise<boolean> =>
  fetch('/api/auth/preview')
    .then((res) => res.json())
    .then(({ preview }) => (preview ?? false) as boolean);

export const setPreviewMode = (preview: boolean): Promise<void> =>
  fetch('/api/auth/preview', {
    method: 'POST',
    body: JSON.stringify({ enable: preview }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.preview === preview) return;
      else throw new Error();
    });

export * from './hooks';
