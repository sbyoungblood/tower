import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"

class TicketsService {

async getTicketHoldersByEventId(eventId){
  const res = await api.get(`api/events/${eventId}/tickets`)
  logger.log("[TICKET HOLDERS BY EVENT ID]", res.data)
  AppState.tickets = res.data.map(t => new Ticket(t))
}

async createTicket({ eventId }){
  const res = await api.post('api/tickets', eventId)
  logger.log("[CREATING TICKET]", res.data)
  // AppState.tickets.push(new Ticket(res.data))
  // AppState.myEvents.push(new Event(res.dat))
}

}

export const ticketsService = new TicketsService