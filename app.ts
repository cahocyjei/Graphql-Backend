import express from 'express';
import mongoose from 'mongoose';
import UserRoutes from './routes/user';
import bodyParser from 'body-parser';

const app = express();

// URL de conexión a la base de datos
const dbURL = 'mongodb://127.0.0.1:27017/';
const serverPort = 3001;

const serverStart = async () => {
  try {
    const dbOptions: mongoose.ConnectOptions = {
        dbName: 'swimming',
        user: 'root',
        pass: '123456'
    };
    await mongoose.connect(dbURL, dbOptions);
    console.log('Database connection successfully.');
    app.listen(serverPort, () => {
      console.log('Server started on port: ' + serverPort);
    });
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    console.log('Body parser configured. ' + serverPort);

    app.use(UserRoutes);
  } catch (error) {
    console.error(error);
  }
}
serverStart();

