<template>
  <form @submit.prevent="createComment(event?.id)">
    <textarea v-model="editable.body" class="form-control" name="" id="" cols="60" rows="8"></textarea>
    <div class="mt-2">
      Will you be attending this event?
    </div>
    <div class="d-flex justify-content-between">
      <div>
        <label for="isAttending" class="form-label px-2">Yes</label>
        <input v-model="editable.isAttending" type="radio" name="isAttending" id="isAttending">
        <label for="isNotAttending" class="form-label px-2">No</label>
        <input type="radio" name="isNotAttending" id="isNotAttending">
      </div>
      <div>
        <button type="submit" class="btn btn-primary">POST</button>
      </div>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger"

export default {
  setup() {

    const editable = ref({})
    const route = useRoute()

    return {
      editable,
      event: computed(() => AppState.event),

      async createComment() {
        try {
          // const eventId = route.params.eventId
          const commentData = editable.value
          commentData.eventId = route.params.eventId
          await commentsService.createComment(commentData)

        } catch (error) {
          Pop.error("[CREATING COMMENT]", error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>