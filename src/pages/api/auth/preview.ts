import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).send(null);
    return;
  }

  if (req.query.enable === 'true') res.setPreviewData({});
  else res.clearPreviewData();

  res.status(200).send(null);
};
export default preview;
