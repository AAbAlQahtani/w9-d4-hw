import mongoose, { Document, Schema } from 'mongoose';
import { generateId } from '../utils/generate-id';

export interface Car extends Document {
  dealerId: string;
  carMakeId: string;
  name: string;
  price: number;
  year: number;
  color: string;
  wheelsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const carSchema = new Schema<Car>(
  {
    _id: {
      type: String,
      default: () => `car_${generateId()}`,
    },
    dealerId: {
      type: String,
      ref: 'CarDealer',
      required: [true, 'Dealer ID is required'],
    },
    carMakeId: {
      type: String,
      ref: 'CarMake',
      required: [true, 'Car Make ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Car name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
    },
    wheelsCount: {
      type: Number,
      required: [true, 'Wheels count is required'],
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
        dealerId: ret.dealerId,
        carMakeId: ret.carMakeId,
        name: ret.name,
        price: ret.price,
        year: ret.year,
        color: ret.color,
        wheelsCount: ret.wheelsCount,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt,
      }),
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => ({
        id: ret._id,
        dealerId: ret.dealerId,
        carMakeId: ret.carMakeId,
        name: ret.name,
        price: ret.price,
        year: ret.year,
        color: ret.color,
        wheelsCount: ret.wheelsCount,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt,
      }),
    },
  }
);

export default mongoose.model<Car>('Car', carSchema);
