const jwt = require("jsonwebtoken");
const secretKey = "secret";

const verify = (req, res, next) => {
    const token = req.headers["auth"];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                msg: err,
            });
        }
        req.id = decoded.id;
        req.role = decoded.role;
        req.username = decoded.username;
        // req.userID = decoded.userID;
        next();
    });
};

const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {
        algorithm: "HS256",
        expiresIn: "23H",
    });
    return token;
};

module.exports = {
    verify,
    generateToken,
};