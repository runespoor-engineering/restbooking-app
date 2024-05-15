import nookies from 'nookies';

export const setCookie = async (req, res) => {
  const { name, value, exp = 3600 } = req.body;

  if (!name) {
    res.status(400).json({ name: 'Unknown cookie name.`' });
  }

  nookies.set({ req, res }, name, value, {
    maxAge: exp,
    path: '/'
  });

  res.statusCode = 200;
  res.json({ success: true });
};

export const fetchSetCookie = ({ name, value, exp }) =>
  fetch('/api/cookie/setCookie', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, value, exp })
  });
