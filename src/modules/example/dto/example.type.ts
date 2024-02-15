import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExampleType {
  @Field()
  id?: string;
  @Field({ description: '用户名字' })
  name?: string;
  @Field()
  desc?: string;
  @Field({ description: '手机号' })
  tel: string;
}
