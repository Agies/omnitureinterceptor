var express = require('express');
var io = require('../../components/websocket');
var router = express.Router();

router.all('/b/ss/:client/0/OIP-4.5.2/:code', (req, res) => {
  var data = {
    ip: req.ips || req.ip,
    client: req.params.client,
    body: req.body
  };
  console.log(data);
  io.broadcast('', data);
  res.send(data);
});

module.exports = router;
