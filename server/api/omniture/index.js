var express = require('express');
var io = require('../../components/websocket');
var router = express.Router();

router.all('/b/ss/:client/0/OIP-4.5.2/:code', (req, res) => {
  var data = {
    ip: req.ip || req.connection.remoteAddress,
    client: req.params.client,
    code: req.params.code,
    body: req.body
  };
  console.log(data);
  io.broadcast('', data);
  res.send(data);
});

module.exports = router;
