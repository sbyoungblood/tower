<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <form @submit.prevent="handleSubmit()">
          <div class="row">
            <div class="col-md-5">
              <div class="mb-3">
                <label for="eventName" class="form-label">Event Name</label>
                <input required type="text" v-model="editable.name" class="form-control" id="eventName"
                  placeholder="Comic-Con" name="eventName">
              </div>
            </div>
            <div class="col-md-7">
              <div class="mb-3">
                <label for="eventLocation" class="form-label">Location</label>
                <input required type="text" v-model="editable.location" class="form-control" id="eventLocation"
                  placeholder="1234 N Park St." name="eventLocation">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="startDate" class="form-label date">Date and Time</label>
                <input required type="datetime-local" v-model="editable.startDate" class="form-control" id="startDate"
                  placeholder="March 25, 2023 at 9:00 AM" name="startDate">
              </div>
            </div>
            <div class="col-md-3">
              <div class="mb-3">
                <label for="capacity" class="form-label">Capacity</label>
                <input required type="text" v-model="editable.capacity" class="form-control" id="capacity"
                  placeholder="150" name="capacity">
              </div>
            </div>
            <div class="col-md-3">
              <div class="mb-3">
                <label for="type" class="form-label">Event Type</label>
                <select class="form-select" id="type" name="type" v-model="editable.type">
                  <option value="misc">Miscellaneous</option>
                  <option value="concert">Concert</option>
                  <option value="convention">Convention</option>
                  <option value="sport">Sport</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="mb-3">
                <label for="description" class="form-label">Event Description</label>
                <textarea name="description" id="description" rows="8" class="form-control"
                  placeholder="Whats gonna happen?" v-model="editable.description"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="mb-5">
                <label for="eventImg" class="form-label">Event Image Link</label>
                <input required type="url" v-model="editable.coverImg" class="form-control" id="eventImg"
                  placeholder="www.picture.com" name="eventImg">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 d-flex justify-content-center">
              <button class="btn btn-success">Clear Form</button>
            </div>
            <div class="col-md-6 d-flex justify-content-center">
              <button class="btn btn-primary" type="submit">Create Event</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script>
import { ref } from "vue";
import { eventsService } from "../services/EventsService";

export default {
  setup() {

    const editable = ref({})

    return {
      editable,
      // types: ['concert', 'convention', 'sport', 'digital', 'other']
      async handleSubmit() {
        const event = editable.value
        // NOTE must grab an id from here 
        await eventsService.createEvent(editable.value)
        editable.value = {}
        if (event?.id) {
          router.push({ name: 'Event', params: { eventId: event.id } })
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.date {
  border: none;
}

.container-fluid {
  height: 80vh;
}
</style>