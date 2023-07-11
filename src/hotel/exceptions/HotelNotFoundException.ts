import { NotFoundException } from '@nestjs/common';

class HotelNotFoundException extends NotFoundException {
  constructor(HOTELId: string) {
    super(`Hotel with id ${HOTELId} not found`);
  }
}

export default HotelNotFoundException;