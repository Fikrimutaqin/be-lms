import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Testimony } from '../../modules/testimonies/entities/testimony.entity';

export default class TestimonySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(Testimony);

    // Cek apakah data sudah ada
    const count = await repository.count();
    if (count > 0) {
      return;
    }

    await repository.insert([
      {
        name: 'Andi Saputra',
        avatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Kursus ini sangat membantu saya memahami NestJS dari dasar!',
        rating: 5,
        status: 'approved',
      },
      {
        name: 'Siti Sarah',
        avatar: 'https://i.pravatar.cc/150?img=5',
        content: 'Materinya padat dan jelas. Instrukturnya juga responsif.',
        rating: 4,
        status: 'approved',
      },
      {
        name: 'Budi Raharjo',
        avatar: 'https://i.pravatar.cc/150?img=8',
        content: 'Sangat direkomendasikan untuk pemula yang ingin belajar backend.',
        rating: 5,
        status: 'approved',
      },
    ]);
  }
}
