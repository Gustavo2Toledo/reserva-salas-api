const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  try {
    const rooms = await prisma.room.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    return res.json(rooms);
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return res.status(500).json({ error: 'Erro ao buscar salas.' });
  }
});

router.post('/', async (req, res) => {
  const { name, capacity, location } = req.body;
  const parsedCapacity = Number(capacity);

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    !Number.isInteger(parsedCapacity) ||
    parsedCapacity <= 0 ||
    typeof location !== 'string' ||
    !location.trim()
  ) {
    return res.status(400).json({
      error: 'Informe nome, capacidade (inteiro positivo) e local válidos.',
    });
  }

  try {
    const room = await prisma.room.create({
      data: {
        name: name.trim(),
        capacity: parsedCapacity,
        location: location.trim(),
      },
    });

    return res.status(201).json(room);
  } catch (error) {
    console.error('Erro ao criar a sala:', error);
    return res.status(500).json({ error: 'Erro ao criar a sala.' });
  }
});

module.exports = router;