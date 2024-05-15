import Cors from 'cors';
import rateLimit from 'express-rate-limit';

import initMiddleware from '../../utils/initMiddleware';

const cors = initMiddleware(Cors({ methods: ['GET'] }));

const rateLimiter = initMiddleware(
  rateLimit({
    windowMs: 1000, // 1 second
    max: 2 // limit each IP to 2 requests per windowMs
  })
);

const previewHandler = async (req, res) => {
  if (req.query.token !== process.env.PREVIEW_TOKEN || !req.query.path) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  await cors(req, res);
  await rateLimiter(req, res);

  res.setPreviewData({});
  return res.redirect(req.query.path);
};

export default previewHandler;
