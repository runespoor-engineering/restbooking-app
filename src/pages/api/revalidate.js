import Cors from 'cors';
import rateLimit from 'express-rate-limit';
import initMiddleware from '../../utils/initMiddleware.js';

const cors = initMiddleware(Cors({ methods: ['GET'] }));
const rateLimiter = initMiddleware(
  rateLimit({
    windowMs: 1000, // 1 second
    max: 4 // limit each IP to 4 requests per windowMs
  })
);

const revalidateHandler = async (req, res) => {
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  await cors(req, res);
  await rateLimiter(req, res);
  const t1 = Date.now();

  try {
    await res.revalidate(req.query.path);
    const t2 = Date.now();
    const takenTime = (t2 - t1) / 1000;
    const roundedTime = Math.round(takenTime * 100) / 100;
    console.log(`[Next.js] revalidated ${req.query.path} in ${roundedTime} second(s)`);
    return res.json({ revalidated: true });
  } catch (err) {
    const t3 = Date.now();
    const takenTime = (t3 - t1) / 1000;
    const roundedTime = Math.round(takenTime * 100) / 100;
    console.log(`[Next.js] failed to revalidate ${req.query.path} in ${roundedTime} second(s)`);
    return res.status(500).send({ message: 'Error revalidating', err });
  }
};

export default revalidateHandler;
