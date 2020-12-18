import { getPreviewMode, setPreviewMode } from '.';

import fetchMock from 'fetch-mock';

const endpoint = '/api/auth/preview';

afterEach(() => {
  fetchMock.restore();
});

describe('getPreviewMode', () => {
  it('should call API endpoint', async () => {
    fetchMock.getOnce(endpoint, { preview: false });
    await getPreviewMode();
    expect(fetchMock.calls(endpoint).length).toEqual(1);
  });

  it('should return correct response', async () => {
    fetchMock.getOnce(endpoint, { preview: false });
    let result = await getPreviewMode();
    expect(result).toEqual(false);
    expect(fetchMock.calls(endpoint).length).toEqual(1);

    fetchMock.restore();

    fetchMock.getOnce(endpoint, { preview: true });
    result = await getPreviewMode();
    expect(result).toEqual(true);
    expect(fetchMock.calls(endpoint).length).toEqual(1);
  });
});

describe('setPreviewMode', () => {
  it('should call endpoint', async () => {
    fetchMock.postOnce(endpoint, { preview: false });

    await setPreviewMode(false);

    expect(fetchMock.calls(endpoint).length).toEqual(1);
  });

  it('should pass correct body', async () => {
    fetchMock.postOnce(
      { url: endpoint, name: 'endpoint', body: { enable: false } },
      { preview: false }
    );
    await setPreviewMode(false);
    expect(fetchMock.calls('endpoint').length).toEqual(1);

    fetchMock.restore();

    fetchMock.postOnce(
      { url: endpoint, name: 'endpoint', body: { enable: true } },
      { preview: true }
    );
    await setPreviewMode(true);
    expect(fetchMock.calls('endpoint').length).toEqual(1);
  });

  it('should throw on set failure', async () => {
    fetchMock.postOnce(endpoint, { preview: false });
    try {
      await setPreviewMode(true);
    } catch (e) {
      expect(e).toBeTruthy();
    }
    fetchMock.restore();

    fetchMock.postOnce(endpoint, { preview: true });
    try {
      await setPreviewMode(false);
    } catch (e) {
      expect(e).toBeTruthy();
    }
    expect.assertions(2);
  });
});
