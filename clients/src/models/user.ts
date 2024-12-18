import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>("User", userSchema);
export default User;