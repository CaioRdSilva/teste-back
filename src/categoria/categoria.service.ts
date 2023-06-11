import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from 'src/DTO/create-category.dto';
import { CategoryEntity } from 'src/Entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoryEntity) private repo: Repository<CategoryEntity>,
  ) {}

  async getAllCategorys() {
    const query = this.repo.createQueryBuilder('cat');
    return await query.getMany();
  }

  async getCategory(Id: number) {
    const query = this.repo.createQueryBuilder('categoria');
    query.where(`categoria.noteId = :noteId`, { noteId: Id });

    return await query.getMany();
  }

  async createCategory(CreateCategoryDTO: CreateCategoryDTO, id: number) {
    try {
      const category = new CategoryEntity();
      const { categoria } = CreateCategoryDTO;
      category.categoria = categoria;
      category.noteId = id;

      this.repo.create(category);
      return await this.repo.save(category);
    } catch (err) {
      console.log(err.stack);
    }
  }

  async updateCategory(id: number, categoria: string){
    try {
      await this.repo.update({ id }, { categoria});
      return this.repo.findOne({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException('update failed');
    }
  }

  async deleteCategory(Id: number) {
    const result = await this.repo.delete({ noteId: Id });

    if (result.affected === 0) {
      throw new NotFoundException('Category not deleted');
    } else {
      return { sucess: true };
    }
  }
}
