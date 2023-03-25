import Role from '../models/Roles'
import userModel from '../models/userModel';
import config from '../config';
import Roles from '../models/Roles'

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    const foundAdmin = await userModel.findOne({ email: config.EMAIL });
    const foundRole = await Roles.findOne({name:"admin"});
    
    const userAdmin = new userModel({
      name: config.NAME,
      email: config.EMAIL,
      password: await userModel.encryptPassword(config.SECRET),
      roles: foundRole?.id
    });
      
      if (!foundAdmin) {
        userAdmin.save();
    };

    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'admin' }).save(),
      new Role({ name: 'moderator' }).save(),

    ]);
  } catch (error) {
    console.error(error);
  }
};