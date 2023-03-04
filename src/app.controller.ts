import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { WordleService } from './core/services/wordle/wordle.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(private readonly wordleService: WordleService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async changeWordDay(): Promise<void> {
    try {
      await this.wordleService.changeWordDay();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('updateWord')
  async updateWord(@Res() res: Response) {
    try {
      await this.changeWordDay();
      res.status(200).json(true);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(false);
    }
  }

  @Get('word')
  async getQuoteOfTheDay(@Res() res: Response) {
    try {
      const word = await this.wordleService.getWordOfTheDay();
      word.solution = Buffer.from(word.solution).toString('base64');
      word.link = Buffer.from(word.link).toString('base64');
      res.status(HttpStatus.OK).json(word);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(false);
    }
  }
}
