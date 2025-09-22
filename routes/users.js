const express = require('express');
const router = new express.Router();
const {signIn, checkIsAdmin} = require('../utils/auth');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/signIn', async function(req, res, next) {
  const {credential} = req.body;
  signIn(credential)
      .then((user) => {
        req.session.user = user;
        res.redirect('/');
      })
      .catch((_) => res.redirect('/?event=invalid_email'));
});

router.post('/updateUser', checkIsAdmin, async function(req, res, next) {
  const {user, admin} = req.body;

  if (!user || !(['true', 'false'].includes(admin))) {
    res.sendStatus(500);
    return;
  }

  await prisma.user.update({
    where: {
      email: user,
    },
    data: {
      admin: admin === 'true',
    },
  });
  res.redirect('/admin');
});

module.exports = router;
