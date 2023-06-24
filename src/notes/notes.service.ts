import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './notes.model';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('Note')
    private readonly notesModel: Model<Note>,
  ) {}

  // create a new note
  async createNote(title: string, content: string, tags: string[]) {
    const newNote = new this.notesModel({
      title,
      content,
      tags,
    });
    const result = await newNote.save();
    return result.id as string;
  }
  // get all notes
  async getAllNotes() {
    const notes = await this.notesModel.find();
    return notes.map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content,
    }));
  }
  // get a single note
  async getNoteById(noteId: string) {
    const note = await this.findNote(noteId);
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      tags: note.tags,
    };
  }

  // update a note
  async updateNote(
    noteId: string,
    title: string,
    content: string,
    tags: string[],
  ) {
    const updatedNote = await this.findNote(noteId);
    if (title) {
      updatedNote.title = title;
    }
    if (content) {
      updatedNote.content = content;
    }
    if (tags) {
      updatedNote.tags = tags;
    }
    updatedNote.save();
  }
  // delete a note
  async deleteNote(noteId: string) {
    const result = await this.notesModel.deleteOne({ _id: noteId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Note not found');
    }
  }

  private async findNote(id: string): Promise<Note> {
    let note: Note;
    try {
      note = await this.notesModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Note not found');
    }
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }
}
