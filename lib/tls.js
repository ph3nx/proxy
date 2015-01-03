var tls = require('tls')

s = tls.connect('443', 'google.de', function(){
  console.log('client connected', s.authorized ? 'authorized' : 'unauthorized')
})
