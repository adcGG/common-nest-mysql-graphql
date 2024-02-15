import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExampleService } from './example.service';
import { ExampleInput } from './dto/example-input.type';
import { ExampleType } from './dto/example.type';

@Resolver()
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}
  @Mutation(() => Boolean)
  async create(@Args('params') params: ExampleInput): Promise<boolean> {
    return await this.exampleService.create(params);
  }

  @Query(() => ExampleType, { description: '使用id查询用户' })
  async find(@Args('id') id: string): Promise<ExampleType> {
    return await this.exampleService.find(id);
  }

  @Query(() => ExampleType, { description: '获取用户信息' })
  async getExampleInfo(@Context() cxt: any): Promise<ExampleType> {
    const id = cxt.req.Example.id;
    return await this.exampleService.find(id);
  }

  @Mutation(() => Boolean, { description: '使用id更新用户' })
  async update(
    @Args('id') id: string,
    @Args('params') params: ExampleInput,
  ): Promise<boolean> {
    return await this.exampleService.update(id, params);
  }
  @Mutation(() => Boolean, { description: '使用id删除用户' })
  async del(@Args('id') id: string): Promise<boolean> {
    return await this.exampleService.del(id);
  }
}
