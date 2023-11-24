import ResponseError from "@/interfaces/services/ResponseError"

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}
const getOptions = {
  headers,
  method: "GET"
}
const deleteOptions = {
  headers,
  method: "DELETE"
}
const postOptions = <TBody>(body: TBody) => ({
  headers,
  method: "POST",
  body: JSON.stringify(body)
})
const putOptions = <TBody>(body: TBody) => ({
  headers,
  method: "PUT",
  body: JSON.stringify(body)
})
const patchOption = <TBody>(body: TBody) => ({
  headers,
  method: "PATCH",
  body: JSON.stringify(body)
})

const onResponse = async (response: Response) => {
  if (response.ok && [200, 204].includes(response.status)) {
    if (response.status === 204 || response.headers.get("Content-Length") == "0") {
      return Promise.resolve(null)
    }

    return await response.json()
  } else throw new ResponseError("Bad fetch response", response)
}

export const get = async <TResponse>(url: string): Promise<TResponse> =>
  await fetch(url, getOptions).then<TResponse>(onResponse)
export const patch = async <Tbody, TResponse>(url: string, body: Tbody): Promise<TResponse> =>
  await fetch(url, patchOption(body)).then<TResponse>(onResponse)
export const post = async <Tbody, TResponse>(url: string, body: Tbody): Promise<TResponse> =>
  await fetch(url, postOptions(body)).then<TResponse>(onResponse)
export const put = async <Tbody, TResponse>(url: string, body: Tbody) =>
  await fetch(url, putOptions(body)).then<TResponse>(onResponse)
export const deleteRequest = async (url: string) => await fetch(url, deleteOptions).then(onResponse)
