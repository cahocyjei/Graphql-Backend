import express from 'express';
import serverStart from './libs/dbmongo';

const app = express();
const serverPort = 3000;

serverStart(app,serverPort);

