import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const CommentSchema = new Schema({
  body: { ...basicStringType, maxLength: 1000 },
  isAttending: { type: Boolean },

  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account'},
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' }

}, defaultSchemaOptions)

CommentSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})