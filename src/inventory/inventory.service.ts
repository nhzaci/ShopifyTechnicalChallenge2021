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
   * Get all Items in Inventory
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
      // create item
      const item = await Inventory.create(itemBody)

      // return item with id
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
    try {
      const item = await Inventory.findById(itemId)

      // if item exists, delete it
      if (item) {
        await item.deleteOne()
        return {
          success: true,
          item,
        }
      }

      // else, return that item does not exist
      return {
        success: false,
        message: 'Item ID does not exist in Inventory',
      }
    } catch (e) {
      return this.handleError('delete', e, { itemId })
    }
  }

  /**
   * Edits a single document with its corresponding new Item body
   * @param itemId ID of Item being updated
   * @param itemBody Contents of new Item
   * @returns success true if updating succeeded and old item, else, false with
   *          error message
   */
  async edit(itemId: string, itemBody: ItemBody): Promise<InventoryResponse> {
    try {
      const item = await Inventory.findById(itemId)

      if (item) {
        await item.updateOne(itemBody)
        return {
          success: true,
          item,
        }
      }

      return {
        success: false,
        message: 'Item ID does not exist in Inventory',
      }
    } catch (e) {
      return this.handleError('edit', e, { itemId, itemBody })
    }
  }

  /**
   * Handles unknown error type by either returning error message
   * if error is of Error type, else sending an unknown error
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
