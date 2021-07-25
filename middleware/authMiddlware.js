const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send(`Unauthorized-no header`);
    }

    const { userId } = jwt.verify(req.headers.authorization, process.env.JWTSECRET);
    if(!userId){
      console.log('no-user-id');
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send(`Unauthorized`);
  }
};
