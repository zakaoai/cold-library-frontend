import { format } from "date-fns/format"

export const formatJavaLocalDateTimeArray = (date: [number, number, number, number, number, number, number]) => {
  const copiedDate = [...date] as [number, number, number, number, number, number, number]
  copiedDate[6] = 0
  copiedDate[1]--
  return Array.isArray(copiedDate) && format(new Date(Date.UTC(...copiedDate)), "dd/MM/yyyy HH:mm:ss")
}

export const formatJaveLocalDateArray = (date: [number, number, number, number, number]) => {
  const copiedDate = [...date] as [number, number, number, number, number]

  copiedDate[1]--
  return Array.isArray(copiedDate) && format(new Date(Date.UTC(...copiedDate)), "dd/MM/yyyy")
}
