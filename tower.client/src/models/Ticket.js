import { Profile } from "./Account"

export class Ticket {
  constructor(data){
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.event = data.event
    this.profile = new Profile(data.profile)
  }
}