import { Schema, model } from 'mongoose';

interface User {
  name: string;
  email: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<User>('UserModel', userSchema);