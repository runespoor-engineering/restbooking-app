import nookies from 'nookies';

export const eraseCookie = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ name: 'Unknown cookie name.`' });
  }
  nookies.destroy({ req, res }, name, { path: '/' });
  res.statusCode = 200;
  res.json({ success: true });
};

export const fetchEraseCookie = ({ name }) =>
  fetch('/api/cookie/eraseCookie', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });
