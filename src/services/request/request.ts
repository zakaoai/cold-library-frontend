const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
const getOptions = {
  headers,
  method: "GET"
};
const deleteOptions = {
  headers,
  method: "DELETE"
};
const postOptions = <TBody>(body: TBody) => ({
  headers,
  method: "POST",
  body: JSON.stringify(body)
});
const putOptions = <TBody>(body: TBody) => ({
  headers,
  method: "PUT",
  body: JSON.stringify(body)
});
const patchOption = <TBody>(body: TBody) => ({
  headers,
  method: "PATCH",
  body: JSON.stringify(body)
});

const onResponse = (data: Response) => {
  if (data.ok && [200, 204].includes(data.status)) return data.json();
  else throw data;
};

export const get = <TResponse>(url: string): Promise<TResponse> => fetch(url, getOptions).then<TResponse>(onResponse);
export const patch = <Tbody, TResponse>(url: string, body: Tbody): Promise<TResponse> =>
  fetch(url, patchOption(body)).then<TResponse>(onResponse);
export const post = <Tbody, TResponse>(url: string, body: Tbody): Promise<TResponse> =>
  fetch(url, postOptions(body)).then<TResponse>(onResponse);
export const put = <Tbody, TResponse>(url: string, body: Tbody) =>
  fetch(url, putOptions(body)).then<TResponse>(onResponse);
export const deleteRequest = (url: string) => fetch(url, deleteOptions).then(onResponse);
