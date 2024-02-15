import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExampleInput {
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field()
  tel: string;
}
