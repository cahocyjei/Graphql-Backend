import { Sequelize } from 'sequelize';
import { initUserModel } from 'models/user';
import { initRoleModel } from 'models/role';
import { initUserRoleModel } from 'models/user-roles';
import DBCONFIG  from '@config/config';

export class Connection {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(DBCONFIG.database, DBCONFIG.username, DBCONFIG.password, {
      host: DBCONFIG.host,
      dialect: DBCONFIG.dialect,
    });
    initUserModel(this.sequelize);
    initRoleModel(this.sequelize);
    initUserRoleModel(this.sequelize);
  }  

  closeConnection() {
    this.sequelize.close();
  }
}
