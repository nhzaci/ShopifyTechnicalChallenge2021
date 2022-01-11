import mongoose from 'mongoose'
import { app } from './app'

const port = process.env.PORT || 3000
const mongodbConnectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/shopify-inventory'

mongoose
  .connect(mongodbConnectionString)
  .then(() =>
    app.listen(port, () => console.log(`App running on PORT ${port}`))
  )
  .catch((error) => console.log(error.message))
