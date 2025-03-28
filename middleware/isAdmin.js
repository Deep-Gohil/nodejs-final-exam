const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden",success: false });
        }
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden", success: false });
        }
        req.user = decoded;
        next();
    });
}

module.exports = isAdmin;