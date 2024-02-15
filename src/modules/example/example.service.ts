import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from './models/example.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example) private ExampleRepository: Repository<Example>,
  ) {}
  // 新增用户
  async create(entity: DeepPartial<Example>): Promise<boolean> {
    const res = await this.ExampleRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
    return false;
  }
  // 删除用户
  async del(id: string): Promise<boolean> {
    const res = await this.ExampleRepository.delete(id);
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }
  // 更新一个用户
  async update(id: string, entity: DeepPartial<Example>): Promise<boolean> {
    const res = await this.ExampleRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
  // 查询一个用户
  async find(id: string): Promise<Example> {
    const res = await this.ExampleRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }
}
