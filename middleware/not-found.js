const notFound = (req, res, next) => {
  res.status(404).send('Routes does not exist');
};

module.exports = notFound;
