module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const base64 = authHeader.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString('utf-8');
  const [user, pass] = decoded.split(':');

  if (
    user === process.env.AUTH_USER &&
    pass === process.env.AUTH_PASS
  ) {
    next();
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};
