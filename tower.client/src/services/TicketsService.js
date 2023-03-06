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

async createTicket(eventId){
  const res = await api.post('api/tickets', eventId)
  logger.log("[CREATING TICKET]", res.data)
  // AppState.tickets.push(new Ticket(res.data))
  // AppState.myEvents.push(new Event(res.dat))
}

async getMyTickets(){
  const res = await api.get('account/tickets')
  logger.log('MY TICKETS', res.data)
  const myTickets = res.data.map(t => new Ticket(t))
  AppState.myTickets = myTickets
}

async deleteTicketById(ticketId){
  const res = await api.delete(`'api/tickets/${ticketId}`)
  logger.log('deleted ticket', res.data)
  
  // const ticketIndex = appstate.mytickets.findIndex(t => t.ticketId == ticketId)
  // if(ticketIndex !== -1){
  //appstate.mytickets.splice(ticketIndex, 1)
  // }
}

}

export const ticketsService = new TicketsService