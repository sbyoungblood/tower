import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {

async getCommentsByEventId(eventId){

  AppState.comments = []
  const res = await api.get(`api/events/${eventId}/comments`)
  logger.log('GETTING EVENT COMMENTS', res.data)
  const comments = res.data.map(c => new Comment(c))
  AppState.comments = comments

}

async createComment(commentData){
  const res = await api.post('/api/comments', commentData)
  logger.log('CREATED COMMENT', res.data)
  AppState.comments.push(new Comment(res.data))
}

}

export const commentsService = new CommentsService()