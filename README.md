# 安装nest

```bash
npm i -g @nestjs/cli
nest new project-name
```

# 安装数据库

```bash
pnpm i class-validator typeorm @nestjs/typeorm mysql2 -S
```

## 数据库实体

```ts
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('example')
export class Example {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    comment: '测试名',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: '描述信息',
    nullable: true,
  })
  desc: string;

  @Column({
    comment: '描述信息',
    nullable: true,
  })
  tel: string;
}
```

## 导出

example.module.ts

```ts
import { Module, ConsoleLogger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from './models/example.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  controllers: [],
  providers: [ConsoleLogger],
  exports: [],
})
export class ExampleModule {}
```

## 数据库配置

app.module.ts 文件

```ts
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '数据库密码',
  database: '数据库名字',
  entities: [join(__dirname, '/**/*.entity{.js,.ts}')],
  // entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 数据库操作

https://typeorm.bootcss.com/repository-api

example.service.ts

```ts
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
```

# 安装 Graphql

## 安装

```bash
pnpm i graphql @nestjs/graphql @nestjs/apollo apollo-server-express -S
```

## 注册module

app.module.ts

```ts
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo'; 
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

## 创建resolver，定义api

操作类型，@Query 查询 @Mutation 更新

输入和输出类型 @InputType @ObjectType

resolver文件

```ts
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
dto
```

dto文件夹

```ts
import { Field, ObjectType } from '@nestjs/graphql';
// ObjectType
@ObjectType()
export class UserType {
  @Field()
  id?: string;
  @Field({ description: '用户名字' })
  name?: string;
  @Field()
  desc?: string;
  @Field({ description: '账户信息' })
  account?: string;
  @Field({ description: '手机号' })
  tel: string;
} 

// InputType
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field()
  tel: string;
}

最后
```

 最后记得module文件里面注册下

providers: [ ExampleResolver],

## 调试

http://localhost:3000/graphql

```ts
query find($id:String!) {
  find(id:$id) {
    name
  }
} 
{
  "id": "39cab428-7d2b-46cf-9919-3a1f240ed51d"
} 


mutation create($params:ExampleInput!) {
  create(params:$params)
} 
{
  "params": {
    "name": "test",
    "desc": "ddddd",
    "tel": "tellll"
  }
}
```

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
