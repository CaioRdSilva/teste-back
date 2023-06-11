import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { NotaService } from './nota.service';
import { CreateNoteDTO } from 'src/DTO/create-note.dto';
import { NoteDescriptionValidationPipe } from 'src/pipes/NoteDescriptionValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/Entity/user.entity';

//http:/localhost:3000/notas
@Controller('notas')
@UseGuards(AuthGuard())
export class NotaController {
  constructor(private notaService: NotaService) {}

  //(Busca todas as notas) http:/localhost:3000/notas
  @Get()
  getAllNotes(@User() user: UserEntity) {
    return this.notaService.getAllNotes(user);
  }

  //(Busca a nota especificada e sua(s) categoria(s))  http:/localhost:3000/notas/:id
  @Get(':id')
  getNoteDesc(@Param('id') id: number) {
    return this.notaService.getNoteDesc(id);
  }

  //(Cria nova nota) http:/localhost:3000/notas
  @Post()
  createNewNote(
    @Body(ValidationPipe) dataNote: CreateNoteDTO,
    @User() user: UserEntity,
  ) {
    return this.notaService.createNote(dataNote, user);
  }

  //(Atualiza descrição da nota especificada) http:/localhost:3000/notas/:id
  @Patch(':id')
  updateNote(
    @Body('description', NoteDescriptionValidationPipe) description: string,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.notaService.updateDesc(id, description, user);
  }

  //(Deleta nota especificada) http:/localhost:3000/notas/:id
  @Delete(':id')
  deleteNote(@Param('id') id: number, @User() user: UserEntity) {
    return this.notaService.delete(id, user);
  }
}
