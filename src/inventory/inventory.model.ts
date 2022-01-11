import { Document, Model, model, Schema } from 'mongoose'

interface ItemBody {
  name: string
  description: string
  quantity: number
}

interface Item extends Document, ItemBody {}

const itemSchema = new Schema<Item>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Inventory: Model<Item> = model('Item', itemSchema)

interface GetItemsResponse {
  success: boolean
  items?: ItemBody[]
  message?: string
}

interface InventoryResponse {
  success: boolean
  item?: ItemBody
  message?: string
}

export { Item, Inventory, InventoryResponse, GetItemsResponse, ItemBody }
