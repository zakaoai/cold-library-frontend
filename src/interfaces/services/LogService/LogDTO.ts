export default interface LogDTO {
  id: number
  action: string
  date: [number, number, number, number, number, number, number]
  userId: string
  name: string
  email: string
}
