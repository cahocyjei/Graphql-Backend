import mongoose from 'mongoose';
import UserRoutes from '../routes/user.router';
import bodyParser from 'body-parser';
import { createRoles } from '../libs/initial.setup'

const dbURL = 'mongodb://db';
async function serverStart(app:any,serverPort: any){

    try {
      const dbOptions: mongoose.ConnectOptions = {
          dbName: 'dbswimming',
          user: 'troyka',
          pass: 'troy1914'
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
      createRoles();
    } catch (error) {
      console.error(error);
    }
  }

  export default serverStart;