# Shopify Technical Challenge

- Table of Contents
  - [Heroku Deployment](#heroku-deployment)
  - [Objectives & Architecture](#objectives-and-architecture)
  - [Running Locally](#running-locally)
  - [Schema](#schema)

## Heroku Deployment

- Application is deployed on Heroku for ease of use
- [Application documentation](https://shopify-tech-chal-2022-nhzaci.herokuapp.com/docs) built with Swagger UI

## Objectives and Architecture

- Overall project architecture utilises a component style architecture, where each individual component consists of three parts:

  1. Controller - Controls routing endpoints and which service paths to route API call to

  2. Model - Consists of all the models required for an individual component

  3. Service - Consists of all the business logic and communication with the database

- CRUD operations

  - Create inventory items
    - POST to `/inventory/` with item in request body to create a new item
    - [create function](https://github.com/nhzaci/ShopifyTechnicalChallenge2021/blob/4417346533e9d91ea9a30e58547358363b861a6e/src/inventory/inventory.service.ts#L30)
  - Edit
    - PATCH to `/inventory/{itemId}` with item in request body to update item
    - [edit function](https://github.com/nhzaci/ShopifyTechnicalChallenge2021/blob/4417346533e9d91ea9a30e58547358363b861a6e/src/inventory/inventory.service.ts#L76)
  - Delete
    - DELETE to `/inventory/{itemId}` with a `deleteReason` that can be specified in the request body
    - [delete function](https://github.com/nhzaci/ShopifyTechnicalChallenge2021/blob/4417346533e9d91ea9a30e58547358363b861a6e/src/inventory/inventory.service.ts#L49)
  - View a list of them
    - GET to `/inventory/` to get all items
    - [getItems function](https://github.com/nhzaci/ShopifyTechnicalChallenge2021/blob/4417346533e9d91ea9a30e58547358363b861a6e/src/inventory/inventory.service.ts#L13)

- Extra feature chosen:
  - When deleting, allow deletion comments and undeletion
    - Undo
      - PATCH to `/inventory/undo-delete` to undo last delete event
      - [undo function](https://github.com/nhzaci/ShopifyTechnicalChallenge2021/blob/4417346533e9d91ea9a30e58547358363b861a6e/src/inventory/inventory.service.ts#L108)
    - Getting history
      - GET to `/inventory/deleted` to get deletion history
      - [getDeleteEvents function](https://github.com/nhzaci/ShopifyTechnicalChallenge2022/blob/816fec936ac5d346ce6860137ace04ec236eb123/src/inventory/inventory.service.ts#L91)

### Event-driven Architecture of deletion system

- Each delete is an event inserted into the `delete-events` collection
  - Deletion occurs by setting a `deleted` boolean in an Item to `true`
    - `GET /inventory/` endpoint queries the database only for documents with `deleted` set to `false`
    - By setting `deleted` to `true`, these documents will not be retrieved
  - Documents can be cleaned up on a monthly schedule, i.e. daily cron job to clean up documents which have deleted flag set to `true` for over a month
- Undo is simply getting the most recent delete event, deleting the event from the `delete-events` collection and setting `deleted` boolean of corresponding item with id specified to be `false`

## Running Locally

- Setting up locally consists of two steps,
  - A. Setting up Database
  - B. Setting up Express Application

### A. Setting up Database

- Please follow instructions on [MongoDB Install](https://docs.mongodb.com/manual/administration/install-community/) to install MongoDB on your local environment, MongoDB is required to run the application

### B. Setting up Express application

1. Install `nvm` node version manager to install node js and npm, [instructions here](https://github.com/nvm-sh/nvm#installing-and-updating)

2. Install node v15.11.0 with nvm

```bash
nvm install 15.11.0
```

3. Use node v15.11.0 in nvm

```bash
nvm use 15.11.0
```

4. Install yarn globally with npm

```bash
sudo npm i -g yarn
```

5. Install dependencies with yarn

```sh
yarn
```

6. Starting dev server

```sh
yarn dev
```

7. App docs endpoint `http://localhost:3000/docs/` for Swagger UI playground and API documentation

## Schema

- Item Schema

```
interface Item {
  name: String,
  description: String,
  quanity: Number,
  deleted: Boolean // if deleted is true, item will not show up in get all items endpoint
}
```

- Delete Event Schema

```
interface DeleteEvent {
  itemId: String, // _id of Item that has been deleted
  reason: String  // Reason specified for Item deletion
}
```
