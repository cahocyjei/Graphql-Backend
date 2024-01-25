import bcrypt from 'bcryptjs';

export async function encryptPassword(password:string){
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Ocurrió un error durante el cifrado de la contraseña:');
  }
}

export async function comparePassword(password:string,receivPassword:string){
  return await bcrypt.compare(password,receivPassword);
}

