const pingAPI = fn => (req, res) =>
  (req.method == 'GET' && req.url == '/') ? ({ hello: 'oxford-api-f is A-Ok!' }) : fn(req, res)


module.exports = pingAPI
