import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {

async getCommentsByEventId(eventId){

  AppState.comments = []
  const res = await api.get(`api/events/${eventId}/comments`)
  logger.log('GETTING EVENT COMMENTS', res.data)

}

}

export const commentsService = new CommentsService()