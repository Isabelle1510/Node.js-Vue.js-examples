## 1. Node.js REST API Example

I have implemented a REST API using Express.js that handles Export and Import requests. 

The API exposes endpoints to:
- `POST` a request for a **new Export job**. Valid requests are saved in memory. Invalid requests return an error. The request has the following schema:

  ```javascript
  {
    bookId: string,
    type: "epub" | "pdf"
  }
  ```

- `GET` a list of **Export requests**, grouped by their current `state` (see below).
- `POST` a request for a new **Import job**. Valid requests are saved in memory. Invalid requests return an error. The request has the following schema:

  ```javascript
  {
    bookId: string,
    type: "word" | "pdf" | "wattpad" | "evernote",
    url: string
  }
  ```

- `GET` a list of **Import requests**, grouped by their current `state` (see below).

Both export and import requests are created with a `pending` state, and with a `created_at` timestamp. An import or export take the amount of time outlined below. After the specified time, the state is updated from `pending` to `finished` and updated to have an `updated_at` timestamp.

| Job type     | Processing time (s) |
| ------------ | ------------------- |
| ePub export  | 10                  |
| PDF export   | 25                  |
| import (any) | 60                  |

You can run the server with the following command:

- `cd nodejs-rest-api && npm install && npm run start`


## 2. AngularJS

I have created a basic book overview in Vue.js which can be started with the following command:

- `cd vue-spa && npm install && npm run start`
