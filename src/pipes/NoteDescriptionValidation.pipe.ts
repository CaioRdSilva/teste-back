import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
  } from '@nestjs/common';


export class NoteDescriptionValidationPipe {

    transform(value: any, metadata: ArgumentMetadata): any {
  
      if (!this.isStatusValid(value)) {
        throw new BadRequestException(`Description can't be empty`);
      }
      return value;
    }
  
    private isStatusValid(description : any) {

        const index = description.length; 
      if( index > 0)
      return  index !== -1;
    }
}