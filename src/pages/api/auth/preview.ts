import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).send(null);
    return;
  }

  switch (req.method) {
    case 'GET':
      res.status(200).send({ preview: req.preview, data: req.previewData });
      break;

    case 'POST':
      const enable = req.body.enable === true;
      if (enable) res.setPreviewData({});
      else res.clearPreviewData();

      res.status(200).send({ preview: enable });
      break;
  }
};
export default preview;
