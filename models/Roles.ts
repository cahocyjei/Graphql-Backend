import { model, Schema } from 'mongoose';

interface Role {
    name: String;
}

const roleSchema = new Schema<Role>({
    name: {type: String},
},
    {versionKey:false}
);

export default model<Role>("Role", roleSchema);