import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IPrimeLocation extends Document {
    name: string;
    description: string;
    image: string;
}

const PrimeLocationSchema = new Schema<IPrimeLocation>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

export const PrimeLocation = models.PrimeLocation || model<IPrimeLocation>('PrimeLocation', PrimeLocationSchema);
