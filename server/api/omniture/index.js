var express = require('express');
var request = require('request');
var io = require('../../components/websocket');
// var request = require('request');
var router = express.Router();
router.all('/b/ss/:client/0/:platform/:code', (req, res) => {
  req.body.deviceName = req.body.deviceName || req.body.DeviceName;
  req.body.code = req.params.code;
  for(var header in req.query) {
    req.body[header] = req.query[header];
  }
  var data = {
    ip: req.ips || req.ip,
    client: req.params.client,
    body: req.body
  };
  console.log(data);
  io.broadcast('', data);
  if(data.client) {
    io.broadcast(data.client, data);
  }
  if(data.body && data.body.deviceName) {
    io.broadcast(data.body.deviceName, data);
  }
  var url = `https://alliancedata.sc.omtrdc.net/b/ss/${req.params.client}/0/${req.params.platform}/${req.params.code}`;
  request.post({
    url: url,
    form: req.body
  }, (error, resp, body) => {
    console.log('Forwarded', url);
    if(error) {
      console.error('Omniture call failed', error);
    } else {
      console.log('Omniture call succeeded', resp, body);
    }
  });
  res.send(data);
});

module.exports = router;
