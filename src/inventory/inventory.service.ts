import { Logger } from '../utils/logger'
import {
  DeleteEvents,
  GetDeleteEventsResponse,
  GetItemsResponse,
  Inventory,
  InventoryResponse,
  IItem,
  Item,
} from './inventory.model'

export class InventoryService {
  /**
   * Get all Items in Inventory where deleted boolean is
   * set to false, which indicates item is not deleted
   * @returns Items in Inventory
   */
  async getItems(): Promise<GetItemsResponse> {
    try {
      const items = await Inventory.find({ deleted: false })
      return {
        success: true,
        items,
      }
    } catch (e) {
      return this.handleError('getItems', e)
    }
  }

  /**
   * Create an item from item request body
   * @param itemBody item passed in by user
   * @returns response of success boolean with message on failure,
   *          else, item id on successful creation of document
   */
  async create(itemBody: Item): Promise<InventoryResponse> {
    try {
      const item = await Inventory.create(itemBody)

      return {
        success: true,
        item,
      }
    } catch (e) {
      return this.handleError('create', e, { itemBody })
    }
  }

  /**
   * Delete an item present in inventory by setting deleted
   * boolean to true and creates a delete event
   * @param itemId item id present in inventory
   * @returns success true if item is present and deleted, else
   *          returns success false with an error message
   */
  async delete(
    itemId: string,
    deleteReason: string = 'No reason'
  ): Promise<InventoryResponse> {
    const deleteItem = async (item: IItem) => {
      if (item.deleted) {
        return {
          success: false,
          message: 'Item ID has been deleted recently',
        }
      }
      item.deleted = true
      await item.save()
      await DeleteEvents.create({ itemId: item._id, reason: deleteReason })
    }
    return this.findByIdAndPerformAction('delete', itemId, deleteItem, {
      itemId,
    })
  }

  /**
   * Edit a single document by ID if present
   * @param itemId ID of Item being updated
   * @param itemBody Contents of new Item
   * @returns success true if updating succeeded and old item, else, false with
   *          error message
   */
  async edit(itemId: string, itemBody: Item): Promise<InventoryResponse> {
    const updateItem = async (item: IItem) => item.updateOne(itemBody)
    return this.findByIdAndPerformAction('edit', itemId, updateItem, {
      itemId,
      itemBody,
    })
  }

  /**
   * Retrieves all delete events recorded in database
   * @returns All delete events
   */
  async getDeleteEvents(): Promise<GetDeleteEventsResponse> {
    try {
      const events = await DeleteEvents.find()

      return {
        success: true,
        events,
      }
    } catch (e) {
      return this.handleError('getItems', e)
    }
  }

  /**
   * Retrieves most recent delete event and undo the event
   * @returns success true if there was an event and event
   *          was successfully un-deleted
   */
  async undoDeleteEvent(): Promise<InventoryResponse> {
    try {
      const mostRecentDeleteEvent = await DeleteEvents.findOne().sort({
        $natural: -1,
      })
      if (mostRecentDeleteEvent) {
        const updateDeletedToFalse = async (item: IItem) => {
          item.deleted = false
          await item.save()
          await mostRecentDeleteEvent.deleteOne()
        }
        return this.findByIdAndPerformAction(
          'undoDeleteEvent',
          mostRecentDeleteEvent.itemId,
          updateDeletedToFalse
        )
      }
      return {
        success: false,
        message: 'There are no deleted events available',
      }
    } catch (e) {
      return this.handleError('undoDeleteEvent', e)
    }
  }

  /**
   * Helper method to enforce DRY for all methods that require
   * looking up by ID
   * @param itemId ID of Item to find in Inventory
   * @param payload payload of the method from the controller
   * @param action callback function to be performed on item
   * @returns InventoryResponse after function is performed or
   *          success set to false if item not found
   */
  private async findByIdAndPerformAction(
    methodName: string,
    itemId: string,
    action: (item: IItem) => Promise<any>,
    payload?: any
  ): Promise<InventoryResponse> {
    try {
      const item = await Inventory.findById(itemId)

      // if item is present
      if (item) {
        await action(item)
        return {
          success: true,
          item,
        }
      }

      // if item is not present, send error message
      return {
        success: false,
        message: 'Item ID does not exist in Inventory',
      }
    } catch (e) {
      return this.handleError(methodName, e, payload)
    }
  }

  /**
   * Helper method that handles unknown error type by either returning
   * error message if error is of Error type, else sending an unknown error
   * @param e unknown error
   * @returns InventoryResponse
   */
  private handleError(
    methodName: string,
    e: unknown,
    payload?: any
  ): InventoryResponse {
    if (e instanceof Error) {
      Logger.error(
        `InventoryService.${methodName} failed with error ${e}`,
        payload
      )
      return {
        success: false,
        message: e.message,
      }
    }
    Logger.error(
      `InventoryService.${methodName} failed with unknown error ${e}`,
      payload
    )
    return {
      success: false,
      message: 'Unknown error',
    }
  }
}
