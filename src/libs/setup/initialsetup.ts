import { Role,Roles } from '@models/roles';
import { User } from '@models/user';
import { sequelize } from '@libs/db/sequelize';

const promesas = ()=>{
  const roleAdm= Role.build({ name: Roles.Admin });
  const roleUser= Role.build({ name: Roles.User });
  const roleModerator= Role.build({ name: Roles.Moderator });
  const promises = [
    roleAdm.save(),
    roleUser.save(),
    roleModerator.save(),
  ];
  return promises;
};
async function InitRoles(){
  await Promise.all(promesas())
    .then(results=>{
      console.log('suscessfull Roles: ',results);
    }).catch((error)=>console.error('Error al crear nuevos Roles: ',error));
} 
export async function TablesSyncAll(){
  try {
    await sequelize.sync().then(async()=>{
      User.associate(sequelize.models);
      Role.associate(sequelize.models);
      (await Role.findAll()).length ===0?await InitRoles():null;
      console.log('Created suscessfull All tables');
    });
  } catch (error) {
    console.error('Error to create tables: ',error);
  }  
}