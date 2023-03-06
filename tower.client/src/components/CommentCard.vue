<template>
  <div>
    <img :src="comment.creator.picture" alt="">
  </div>
  <div>
    {{ comment?.body }}
  </div>
</template>


<script>
import { Comment } from "../models/Comment";

export default {
  props: {
    comment: { type: Comment, required: true }
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>