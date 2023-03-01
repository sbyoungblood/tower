import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
  constructor(){
    super('api/comments')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComment)
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