var http = require('http'),
    https = require('https'),
    net = require('net'),
    fs = require('fs'),
    tls = require('tls'),
    net = require('net')

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var host,port

tls.createServer({
  pfx: fs.readFileSync('server.pfx')
}, function(s){
  var data = ''
  s.on('data', function(d){
    data += d
    console.log(data)
    console.log(d.toString())
    if (data.substring(data.length - 4) == '\r\n\r\n'){
      /*var nData = data.split('\n\n'),
          conn = nData[0].split(',')
      console.log(conn[0], conn[1])*/
      var clear = tls.connect(port, host/*conn[0], conn[1]*//*443, 'www.google.de'*/, function(){
        clear.pipe(s)
        s.pipe(clear)
        clear.write(data)
      })
      clear.on('data', function(d){
        console.log(d.toString())
      })
    }
  })
}).listen(8081)

net.createServer(function(c){
  var data = ''
  c.on('data', function(d){
    console.log(d.toString())
    data += d
    if (data.substring(data.length - 4) == '\r\n\r\n'){
      console.log(data)
      var m = data.match(/CONNECT ([a-z0-9.]+):(\d+) HTTP\/1.1/)
      if (m){
        console.log('connect', m[2], m[1])
        port = m[2]
        host = m[1]
        var s = net.connect(8081/*m[2], m[1]/**/, function(){
          console.log('connected to 8081')
          //s.write(m[2] + ',' + m[1]/* + '\n\n'*/)
          //s.end('hello\r\n')
          s.pipe(c)
          c.pipe(s)
          //s.write(m[2] + ',' + m[1] + '\n\n')
          //setTimeout(function(){
          c.write('HTTP/1.1 200 OK\r\n\r\n')
          //}, 1000)
          
        })
        s.on('data', function(d){
          //console.log(d.toString())
        })
      } else {
        c.end()
      }
    }
  })
  c.on('end', function(){
    console.log('end')
  })
  c.on('error', function(e){
    console.log(e)
  })
}).listen(8080)
