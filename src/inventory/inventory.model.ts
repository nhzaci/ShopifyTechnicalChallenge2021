import { Document, Model, model, Schema, ObjectId } from 'mongoose'

export interface Item {
  name: string
  description: string
  quantity: number
  deleted?: boolean
}

export interface IItem extends Document, Item {}

const itemSchema = new Schema<IItem>(
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
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const Inventory: Model<IItem> = model('inventory', itemSchema)

export interface DeleteEvent {
  itemId: string
  reason?: string
}

export interface IDeleteEvent extends Document, DeleteEvent {}

const deleteEventSchema = new Schema<IDeleteEvent>(
  {
    itemId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
)

export const DeleteEvents: Model<IDeleteEvent> = model(
  'delete_events',
  deleteEventSchema
)

export interface DeleteBody {
  deleteReason: string
}

export interface GetDeleteEventsResponse {
  success: boolean
  events?: DeleteEvent[]
  message?: string
}

export interface GetItemsResponse {
  success: boolean
  items?: Item[]
  message?: string
}

export interface InventoryResponse {
  success: boolean
  item?: Item
  message?: string
}
