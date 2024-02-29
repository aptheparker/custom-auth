import { serialize } from 'cookie';
import { encode } from '../../lib/jwt';

function authenticateUser(email, password) {
  const validEmail = 'aptheparker@gmail.com';
  const validPassword = 'almighty';

  if (email === validEmail && password === validPassword) {
    return encode({
      id: 'f678f078-fcfe-43ca-9d20-e8c9a95209b6',
      name: 'aptheparker',
      email: 'aptheparker@gmail.com',
    });
  }

  return null;
}

export default (req, res) => {
  const { method } = req;
  const { email, password } = req.body;

  if (method !== 'POST') {
    return res.status(404).end();
  }

  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing required params',
    });
  }

  const user = authenticateUser(email, password);

  if (user) {
    res.setHeader('Set-Cookie', serialize('my_auth', user, { path: '/', httpOnly: true }));
    return res.json({ success: true });
  } else {
    return res.status(401).json({
      success: false,
      error: 'Wrong email of password',
    });
  }
};
