import { Role } from '@models/roles';
import { User } from '@models/user';
//Promesas
const promesas = ()=>{
  const roleAdm= Role.build({ name: 'admin' });
  const roleUser= Role.build({ name: 'user' });
  const roleModerator= Role.build({ name: 'moderator' });
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

export async function initizializeTableRoles(){
  try {
    await Role.sync().then(async ()=>{
      console.log('roles table created suscessfull');
      (await Role.findAll()).length ===0?await InitRoles():null;
    });
  } catch (error) {
    console.error('Error to create roles table: ',error);
  }  
}

export async function initizializeTableUser(){
  await User.sync()
    .then(()=>console.log('Table User created suscessfull'))
    .catch((error)=>console.error(error));
}