import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NoteEntity } from './notas.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;

  @OneToMany(()=> NoteEntity, (note: NoteEntity) => note.user)
  note: NoteEntity[]
}
