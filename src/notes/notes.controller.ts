import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
  ) {
    const generatedId = await this.notesService.createNote(
      title,
      content,
      tags,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllNotes() {
    const notes = await this.notesService.getAllNotes();
    return notes;
  }

  @Get(':id')
  getNotes(@Param('id') noteId: string) {
    return this.notesService.getNoteById(noteId);
  }

  @Patch(':id')
  async updateNote(
    @Param('id') noteId: string,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tags') tags: string[],
  ) {
    await this.notesService.updateNote(noteId, title, content, tags);
    return null;
  }

  @Delete(':id')
  async deleteNote(@Param('id') noteId: string) {
    await this.notesService.deleteNote(noteId);
  }
}
