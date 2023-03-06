<template>
  <div class="row">
    <div class="col-md-11">
      <div class="row mt-5">
        <div class="col-md-4">
          <img :src="ticket?.event?.coverImg" alt="" class="ticketImg">
        </div>
        <div class="col-md-4">
          <div>
            {{ ticket?.event?.name }}
          </div>
          <div>
            {{ ticket?.event?.location }}
          </div>
          <div>
            {{ ticket?.event?.startDate }}
          </div>
        </div>
        <div class="col-md-4">
          <button @click="deleteTicketById(ticket?.id)" class="btn btn-danger">Return Ticket</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { Ticket } from "../models/Ticket";
import { ticketsService } from "../services/TicketsService";
import Pop from "../utils/Pop";
import { computed } from "vue";
import { logger } from "../utils/Logger";

export default {
  props: {
    ticket: { type: Ticket, required: true }
  },
  setup() {
    return {
      tickets: computed(() => AppState.myTickets),

      async deleteTicketById(ticketId) {
        try {
          await ticketsService.deleteTicketById(ticketId)
          logger.log('ticket id', ticketId)
        } catch (error) {
          Pop.error('Delete Ticket', error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.ticketImg {
  height: 30vh;
  width: 30vh;
  object-fit: cover;
}
</style>