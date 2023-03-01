import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentsService {
  async deleteComment(commentId, requestorId) {
    const comment = await dbContext.Comments.findById(commentId)
    if(!comment){
      throw new BadRequest('Invalid comment id.')
    }
    if(comment.creatorId.toString() !== requestorId){
      throw new Forbidden('You may not delete comments made by other people.')
    }
    await comment.remove()
    return 'This comment has been deleted'
  }
  async getEventComments(eventId) {
     const comments = await dbContext.Comments.find({eventId})
     .populate('creator', 'name picture')
     return comments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

}

export const commentsService = new CommentsService