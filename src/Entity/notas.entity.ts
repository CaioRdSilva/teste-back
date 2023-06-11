import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { CategoryEntity } from './category.entity';


@Entity('notas')
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;

  @ManyToOne(()=> UserEntity, (user: UserEntity) => user.note)
  user: UserEntity
  @Column()
  userId: number

  @OneToMany(()=> CategoryEntity, (categoria: CategoryEntity) => categoria.note)
  categoria: CategoryEntity[]
}


