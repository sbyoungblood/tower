<template>
  <router-link class="" :to="{ name: 'Event', params: { eventId: event.id } }">
    <div class="event-card rounded elevation-5 d-flex flex-column justify-content-end mb-3"
      v-bind:style="{ backgroundImage: `url(${event.coverImg})` }">
      <div v-if="event?.isCanceled" class="canceled text-center mb-auto">
        CANCELED
      </div>
      <div class="event-card-details p-2">
        <div>{{ event.name }}</div>
        <div>{{ event.location }}</div>
        <div>{{ event.startDate }}</div>
      </div>
    </div>
  </router-link>
</template>


<script>

import { Event } from "../models/Event.js"

export default {
  props: {
    event: { type: Event, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.event-card {
  height: 38vh;
  width: 38vh;
  background-position: center;
  background-size: cover;
}

.event-card-details {
  background-color: rgba(255, 255, 255, 0.323);
  backdrop-filter: blur(3px);
  color: black;
  border-radius: 2px;
  border: 1px solid #ffffff;
  font-size: 14pt;
  font-weight: 700;
  // text-shadow: 0 0 .05rem rgb(40, 187, 255);
}

.canceled {
  font-size: 30pt;
  color: #ff3232;
  text-shadow: 0 0 3px black;
  font-weight: 500;
}
</style>