export class Ticket {
  constructor(data){
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.profile = data.profile
    this.event = data.event
  }
}