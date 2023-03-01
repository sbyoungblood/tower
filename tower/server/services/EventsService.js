import { dbContext } from '../db/DbContext'
class EventsService {
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    return event
  }

}

export const eventsService = new EventsService