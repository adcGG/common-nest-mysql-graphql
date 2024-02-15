import { Module, ConsoleLogger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from './models/example.entity';
import { ExampleService } from './example.service';
import { ExampleResolver } from './example.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  controllers: [],
  providers: [ConsoleLogger, ExampleService, ExampleResolver],
  exports: [ExampleService],
})
export class ExampleModule {}
