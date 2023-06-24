import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import config from './config/config';

@Module({
  imports: [
    UsersModule,
    NotesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
