import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService"
class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

}

export const commentsService = new CommentsService