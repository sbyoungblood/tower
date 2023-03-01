import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const EventSchema = new Schema({
  id: basicStringType,
  name: basicStringType,
  description: basicStringType,
  coverImg: { ...basicStringType, maxLength: 5000 },
  location: basicStringType,
  capacity: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { ...basicStringType, enum: ['concert', 'convention', 'sport', 'digital'], default: 'other' },

  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  
}, defaultSchemaOptions)

EventSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})