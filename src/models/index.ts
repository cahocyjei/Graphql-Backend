import Role from '@models/roles';
import User from '@models/user';

Role.belongsToMany(User,{ through: 'UserRoles' });
User.belongsToMany(Role,{ through: 'UserRoles' });
export { Role, User };