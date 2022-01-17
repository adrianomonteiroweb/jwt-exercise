const errorHandler = (promise) => promise
  .then((result) => [null, result])
  .catch((error) => [error]);

module.exports = {
  errorHandler,
};
