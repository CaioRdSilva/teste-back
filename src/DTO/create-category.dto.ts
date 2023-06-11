import { IsNotEmpty } from "class-validator";

export class CreateCategoryDTO{
    @IsNotEmpty()
    categoria: string;
}