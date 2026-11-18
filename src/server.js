const express = require('express');
const roomsRouter = require('./routes/rooms');

const app = express();

app.use(express.json());
app.use('/api/rooms', roomsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});