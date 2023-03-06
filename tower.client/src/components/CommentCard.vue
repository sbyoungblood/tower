<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <div>
          <img :src="comment.creator.picture" alt="" class="commentImg">
        </div>
        <div>{{ comment?.creator?.name }}</div>
      </div>
      <div class="col-md-8">
        <div>
          {{ comment?.body }}
        </div>
      </div>
      <div class="col-md-2">
        <button @click="deleteCommentById(comment.id)" v-if="comment?.creatorId == account?.id"
          class="btn btn-outline-danger">Delete</button>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { Comment } from "../models/Comment";
import { computed } from "vue";
import Pop from "../utils/Pop";
import { commentsService } from "../services/CommentsService";
import { logger } from "../utils/Logger";

export default {
  props: {
    comment: { type: Comment, required: true }
  },

  setup() {
    return {
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),

      async deleteCommentById(commentId) {
        try {
          await commentsService.deleteCommentById(commentId)
          logger.log('delete this comment', commentId)
        } catch (error) {
          Pop.error('DELETE COMMENT', error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>