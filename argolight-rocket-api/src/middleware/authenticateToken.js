import jwt from 'jsonwebtoken';
  
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ error: 'Invalid Token' });
      }
      req.user = decoded.user;
      next();
  });
};

export default authenticateToken