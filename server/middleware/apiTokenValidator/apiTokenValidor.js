const apiTokenValidator = (_req, res, next) => {
  console.log('middleware')
  if (!process.env.NOMICS_TOKEN || !process.env.MIN_API_TOKEN) {
    res.send({message: 'Some of the token was not provided'});
  } else {
    next()
  }
}

export { apiTokenValidator }