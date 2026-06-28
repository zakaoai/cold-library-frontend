import { format } from "date-fns/format"

export const formatJavaLocalDateTimeArray = (date: string) => format(new Date(date), "dd/MM/yyyy HH:mm:ss")

export const formatJaveLocalDateArray = (date: string) => format(new Date(date), "dd/MM/yyyy")
