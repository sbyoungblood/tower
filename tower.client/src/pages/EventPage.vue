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
                <div v-if="event?.isCanceled" class="canceled p-2">
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
                <button v-if="event?.creatorId == account?.id && !event?.isCanceled" class="btn btn-danger me-2"
                  @click="cancelEvent(event.id)">Cancel
                  Event</button>
                <button v-if="!foundTicket && !event?.isCanceled" @click="createTicket(event.id)"
                  class="btn btn-dark">Attend</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div v-for="t in tickets" class="col-md-11">
        <img class="image-fluid rounded-circle" :src="t.profile.picture" alt="">
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col-md-6">
        <textarea class="form-control" name="" id="" cols="60" rows="8"></textarea>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col-md-6">
        comments
      </div>
    </div>
  </div>
</template>


<script>
import { watchEffect, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService";
import { AppState } from "../AppState"
import Pop from "../utils/Pop";
import { ticketsService } from "../services/TicketsService";
import { logger } from "../utils/Logger";
import { commentsService } from "../services/CommentsService";

export default {
  setup() {

    const route = useRoute()
    const editable = ref({})

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error("[GET EVENT BY ID]", error.message)
      }
    }

    async function getCommentsByEventId() {
      try {
        const eventId = route.params.eventId
        await commentsService.getCommentsByEventId(eventId)
      } catch (error) {
        Pop.error("[GET COMMENTS BY EVENT ID]", error.message)
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
        getCommentsByEventId()
      }
    })

    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.event),
      tickets: computed(() => AppState.tickets),
      foundTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      myEvent: computed(() => AppState.events.find(e => e.creatorId == AppState.account.id)),

      async createTicket(eventId) {
        try {
          logger.log(route.params.eventId)
          await ticketsService.createTicket({ eventId: route.params.eventId })
        } catch (error) {
          Pop.error("[CREATE TICKET]", error.message)
        }
      },

      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you wish to cancel this event?')) {
            logger.log(eventId)
            await eventsService.cancelEvent(eventId)
          }
        } catch (error) {
          Pop.error("[CANCEL EVENT]", error.message)
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
  color: #ff3232;
  font-size: 20pt;
  font-weight: 500;
}
</style>