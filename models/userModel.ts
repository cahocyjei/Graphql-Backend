
import { Schema, model,Document,Model,Types} from 'mongoose';
import bcrypt from 'bcryptjs';

interface User{
  name: string;
  email: string;
  password:string;
  roles:Types.ObjectId[];
}

interface IUser extends Model<User> {
  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}

const userSchema = new Schema<User>({
  name:{type: String,required: true},
  email:{type: String,required: true,unique: true},
  password:{type:String,required:true},
  roles:[{
    ref:"Role",
    type:Schema.Types.ObjectId
  }],
},
{timestamps:true,versionKey:false} 
);

userSchema.statics.encryptPassword = async (password)=>{
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password,salt);
}

userSchema.statics.comparePassword = async (password,receivedPassword)=>{
  return await bcrypt.compare(password,receivedPassword);
};
export default model<User,IUser>('UserModel', userSchema);