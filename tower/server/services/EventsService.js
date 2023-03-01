import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class EventsService {
  async editCancelEvent(eventId, requestorId) {
    const event = await this.getEventById(eventId)
    if(event.creatorId.toString() !== requestorId){
      throw new Forbidden('You must be the creator of an event in order to cancel it.')
    }
    event.isCanceled = true
    await event.save()
    return event
  }
  async editEventById(eventId, eventData, requestorId) {
    const foundEvent = await this.getEventById(eventId)
    if(foundEvent.isCanceled == true){
      throw new BadRequest('Sorry, this event has been canceled.')
    }
    if(foundEvent.creatorId.toString() !== requestorId){
      throw new Forbidden('Only the creator of an event may edit the event.')
    }
    foundEvent.name = eventData.name || foundEvent.name
    foundEvent.description = eventData.description || foundEvent.description
    foundEvent.coverImg = eventData.coverImg || foundEvent.coverImg
    foundEvent.location = eventData.location || foundEvent.location
    foundEvent.capacity = eventData.capacity || foundEvent.capacity
    foundEvent.startDate = eventData.startDate || foundEvent.startDate
    // foundEvent.isCanceled = eventData.isCanceled || foundEvent.isCanceled
    foundEvent.type = eventData.type || foundEvent.type
    await foundEvent.save()
    return foundEvent
  }
  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId)
    .populate('creator', 'name picture')
    if(!event){
      throw new BadRequest('Invalid Event Id')
    }
    return event
  }
  async getAllEvents() {
    const events = await dbContext.Events.find()
    .populate('creator', 'name picture')
    return events
  }
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')
    return event
  }

}

export const eventsService = new EventsService