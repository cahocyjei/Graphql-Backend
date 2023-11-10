
import { Schema, model,Document,Model,Types, isValidObjectId} from 'mongoose';
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
  name:{
    type: String,
    required: true,
    trim:true,
    minlength:4,
    maxlength:50
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim:true,
    lowercase:true,
    validate:{
      validator:function (v: string) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message:'Invalid email address'
    }
 
},

  password:{
    type:String,
    required:true,
    minlength:8,
    maxlength:8
  },
  
  roles:[{
    ref:"Role",
    type:Schema.Types.ObjectId
  }],
},
{timestamps:true,versionKey:false},

);

userSchema.statics.encryptPassword = async (password)=>{
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password,salt);
}

userSchema.statics.comparePassword = async (password,receivedPassword)=>{
  return await bcrypt.compare(password,receivedPassword);
};
export default model<User,IUser>('UserModel', userSchema);