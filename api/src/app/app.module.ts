import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Batool:FM5EFoIEz42QsUCT@cluster0.hlrlk8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
  ],
})
export class AppModule {}

