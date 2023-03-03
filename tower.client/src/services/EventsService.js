import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { Event } from "../models/Event"
import Pop from "../utils/Pop"

class EventsService {

  async getAllEvents(){
    const res = await api.get('api/events')
    // logger.log('get the events', res.data)
    const events = res.data.map(e => new Event(e))
    AppState.events = events
  }

  async getEventById(eventId){
    AppState.event = null
    const res = await api.get('api/events/' + eventId)
    // logger.log(res.data)
    AppState.event = new Event(res.data)
  }

  async createEvent(eventData){
    try {
      const res = await api.post('api/events', eventData)
      AppState.events.push(res.data)
      return res.data
    } catch (error) {
      Pop.error("[CREATE EVENT]", error.message)
    }
  }

  async cancelEvent(eventId){
    try {
      const res = await api.delete('api/events/' + eventId)
      logger.log('Canceling event', res.data)
      AppState.event = new Event(res.data)
    } catch (error) {
      Pop.error("[CANCEL EVENT]", error.message)
    }
  }

}

export const eventsService = new EventsService()