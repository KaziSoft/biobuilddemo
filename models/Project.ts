import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    hoverTitle: string;
    hoverText: string;
    location: string;
    status: 'ongoing' | 'completed' | 'upcoming';
    description: string;
    size: string;
    units: number;
    floors: number;
    amenities: string[];
    image: string;
}

const ProjectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    hoverTitle: { type: String, required: true },
    hoverText: { type: String, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'upcoming'],
      required: true,
    },
    description: { type: String, required: true },
    size: { type: String, required: true },
    units: { type: Number, required: true },
    floors: { type: Number, required: true },
    amenities: { type: [String], required: true },
    image: { type: String, required: true },
}, { timestamps: true });

export const Project = models.Project || model<IProject>('Project', ProjectSchema);
