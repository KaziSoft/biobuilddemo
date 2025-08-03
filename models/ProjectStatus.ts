import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IProjectStatus extends Document {
  image: string;
  title: string;
  location: string;
  status: 'ongoing' | 'completed' | 'upcoming';
}

const ProjectStatusSchema = new Schema<IProjectStatus>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'upcoming'],
      required: true,
    },
  },
  { timestamps: true }
);

export default models.ProjectStatus || model<IProjectStatus>('ProjectStatus', ProjectStatusSchema);
