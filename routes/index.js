const express = require('express');
const router = new express.Router();
const {getAuthLevel} = require('../utils/auth');

/* GET home page. */
router.get('/', getAuthLevel, async function(req, res, next) {
  const {event} = req.query;
  let successMessage = '';
  let failMessage = '';
  if (event === 'upload_successful') {
    successMessage = 'Your file was uploaded successfully';
  } else if (event === 'invalid_email') {
    failMessage = 'You must sign in using a oregonstate.edu email';
  }
  res.render('index', {successMessage, failMessage});
});

module.exports = router;
