import { dbContext } from "../db/DbContext"
import { eventsService } from '../services/EventsService'
import { BadRequest, Forbidden } from "../utils/Errors"
class TicketsService {
  async deleteTicket(ticketId, requestorId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if(!ticket){
      throw new BadRequest('Invalid ticket id.')
    }
    if(ticket.accountId.toString() !== requestorId){
      throw new Forbidden('You may only delete your own tickets.')
    }
    const event = await eventsService.getEventById(ticket.eventId)
    event.capacity ++
    await event.save()
    await ticket.remove()
    return 'This ticket has been deleted'
  }
  async getEventTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({eventId})
    .populate('profile', 'name picture')
    return tickets
  }
  
  async createTicket(ticketData) {
    const event = await eventsService.getEventById(ticketData.eventId)
    if(event.isCanceled){
      throw new Forbidden('Sorry, this event has been canceled.')
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event', 'name coverImg location startDate')
    await event.capacity --
    await event.save()
    return ticket
  }

}

export const ticketsService = new TicketsService