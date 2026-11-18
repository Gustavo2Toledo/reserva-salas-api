
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// LISTAR SALAS
router.get('/', async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const size = Math.min(Math.max(parseInt(req.query.size) || 10, 1), 100);

  try {
    const rooms = await prisma.room.findMany({
      skip: (page - 1) * size,
      take: size,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json(rooms);
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return res.status(500).json({
      error: 'Erro ao buscar salas.'
    });
  }
});

// BUSCAR SALA POR ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const room = await prisma.room.findUnique({
      where: { id }
    });

    if (!room) {
      return res.status(404).json({
        error: 'Sala não encontrada.'
      });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.error('Erro ao buscar sala:', error);
    return res.status(500).json({
      error: 'Erro ao buscar sala.'
    });
  }
});

// CADASTRAR SALA
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
      error: 'Informe nome, capacidade (inteiro positivo) e local válidos.'
    });
  }

  try {
    const room = await prisma.room.create({
      data: {
        name: name.trim(),
        capacity: parsedCapacity,
        location: location.trim()
      }
    });

    return res.status(201).json(room);
  } catch (error) {
    console.error('Erro ao criar a sala:', error);
    return res.status(500).json({
      error: 'Erro ao criar a sala.'
    });
  }
});

// ATUALIZAR SALA
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, capacity, location } = req.body;

  const parsedCapacity =
    capacity !== undefined ? Number(capacity) : undefined;

  if (
    (name !== undefined &&
      (typeof name !== 'string' || !name.trim())) ||
    (capacity !== undefined &&
      (!Number.isInteger(parsedCapacity) || parsedCapacity <= 0)) ||
    (location !== undefined &&
      (typeof location !== 'string' || !location.trim())) ||
    (name === undefined &&
      capacity === undefined &&
      location === undefined)
  ) {
    return res.status(400).json({
      error: 'Informe pelo menos um campo válido para atualização.'
    });
  }

  try {
    const existingRoom = await prisma.room.findUnique({
      where: { id }
    });

    if (!existingRoom) {
      return res.status(404).json({
        error: 'Sala não encontrada.'
      });
    }

    const room = await prisma.room.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(capacity !== undefined && { capacity: parsedCapacity }),
        ...(location !== undefined && { location: location.trim() })
      }
    });

    return res.status(200).json(room);
  } catch (error) {
    console.error('Erro ao atualizar sala:', error);
    return res.status(500).json({
      error: 'Erro ao atualizar sala.'
    });
  }
});

// EXCLUIR SALA
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existingRoom = await prisma.room.findUnique({
      where: { id }
    });

    if (!existingRoom) {
      return res.status(404).json({
        error: 'Sala não encontrada.'
      });
    }

    await prisma.room.delete({
      where: { id }
    });

    return res.status(200).json({
      message: 'Sala excluída com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao excluir sala:', error);
    return res.status(500).json({
      error: 'Erro ao excluir sala.'
    });
  }
});

module.exports = router;
