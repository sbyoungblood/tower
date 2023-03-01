import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const TicketSchema = new Schema({
  id: basicStringType,

  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

}, defaultSchemaOptions)

TicketSchema.virtual('profile', {
  ref: 'Account',
  localField: 'accountId',
  foreignField: '_id',
  justOne: true
})

TicketSchema.virtual('event', {
  ref: 'Event',
  localField: 'eventId',
  foreignField: '_id',
  justOne: true
})