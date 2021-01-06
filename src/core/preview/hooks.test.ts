import { usePreviewMode } from './hooks';
import { getPreviewMode, setPreviewMode } from '.';

import { act, renderHook } from '@testing-library/react-hooks';

jest.mock('.');

afterEach(() => {
  jest.clearAllMocks();
});

describe('usePreviewMode', () => {
  it('should default to not preview & loading', async () => {
    (getPreviewMode as any).mockImplementation(() => Promise.resolve(true));

    const { result, waitForNextUpdate } = renderHook(() => usePreviewMode());
    const [preview, , loading] = result.current;
    await waitForNextUpdate();

    expect(preview).toBe(false);
    expect(loading).toBe(true);
  });

  it('should call getPreviewMode', async () => {
    (getPreviewMode as any).mockImplementation(() => Promise.resolve(true));

    const { waitForNextUpdate } = renderHook(() => usePreviewMode());
    await waitForNextUpdate();

    expect((getPreviewMode as any).mock.calls.length).toBe(1);
  });

  it('should update preview & loading', async () => {
    await (async () => {
      (getPreviewMode as any).mockImplementation(() => Promise.resolve(true));

      const { result, waitForNextUpdate } = renderHook(() => usePreviewMode());
      await waitForNextUpdate();
      const [preview, , loading] = result.current;

      expect(preview).toBe(true);
      expect(loading).toBe(false);
    })();

    jest.clearAllMocks();

    await (async () => {
      (getPreviewMode as any).mockImplementation(() => Promise.resolve(false));

      const { result, waitForNextUpdate } = renderHook(() => usePreviewMode());
      await waitForNextUpdate();
      const [preview, , loading] = result.current;

      expect(preview).toBe(false);
      expect(loading).toBe(false);
    })();
  });

  it('should call setPreviewMode', async () => {
    (getPreviewMode as any).mockImplementation(() => Promise.resolve(true));
    (setPreviewMode as any).mockImplementation(() => Promise.resolve());

    const { result, waitForNextUpdate } = renderHook(() => usePreviewMode());
    await waitForNextUpdate();
    const [, togglePreview] = result.current;
    act(() => {
      togglePreview(false);
    });
    await waitForNextUpdate();

    expect((setPreviewMode as any).mock.calls.length).toBe(1);
  });

  it('should set preview & loading correctly', async () => {
    await (async () => {
      (getPreviewMode as any).mockImplementation(() => Promise.resolve(true));
      (setPreviewMode as any).mockImplementation(() => Promise.resolve());

      const { result, waitForNextUpdate } = renderHook(() => usePreviewMode());
      await waitForNextUpdate();
      const [, togglePreview] = result.current;
      act(() => {
        togglePreview(false);
      });
      await waitForNextUpdate();

      const [preview, , loading] = result.current;
      expect(preview).toBe(false);
      expect(loading).toBe(false);
    })();

    jest.clearAllMocks();

    await (async () => {
      (getPreviewMode as any).mockImplementation(() => Promise.resolve(false));
      (setPreviewMode as any).mockImplementation(() => Promise.resolve());

      const { result, waitForNextUpdate } = renderHook(() => usePreviewMode());
      await waitForNextUpdate();
      const [, togglePreview] = result.current;
      act(() => {
        togglePreview(true);
      });
      await waitForNextUpdate();

      const [preview, , loading] = result.current;
      expect(preview).toBe(true);
      expect(loading).toBe(false);
    })();
  });

  it('should keep old value on set rejection', async () => {
    (getPreviewMode as any).mockImplementation(() => Promise.resolve(true));
    (setPreviewMode as any).mockImplementation(() => Promise.reject());

    const { result, waitForNextUpdate } = renderHook(() => usePreviewMode());
    await waitForNextUpdate();
    const [, togglePreview] = result.current;
    act(() => {
      togglePreview(false);
    });
    await waitForNextUpdate();

    const [preview, , loading] = result.current;
    expect(preview).toBe(true);
    expect(loading).toBe(false);
  });

  it('should return loading while updating preview', async () => {
    (getPreviewMode as any).mockImplementation(() => Promise.resolve(true));
    (setPreviewMode as any).mockImplementation(() => Promise.reject());

    const { result, waitForNextUpdate } = renderHook(() => usePreviewMode());
    await waitForNextUpdate();
    const [, togglePreview] = result.current;
    act(() => {
      togglePreview(false);
    });

    const [, , loading] = result.current;
    expect(loading).toBe(true);

    await waitForNextUpdate();
  });
});
