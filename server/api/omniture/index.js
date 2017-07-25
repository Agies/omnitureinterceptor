var express = require('express');
var io = require('../../components/websocket');
var request = require('request');
var router = express.Router();

router.all('/b/ss/:client/0/OIP-4.5.2/:code', (req, res) => {
  req.body.deviceName = req.body.deviceName || req.body.DeviceName;
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
  request.post(`https://alliancedata.sc.omtrdc.net/b/ss/${req.params.client}/0/OIP-4.5.2/${req.params.code}`, req.body);
  res.send(data);
});

module.exports = router;
