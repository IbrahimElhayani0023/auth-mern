import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    // Verify the token
    // and check if it is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if valid, get the user id from the token
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });
    // set the user id in the request object
    req.user = decoded.userId;
    // call the next middleware
    next();

}
