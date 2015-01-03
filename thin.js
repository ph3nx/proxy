var Thin = require('thin'),
    proxy = new Thin()

proxy.use(function(req, res, next) {
  console.log('Proxying:', req.url);
  next();
});

// you can add different layers of "middleware" similar to "connect", 
// but with few exclusions
proxy.use(function(req, res, next) {
  if (req.url === '/foobar')
    return res.end('intercepted');
  next();
});

proxy.listen(8080, 'localhost', function(err) {
  console.log(err)
})