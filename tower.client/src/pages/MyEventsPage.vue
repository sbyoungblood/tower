<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-11">
        <div v-for="t in myTickets">
          <TicketCard :ticket="t" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ticketsService } from "../services/TicketsService";
import Pop from "../utils/Pop";
import { onMounted, computed } from "vue";
import { AppState } from "../AppState";
import { watchEffect } from "vue";
import TicketCard from "../components/TicketCard.vue";

export default {
  setup() {

    async function getMyTickets() {
      try {
        const account = AppState.account
        if (account?.id) {
          await ticketsService.getMyTickets()

        }
      } catch (error) {
        Pop.error('GET MY TICKETS', error.message)
      }
    }
    watchEffect(() => {
      getMyTickets()
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  },
  components: { TicketCard }
}
</script>


<style lang="scss" scoped></style>