const Prisma = require('@prisma/client');
const {PrismaClient} = Prisma;

const global = {};

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

module.exports = prisma;
