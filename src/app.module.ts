import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ExampleModule } from './modules/example/example.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3305,
      username: '用户名，通常是root',
      password: '你的密码',
      database: '你创建的数据库名',
      entities: [join(__dirname, '/**/*.entity{.js,.ts}')],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
