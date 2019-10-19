const jwt = require('jsonwebtoken')
const logger = require('../../logger')
const params = require('../../../parameters')

const isAdmin = (req, res, next) => {

  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({
      message: "Missing authorization header"
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isAdmin !== true) {
      res.status(403).json({
        message: "Access denied. Not admin"
      });
      return
    }

    req.user = decoded;

    next();

  } catch (e) {
    logger.error(e)

    res.status(401).json({
      message: "Not authorized"
    })
  }
}

const isOwner = (req, res, next) => {

  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({
      message: "Missing authorization header"
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isOwner !== true) {
      res.status(403).json({
        message: "Access denied. Not owner"
      });
      return
    }

    req.user = decoded;

    next();

  } catch (e) {
    logger.error(e)

    res.status(401).json({
      message: "Not authorized"
    })
  }
}

const isAuthenticated = (req, res, next) => {

  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({
      message: "Missing authorization header"
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || !(decoded.isOwner || decoded.isAdmin)) {
      res.status(403).json({
        ...decoded,
        message: "Access denied"
      });
      return
    }

    req.user = decoded;

    next();

  } catch (e) {
    logger.error(e)

    res.status(401).json({
      message: "Not authorized"
    })
  }
}

const generateAuthToken = content => {
  return jwt.sign(JSON.stringify(content), params.secret);
}

const verifyToken = token => {
  return jwt.verify(token, params.secret);
}

module.exports = {
  isAuthenticated,
  isAdmin,
  isOwner,
  verifyToken,
  generateAuthToken
}