<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-3">
      <div class="col-md-11 hero mb-2 rounded">
        Hero
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div class="row">
          <div v-for="e in events" class="col-md-3 d-flex justify-content-center mb-2">
            <EventCard :event="e" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService"
import { onMounted, computed } from "vue";
import { AppState } from "../AppState";
import EventCard from "../components/EventCard.vue";

export default {
  setup() {
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        Pop.error(error, "[GETTING ALL EVENTS]");
      }
    }
    onMounted(() => {
      getAllEvents();
    });
    return {
      events: computed(() => AppState.events)
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.hero {
  background-image: url(https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2874&q=80);
  background-size: cover;
  background-position: 0 10%;
  height: 25vh;
  font-size: 35pt;
  color: black;
  font-weight: 600;
  text-shadow: 0 0 3px white;
}
</style>
