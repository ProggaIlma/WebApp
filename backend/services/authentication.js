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

