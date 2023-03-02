<template>
  <div class="component">

    this is the event details page
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-4">
            <!-- <img :src="event.coverImg" alt=""> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";

export default {
  setup() {

    const route = useRoute()

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error("[GET EVENT BY ID]", error.message)
      }
    }

    watchEffect(() => {
      if (route.params.eventId) {
        getEventById()
      }
    })

    return {}
  }
}
</script>


<style lang="scss" scoped></style>