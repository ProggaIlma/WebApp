import JWT from 'jsonwebtoken';

const secret = "Superman@123"

export const generateToken = (user)=> {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };
    return JWT.sign(payload, secret);
}
export const verifyToken =(token)=> {
    try {
        const decoded = JWT.verify(token, secret);
        return decoded;
    } catch (error) {
        return null;
    }}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
