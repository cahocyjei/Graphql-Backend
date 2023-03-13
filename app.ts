import express from 'express';
import mongoose from 'mongoose';
import UserRoutes from './routes/user';

const app = express();

// URL de conexión a la base de datos
const dbURL = 'mongodb://localhost';
const serverPort = 3001;

const dbConnection = async () => {
  try {
    const dbOptions: mongoose.ConnectOptions = {
        dbName: '',
        user: '',
        pass: ''
    };
    await mongoose.connect(dbURL, dbOptions);
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error(error);
  }
}
dbConnection();

app.listen(serverPort, () => {
  console.log('Servidor iniciado en el puerto ' + serverPort);
});

app.use(UserRoutes);