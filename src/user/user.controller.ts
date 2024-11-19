import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('columns-from-db')
  @ApiOperation({ summary: 'Получить колонки таблицы tests из базы данных' })
  async getColumnsFromDb() {
    return await this.userService.getColumns();
  }
  @Get('reset-problems')
  @ApiOperation({
    summary: 'Сбросить флаг проблемы у всех пользователей и посчитать количество пользователей с флагом true',
  })
  async resetProblems() {
    const result = await this.userService.resetProblemsAndCountTrueFlag();
    return result;
  }
}




