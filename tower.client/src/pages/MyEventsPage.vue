<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-3">
      <div class="col-md-12">
        <div class="row">
          <!-- <div v-for="t in myTickets" class="col-md-3 d-flex justify-content-center mb-3">
            <EventCard :event="t" /> -->
          <!-- </div> -->
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
  }
}
</script>


<style lang="scss" scoped></style>