import { Roles } from '@models/roles';
import sequelize from '@libs/db/sequelize';
import { Role }  from '@models/index';

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
    .then(()=>console.log('Suscessfull Roles'))
    .catch((error)=>console.error('Error al crear nuevos Roles: ',error));
} 
export async function TablesSyncAll(){
  try {
    await sequelize.sync();
    (await Role.findAll()).length ===0?await InitRoles().then(()=>console.log('Created suscessfull All tables')):console.log('Tables existing');
  } catch (error) {
    console.error('Error to create tables: ',error);
  }  
}