import { Logger } from '../utils/logger'
import {
  GetItemsResponse,
  Inventory,
  InventoryResponse,
  Item,
  ItemBody,
} from './inventory.model'

export class InventoryService {
  /**
   * Get all Items in Inventory and returns
   * @returns Items in Inventory
   */
  async getItems(): Promise<GetItemsResponse> {
    try {
      const items = await Inventory.find()
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
  async create(itemBody: ItemBody): Promise<InventoryResponse> {
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
   * Delete an item present in inventory by id if item is present,
   * else, do nothing
   * @param itemId item id present in inventory
   * @returns success true if item is present and deleted, else
   *          returns success false with a message
   */
  async delete(itemId: string): Promise<InventoryResponse> {
    const deleteItem = async (item: Item) => item.deleteOne()
    return this.findByIdAndPerformAction(
      'delete',
      { itemId },
      itemId,
      deleteItem
    )
  }

  /**
   * Edit a single document by ID if present
   * @param itemId ID of Item being updated
   * @param itemBody Contents of new Item
   * @returns success true if updating succeeded and old item, else, false with
   *          error message
   */
  async edit(itemId: string, itemBody: ItemBody): Promise<InventoryResponse> {
    const updateItem = async (item: Item) => item.updateOne(itemBody)
    return this.findByIdAndPerformAction(
      'edit',
      { itemId, itemBody },
      itemId,
      updateItem
    )
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
    payload: any,
    itemId: string,
    action: (item: Item) => Promise<any>
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
