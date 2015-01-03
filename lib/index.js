var http = require('http'),
    https = require('https'),
    net = require('net'),
    fs = require('fs'),
    tls = require('tls')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

/*var sServer = https.createServer({
  pfx: fs.readFileSync('server.pfx')
}, function(q,s){
  console.log(q.url)
}).listen(8081)*/

var tServer = tls.createServer({
  pfx: fs.readFileSync('server.pfx')
}, function(s){
  var parts = s.url.split(':', 2)
  var f = tls.connect(parts[1], parts[0], function(){
    console.log('client connected', s.authorized ? 'authorized' : 'unauthorized')
    //s.write('GET /\n')
    //s.setEncoding('utf8')
    f.pipe(s)
    s.pipe(f)
    //socket.write('HTTP/1.1 200 OK\n\n')
  })
  //s.pipe(process.stdout)
}).listen(8081)

var Proxy = http.createServer(function(q,s){
  console.log(q.url)
  http.request(q.url, function(res){
    res.pipe(s)
  }).end()
})

Proxy.on('connect', function(req, socket, head){
  console.log(req.url)
  var parts = req.url.split(':', 2)/*,
      connection = net.connect(parts[0], parts[1], function(){
    //socket.pipe(connection)
    //connection.pipe(socket)
    socket.pipe()
    socket.write('HTTP/1.1 200 OK\r\n\r\n')
  })
  connection.on('error', function(e){
    console.log(e)
  })*/
  //socket.pipe(process.stdout)
  //socket.pipe(sServer)
  /*https.request('https://0.0.0.0:8081', function(s){
    s.pipe(socket)
  }).end()*/
  /*var s = tls.connect(8081, function(){
    console.log('client connected', s.authorized ? 'authorized' : 'unauthorized')
  })*/
  //s.setEncoding('utf8')
  //s.pipe(socket)
  //socket.pipe(s)


  var s = tls.connect(8081, function(){
    console.log('client connected', s.authorized ? 'authorized' : 'unauthorized')
    //s.write('GET /\n')
    //s.setEncoding('utf8')
    s.pipe(socket)
    socket.pipe(s)
    socket.write('HTTP/1.1 200 OK\n\n')
  })
  /*//s.setEncoding('utf8')
  s.on('data', function(d){
    console.log(d.toString())
    socket.write(d)
  })
  s.on('end', function(){
    socket.end()
  })
  s.on('error', function(e){console.log(e)})

  socket.on('data', function(d){
    console.log(d.toString())
    //s.write('HTTP/1.0 GET /\nHost www.facebook.com\n')
    //s.end()
    s.write(d)
  })
  socket.on('error', function(e){console.log(e)})
  //s.pipe(socket)
  //socket.pipe(s)*/
})

Proxy.listen(8080, function(){
  console.log('proxy listens on port 8080')
})