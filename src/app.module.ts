import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { Wordle, WordleSchema } from './core/schema/wordle';
import { WordleService } from './core/services/wordle/wordle.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    MongooseModule.forFeature([{ name: Wordle.name, schema: WordleSchema }]),
  ],
  controllers: [AppController],
  providers: [WordleService],
})
export class AppModule {}
