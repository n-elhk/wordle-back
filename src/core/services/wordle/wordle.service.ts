import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wordle, WordleDocument } from 'src/core/schema/wordle';

@Injectable()
export class WordleService {
  constructor(
    @InjectModel(Wordle.name) private wordleModel: Model<WordleDocument>,
  ) {}

  async getWordOfTheDay(): Promise<WordleDocument> {
    return this.wordleModel.findOne({ isDisplay: true }).exec();
  }

  async changeWordDay(): Promise<WordleDocument> {
    await this.wordleModel.updateOne(
      { isDisplay: true },
      { isDisplay: false, displayed: true },
    );

    const toDisplay: WordleDocument[] = await this.wordleModel
      .aggregate([
        { $match: { displayed: false, isDisplay: false } },
        { $sample: { size: 1 } },
      ])
      .exec();
    if (toDisplay.length === 0) {
      await this.resetWordOfTheDay(); // < Make sure this function throws if collection is empty (no quotes), otherwise this will be a stackoverflow (infinite loop)
      return this.changeWordDay();
    } else {
      const displayed_at = toDisplay[0].displayed_at;
      displayed_at.push(Date.now());
      await this.wordleModel.updateOne(
        { _id: toDisplay[0]._id },
        { displayed: true, isDisplay: true, displayed_at },
      );
      return toDisplay[0];
    }
  }

  async resetWordOfTheDay(): Promise<void> {
    const quotesUpdated = await this.wordleModel.updateMany(
      {},
      { displayed: false, isDisplay: false },
    );
    if (quotesUpdated.modifiedCount === 0) {
      throw new Error('No quotes found');
    }
  }
}
