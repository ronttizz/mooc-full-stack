# README

App is deployed in Render at https://phonebook-tyzs.onrender.com

# About

This is part of [University of Helsinki Full stack MOOC course](https://fullstackopen.com/en/).

# Stack

Front end is done with React + Vite and code can be found in [here (../../part2/phonebook)](https://github.com/ronttizz/mooc-full-stack/tree/main/part2/phonebook)
Backend using Nodejs and Express with Mongoose
Database used is MongoDB at [MongoDB Atlas](https://cloud.mongodb.com/)

# Prerequisites

This directory runs on its as the `dist` folder is served as front end. If you want to make changes to front end, copy [part2/phonebook](https://github.com/ronttizz/mooc-full-stack/tree/main/part2/phonebook) and edit scripts in [package.json](https://github.com/ronttizz/mooc-full-stack/blob/main/part3/phonebook-backend/package.json) referencing to front end directory (build:ui and deploy:full).

- MongoDB Atlas account / Any other but you need to figure to db connectivity
- Nodejs
- `.env` file with the secrets
  - `PORT=3001` // This is in secrets as Render might use different port and to my understanding this gets overridden if needed
  - `DB_URL=your-own-mongodb-atlas-cluster-connection`

Run `npm install && npm run dev`

Go to `http://localhost:3001`
