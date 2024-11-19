import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async resetProblemsAndCountTrueFlag(): Promise<{ countTrue: number }> {
    // Подсчитываем количество пользователей с флагом true
    const countTrue = await this.userRepository.count({
      where: { hasproblems: true },
    });

    // Сбрасываем флаг у всех пользователей
    await this.userRepository.update({ hasproblems: true }, { hasproblems: false });

    return { countTrue };
  }

  // Метод для получения названий колонок таблицы
  async getColumns(): Promise<string[]> {
    const tableName = 'tests'; // Имя таблицы
    const query = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = $1
      AND table_schema = 'public';
    `;

    // Выполнение SQL-запроса через TypeORM
    const result = await this.userRepository.query(query, [tableName]);

    // Возвращаем только названия колонок
    return result.map((row: { column_name: string }) => row.column_name);
  }
}




