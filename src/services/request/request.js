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
const postOptions = {
  headers,
  method: "POST"
};
const putOptions = body => ({
  headers,
  method: "PUT",
  body
});

const onResponse = data => {
  if (data.ok && data.status === 200) return data.json();
  else throw data;
};

export const get = url => fetch(url, getOptions).then(onResponse);
export const post = (url, body) => fetch(url, postOptions(body)).then(onResponse);
export const put = (url, body) => fetch(url, putOptions(body)).then(onResponse);
export const deleteRequest = url => fetch(url, deleteOptions).then(onResponse);
