<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-3">
      <div class="col-md-11 event-details">
        <div class="row">
          <div class="col-md-5">
            <img :src="event?.coverImg" alt="" class="event-coverImg rounded elevation-5">
          </div>
          <div class="col-md-7 d-flex flex-column justify-content-between">
            <div class="row">
              <div class="col-md-6 d-flex flex-column justify-content-center">
                <div class="details p-2">
                  {{ event?.name }}
                </div>
                <div class="details p-2">
                  {{ event?.location }}
                </div>
                <div class="details p-2">
                  {{ event?.startDate }}
                </div>
              </div>
              <div class="col-md-6 d-flex justify-content-end">
                <div class="canceled p-2">
                  CANCELED
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex flex-column justify-content-center">
                <div class="description px-2 py-5">
                  {{ event?.description }}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 d-flex flex-column justify-content-center">
                <div class="capacity p-2">
                  {{ event?.capacity }} <span> tickets available</span>
                </div>
              </div>
              <div class="col-md-6 d-flex justify-content-end px-4 py-1">
                <button v-if="!foundTicket" @click="createTicket()" class="btn btn-dark">Attend</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-11">
        {{ tickets }}
      </div>
    </div>
  </div>
</template>


<script>
import { watchEffect, computed } from "vue";
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService";
import { AppState } from "../AppState"
import Pop from "../utils/Pop";
import { ticketsService } from "../services/TicketsService";
import { logger } from "../utils/Logger";

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

    async function getTicketHoldersByEventId() {
      try {
        const eventId = route.params.eventId
        await ticketsService.getTicketHoldersByEventId(eventId)
      } catch (error) {
        Pop.error("[GET TICKET HOLDERS BY EVENT ID]", error.message)
      }
    }

    watchEffect(() => {
      if (route.params.eventId) {
        getEventById()
        getTicketHoldersByEventId()
      }
    })

    return {
      event: computed(() => AppState.event),
      tickets: computed(() => AppState.tickets),
      foundTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),

      async createTicket() {
        try {
          logger.log(route.params.eventId)
          await ticketsService.createTicket({ eventId: route.params.eventId })
        } catch (error) {
          Pop.error("[CREATE TICKET]", error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.event-coverImg {
  height: 65vh;
  width: 65vh;
  object-fit: cover;
  object-position: center;
}

.details {
  font-size: 20pt;
  font-weight: 500;
}

.description {
  font-size: 14pt;
}

.capacity {
  font-size: 20pt;
}

.canceled {
  color: rgb(255, 50, 50);
  font-size: 20pt;
  font-weight: 500;
}
</style>