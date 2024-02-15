import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ExampleService } from './modules/example/example.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly exampleService: ExampleService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/createExample')
  createExample(): Promise<boolean> {
    return this.exampleService.create({
      tel: 'example_tel',
      name: 'example',
      desc: 'example_desc',
    });
  }
}
