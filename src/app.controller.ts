import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { WordleService } from './core/services/wordle/wordle.service';

@Controller()
export class AppController {
  constructor(private readonly wordleService: WordleService) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // async cronEvangileOfTheDay(): Promise<boolean> {
  //   try {
  //     await this.changeQuoteDayt();
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  @Get('changeManually')
  async changeQuoteDay(@Res() res: Response) {
    try {
      await this.wordleService.changeWordDay();
      res.status(200).json(true);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(false);
    }
  }

  @Get('word')
  async getQuoteOfTheDay(@Res() res: Response) {
    try {
      const quote = await this.wordleService.getWordOfTheDay();
      quote.solution = Buffer.from(quote.solution).toString('base64');
      quote.link = Buffer.from(quote.link).toString('base64');
      res.status(HttpStatus.OK).json(quote);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(false);
    }
  }
}
