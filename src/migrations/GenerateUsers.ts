import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndGenerateData1625628308875
  implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Creating table "tests"...');
        await queryRunner.query(`
          CREATE TABLE tests (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            age INT NOT NULL,
            gender VARCHAR(50),
            hasproblems BOOLEAN
          );
        `);
        console.log('Table "tests" created.');
      
        const users: Array<[string, string, number, string, boolean]> = [];
        const totalUsers = 1_000_000;
      
        console.log('Starting user generation...');
        for (let i = 0; i < totalUsers; i++) {
          const firstName = `User${i}`;
          const lastName = `Last${i}`;
          const age = Math.floor(Math.random() * 83) + 18;
          const gender = i % 2 === 0 ? 'male' : 'female';
          const hasProblems = Math.random() < 0.5;
      
          users.push([firstName, lastName, age, gender, hasProblems]);
      
          if (users.length === 1000) {
            await this.insertUsers(queryRunner, users);
            console.log(`Inserted ${i + 1} users`);
            users.length = 0;
          }
        }
      
        if (users.length > 0) {
          await this.insertUsers(queryRunner, users);
          console.log(`Inserted final batch of ${users.length} users`);
        }
      
        console.log('User generation completed.');
      }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Dropping table "tests"...');
    await queryRunner.query('DROP TABLE tests');
    console.log('Table "tests" dropped.');
  }

  private async insertUsers(
    queryRunner: QueryRunner,
    users: Array<[string, string, number, string, boolean]>
  ): Promise<void> {
    
    // Ограничение количества генерации данных
    const maxParameters = 32767;
    const maxBatchSize = Math.floor(maxParameters / 5);
  
    for (let i = 0; i < users.length; i += maxBatchSize) {
      const batch = users.slice(i, i + maxBatchSize);
      const values = batch.map(
        (_, index) => `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${index * 5 + 4}, $${index * 5 + 5})`
      ).join(',');
  
      const flatValues = batch.flat();
      await queryRunner.query(
        `INSERT INTO tests (firstName, lastName, age, gender, hasProblems) VALUES ${values}`,
        flatValues
      );
    }
  }
}
