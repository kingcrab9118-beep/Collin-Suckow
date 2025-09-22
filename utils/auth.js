const {OAuth2Client} = require('google-auth-library');
const {PrismaClient} = require('@prisma/client');

const {OAUTH_CLIENT_ID, ENVIRONMENT} = process.env;

const prisma = new PrismaClient();
const oauthClient = new OAuth2Client(OAUTH_CLIENT_ID);

// potentially add more orgs if we would want high schoolers to submit
const validEmailOrgs = ['oregonstate.edu'];

const signIn = async (token) => {
  const ticket = await oauthClient.verifyIdToken({
    idToken: token,
    audience: OAUTH_CLIENT_ID,
  });
  const {email} = ticket.getPayload();
  if (!validEmailOrgs.includes(email.split('@')[1])) {
    throw new Error('Email is not in a valid organization');
  }
  let user = await prisma.user.findUnique({where: {email}});
  if (!user) {
    user = await prisma.user.create({
      data: {email},
    });
  }
  return user;
};

const setLocals = async (req, res) => {
  res.locals = {
    title: 'Exhibit X',
    oauthClientID: process.env.OAUTH_CLIENT_ID,
    host: `${ENVIRONMENT === 'dev' ? 'http' : 'https'}://${req.get('host')}`,
    signedIn: isSignedIn(req),
    admin: await isAdmin(req),
    failMessage: '',
  };
};

const getAuthLevel = async (req, res, next) => {
  await setLocals(req, res);
  next();
};

const isSignedIn = (req) => {
  return Boolean(req?.session?.user?.email);
};

const checkSignIn = async (req, res, next) => {
  await setLocals(req, res);
  if (res.locals.signedIn) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const isAdmin = async (req) => {
  const email = req?.session?.user?.email;
  if (!email) return false;
  const {admin} = await prisma.user.findUnique({where: {email}});
  return admin;
};

const checkIsAdmin = async (req, res, next) => {
  await setLocals(req, res);
  if (res.locals.admin) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const ownsSketch = async (req, res, next) => {
  const sketchID = req?.body?.sketchID;
  const email = req?.session?.user?.email;
  if (!(sketchID && email)) return false;
  const sketch = await prisma.sketch.findUnique({
    where: {id: parseInt(sketchID)},
  });
  if (sketch.userEmail === email) {
    return sketch;
  }
  return false;
};

const checkOwnsSketch = async (req, res, next) => {
  const sketch = await ownsSketch(req);
  if (sketch) {
    req.sketch = sketch;
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  checkOwnsSketch,
  checkSignIn,
  checkIsAdmin,
  getAuthLevel,
  signIn,
};
