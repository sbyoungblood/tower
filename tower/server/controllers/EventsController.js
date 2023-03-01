import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService"
import { commentsService } from "../services/CommentsService"

export class EventsController extends BaseController {
  constructor(){
    super('api/events')
    this.router
    .get('', this.getAllEvents)
    .get('/:eventId/tickets', this.getEventTicketsByEventId)
    .get('/:eventId', this.getEventById)
    .get('/:eventId/comments', this.getEventComments)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createEvent)
    .put('/:eventId', this.editEventById)
    .delete('/:eventId', this.editCancelEvent)
  }
  async getEventComments(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await commentsService.getEventComments(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  
  async getEventTicketsByEventId(req, res, next){
    try {
      const eventId = req.params.eventId
      const tickets = await ticketsService.getEventTicketsByEventId(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async editCancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const requestorId = req.userInfo.id
      const event = await eventsService.editCancelEvent(eventId, requestorId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const eventData = req.body
      const requestorId = req.userInfo.id
      const updatedEvent = await eventsService.editEventById(eventId, eventData, requestorId)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await eventsService.getEventById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const newEvent = await eventsService.createEvent(eventData)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }
}