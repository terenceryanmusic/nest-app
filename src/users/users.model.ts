import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
