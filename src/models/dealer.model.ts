import mongoose, { Document, Schema } from 'mongoose';
import { generateId } from '../utils/generate-id';

export interface CarDealer extends Document {
  name: string;
  email: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const carDealerSchema = new Schema<CarDealer>(
  {
    _id: {
      type: String,
      default: () => `dealer_${generateId()}`,
    },
    name: {
      type: String,
      required: [true, 'Dealer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
  },
  {
    timestamps: true,
    _id: false,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => ({
        id: ret._id,
        name: ret.name,
        email: ret.email,
        city: ret.city,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt,
      }),
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => ({
        id: ret._id,
        name: ret.name,
        email: ret.email,
        city: ret.city,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt,
      }),
    },
  }
);

export default mongoose.model<CarDealer>('CarDealer', carDealerSchema);
