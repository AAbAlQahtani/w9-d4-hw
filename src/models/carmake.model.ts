import mongoose, { Document, Schema } from 'mongoose';
import { generateId } from '../utils/generate-id';

export interface CarMake extends Document {
  country: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

const carMakeSchema = new Schema<CarMake>(
  {
    _id: {
      type: String,
      default: () => `make_${generateId()}`,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
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
        country: ret.country,
        brand: ret.brand,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt,
      }),
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => ({
        id: ret._id,
        country: ret.country,
        brand: ret.brand,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt,
      }),
    },
  }
);

export default mongoose.model<CarMake>('CarMake', carMakeSchema);
