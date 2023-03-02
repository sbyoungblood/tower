import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { Event } from "../models/Event"

class EventsService {

  async getAllEvents(){
    const res = await api.get('api/events')
    logger.log('get the events', res.data)
    const events = res.data.map(e => new Event(e))
    AppState.events = events
  }

}

export const eventsService = new EventsService()