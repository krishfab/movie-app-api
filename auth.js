const jwt = require('jsonwebtoken');
const secret =  process.env.JWT_SECRET_KEY;

module.exports.createAccessToken = (user) => { 
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(data, secret); 
};

module.exports.verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, secret); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid token" });
  }
};


module.exports.verifyAdmin = (req, res, next) => { 
    if (!req.user.isAdmin) {
        return res.status(403).send({ error: "Admin access required" });
    }
    next();
};
