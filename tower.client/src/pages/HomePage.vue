<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 filter d-flex flex-column justify-content-center">
        <div class="d-flex justify-content-evenly align-items-center">
          <button @click="changeFilterType('')" class="btn btn-success">ALL</button>
          <button @click="changeFilterType('concert')" class="btn btn-success">CONCERT</button>
          <button @click="changeFilterType('convention')" class="btn btn-success">CONVENTION</button>
          <button @click="changeFilterType('sport')" class="btn btn-success">SPORT</button>
          <button @click="changeFilterType('digital')" class="btn btn-success">DIGITAL</button>
          <button @click="changeFilterType('other')" class="btn btn-success">OTHER</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-md-12">
        <div class="row">
          <div v-for="e in events" class="col-md-3 d-flex justify-content-center mb-3">
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
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState";
import EventCard from "../components/EventCard.vue";

export default {
  setup() {

    const filterType = ref('')

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
      events: computed(() => {
        if (!filterType.value) {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == filterType.value)
        }
      }),

      changeFilterType(type) {
        filterType.value = type
      }
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

.filter {
  background-color: gray;
  height: 10vh;
}
</style>
