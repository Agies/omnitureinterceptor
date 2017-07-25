var express = require('express');
var io = require('../../components/websocket');
var request = require('request');
var router = express.Router();
//https://omnitureinterceptor.herokuapp.com/api/omniture/b/ss/alliancenativenewyorkandcompany-dev/0/JAVA-4.5.0-AN/s52567645
router.all('/b/ss/:client/0/:platform/:code', (req, res) => {
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
  request.post(`https://alliancedata.sc.omtrdc.net/b/ss/${req.params.client}/0/${req.params.platform}/${req.params.code}`, req.body);
  res.send(data);
});

module.exports = router;
