import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface INewsEvent extends Document {
  type: 'news' | 'event';
  title: string;
  date: string;
  summary: string;
  location?: string;
  image: string;
}

const NewsEventSchema = new Schema<INewsEvent>({
  type: { type: String, enum: ['news', 'event'], required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  summary: { type: String, required: true },
  location: { type: String },
  image: { type: String, required: true },
});

export default models.NewsEvent || model<INewsEvent>('NewsEvent', NewsEventSchema);
