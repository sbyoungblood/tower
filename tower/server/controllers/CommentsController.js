import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
  constructor(){
    super('api/comments')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComment)
    .delete('/:commentId', this.deleteComment)
  }
  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId
      const requestorId = req.userInfo.id
      const deletedComment = await commentsService.deleteComment(commentId, requestorId)
      return res.send(deletedComment)
    } catch (error) {
      next(error)
    }
  }
  async createComment(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      const newComment = await commentsService.createComment(commentData)
      return res.send(newComment)
    } catch (error) {
      next(error)
    }
  }
}