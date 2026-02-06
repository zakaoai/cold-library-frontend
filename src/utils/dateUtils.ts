import { format } from "date-fns/format"

export const formatJavaLocalDateTimeArray = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm:ss")
}

export const formatJaveLocalDateArray = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy")
}
