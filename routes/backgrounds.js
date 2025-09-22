const express = require('express');
const router = new express.Router();
const fs = require('fs');

router.get('/:fileName', function(req, res, next) {
  const {fileName} = req.params;
  fs.readFile(`./backgrounds/${fileName}`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
