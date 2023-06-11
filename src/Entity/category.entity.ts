import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NoteEntity } from './notas.entity';

@Entity('categoria')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  categoria: string;

  @ManyToOne(() => NoteEntity, (note: NoteEntity) => note.categoria)
  note: NoteEntity;
  @Column()
  noteId: number;
}
