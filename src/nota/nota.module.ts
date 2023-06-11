import { Module } from '@nestjs/common';
import { NotaController } from './nota.controller';
import { NotaService } from './nota.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/Entity/notas.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryEntity } from 'src/Entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity, CategoryEntity]), AuthModule],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
