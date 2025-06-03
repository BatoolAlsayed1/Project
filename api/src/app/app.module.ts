import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env',}), 
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
  ],
})
export class AppModule {}

