import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";

export class TicketsController extends BaseController {
  constructor(){
    super('api/tickets')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTicket)
    .delete('/:ticketId', this.deleteTicket)
  }
  async deleteTicket(req, res, next) {
    try {
      const ticketId = req.params.ticketId
      const requestorId = req.userInfo.id
      const deletedTicket = await ticketsService.deleteTicket(ticketId, requestorId)
      return res.send(deletedTicket)
    } catch (error) {
      next(error)
    }
  }
  
  async createTicket(req, res, next) {
    try {
      const ticketData = req.body
      ticketData.accountId = req.userInfo.id
      const newTicket = await ticketsService.createTicket(ticketData)
      return res.send(newTicket)
    } catch (error) {
      next(error)
    }
  }
}