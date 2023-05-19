export default (req, res, next) => {
  req.initialTimeStamp = Date.now();
  next();
};
