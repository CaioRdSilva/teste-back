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
import { CategoriaService } from './categoria.service';
import { CreateCategoryDTO } from 'src/DTO/create-category.dto';
import { AuthGuard } from '@nestjs/passport';

//localhost:3000/categoria/
@Controller('categoria')
@UseGuards(AuthGuard())
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  //(Busca todas as categorias) localhost:3000/categoria/
  @Get()
  getAllCategorys() {
    return this.categoriaService.getAllCategorys();
  }
  //(Busca categoria especificada) localhost:3000/categoria/:id
  @Get(':id')
  getCategory(@Param('id') id: number) {
    return this.categoriaService.getCategory(id);
  }
  //(Cria categoria da nota especificada) localhost:3000/categoria/:id
  @Post(':id')
  newCategory(
    @Body(ValidationPipe) data: CreateCategoryDTO,
    @Param('id') id: number,
  ) {
    return this.categoriaService.createCategory(data, id);
  }
  //(Atualiza categoria especificada especificada) http:/localhost:3000/categoria/:id
  @Patch(':id')
  updateCategory(
    @Body('categoria',ValidationPipe) categoria: string,
    @Param('id') id: number,
  ) {
    return this.categoriaService.updateCategory(id, categoria);
  }

  //(Deleta categoria especificada) localhost:3000/categoria/:id
  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriaService.deleteCategory(id);
  }
}
