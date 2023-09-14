import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { OptionService } from './options.service';
import { Option } from 'src/entities/quizQuestionOptions.schema';
import { createOptionDto } from './createOption-dto';

@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  async createOption(@Body() optionDto: createOptionDto): Promise<Option> {
    return this.optionService.createOption(optionDto);
  }

  @Get()
  async getOptions(): Promise<Option[]> {
    return this.optionService.getOptions();
  }

  @Get(':id')
  async getOptionById(@Param('id') id: string): Promise<Option | null> {
    return this.optionService.getOptionById(id);
  }

  @Put(':id')
  async updateOption(
    @Param('id') id: string,
    @Body() updateDto: createOptionDto,
  ): Promise<Option | null> {
    return this.optionService.updateOption(id, updateDto);
  }

  @Delete(':id')
  async deleteOption(@Param('id') id: string): Promise<Option | null> {
    return this.optionService.deleteOption(id);
  }
}