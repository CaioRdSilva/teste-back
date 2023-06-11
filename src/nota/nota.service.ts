import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDTO } from 'src/DTO/create-note.dto';
import { CategoryEntity } from 'src/Entity/category.entity';
import { NoteEntity } from 'src/Entity/notas.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(NoteEntity) private repo: Repository<NoteEntity>,
    @InjectRepository(CategoryEntity)
    private repoCat: Repository<CategoryEntity>,
  ) {}

  async getAllNotes(user: UserEntity) {
    const query = this.repo.createQueryBuilder('note');
    query.where(`note.userId = :userId`, { userId: user.id });

    try {
      return await Promise.all([query.getMany()]);
    } catch (err) {
      console.log(err.stack);
      throw new NotFoundException('No Notes Found');
    }
  }

  async getNoteDesc(Id: number) {
    const query = this.repo.createQueryBuilder('note');
    const queryCat = this.repoCat.createQueryBuilder('categoria');

    query.where(`note.id = :id`, { id: Id });
    queryCat.where(`categoria.noteId = :noteId`, { noteId: Id });

    return await Promise.all([query.getOne(), queryCat.getMany()]);
  }

  async createNote(CreateNoteDTO: CreateNoteDTO, user: UserEntity) {
    const note = new NoteEntity();
    const { title, description } = CreateNoteDTO;
    note.title = title;
    note.description = description;
    note.userId = user.id;

    try {
      this.repo.create(note);
      return await this.repo.save(note);
    } catch (err) {
      console.log(err.stack);
    }
  }

  async updateDesc(id: number, description: string, user: UserEntity) {
    try {
      await this.repo.update({ id, userId: user.id }, { description });
      return this.repo.findOne({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException('update failed');
    }
  }

  async delete(id: number, user: UserEntity) {
    const result = await this.repo.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException('Note not deleted');
    } else {
      return { sucess: true };
    }
  }
}
