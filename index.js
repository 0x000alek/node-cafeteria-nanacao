import express, { json } from 'express';
import serverRoutes from './routes/server.routes.js';

const app = express();

app.use(json());

app.use(serverRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'La ruta que intenta consultar no existe' });
});

const server = app.listen(3000, () => {
  console.log('SERVER ON');
});

export default server;
