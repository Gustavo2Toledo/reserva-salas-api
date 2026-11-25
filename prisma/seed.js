const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function run() {
  await prisma.reservation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash('admin123', 8);

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@teste.com',
      password: hash,
      role: 'admin'
    }
  });

  await prisma.room.create({
    data: {
      name: 'Lab 1',
      capacity: 30,
      location: 'Bloco B'
    }
  });

  await prisma.room.create({
    data: {
      name: 'Lab 2',
      capacity: 25,
      location: 'Bloco B'
    }
  });

  await prisma.room.create({
    data: {
      name: 'Auditorio',
      capacity: 100,
      location: 'Bloco A'
    }
  });

  console.log('banco populado com sucesso: admin e salas criadas');
}

run()
  .catch((e) => console.log(e))
  .finally(() => prisma.$disconnect());
