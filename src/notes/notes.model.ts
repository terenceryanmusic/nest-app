import * as mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: Array, required: true },
});

export interface Note extends mongoose.Document {
  id: string;
  title: string;
  content: string;
  tags: string[];
}
