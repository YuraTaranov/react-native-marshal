// const baseURL = 'http://127.0.0.1:7070/post-log';
const baseURL = 'http://10.10.10.51:7070/post-log';
const post = (data: any) =>
  fetch(baseURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const weblog = post;
