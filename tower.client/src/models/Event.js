export class Event {
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate).toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}