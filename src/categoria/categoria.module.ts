import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/Entity/category.entity';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), AuthModule],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}
