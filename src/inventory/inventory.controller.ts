import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
} from 'tsoa'
import {
  DeleteBody,
  GetDeleteEventsResponse,
  GetItemsResponse,
  InventoryResponse,
  Item,
} from './inventory.model'
import { InventoryService } from './inventory.service'

@Route('inventory')
export class InventoryController extends Controller {
  private readonly inventoryService: InventoryService

  constructor() {
    super()
    this.inventoryService = new InventoryService()
  }

  /**
   * Retrieves all items and quantities in the database
   */
  @Get()
  @SuccessResponse(200, 'OK')
  @Response(400, 'Bad Request')
  async getItems(): Promise<GetItemsResponse> {
    return this.inventoryService.getItems()
  }

  /**
   * Undo the last delete event
   */
  @Patch('undo-delete')
  @SuccessResponse(202, 'Accepted')
  @Response(400, 'Bad Request')
  async undo(): Promise<InventoryResponse> {
    return this.inventoryService.undoDeleteEvent()
  }

  /**
   * Updates the specified Item with contents in request body
   */
  @Patch('{itemId}')
  @SuccessResponse(202, 'Accepted')
  @Response(400, 'Bad Request')
  async edit(
    @Path() itemId: string,
    @Body() newItemBody: Item
  ): Promise<InventoryResponse> {
    return this.inventoryService.edit(itemId, newItemBody)
  }

  /**
   * Creates a new Item based on request body
   */
  @Post()
  @SuccessResponse(201, 'Created')
  @Response(400, 'Bad Request')
  async create(@Body() newItemBody: Item): Promise<InventoryResponse> {
    return this.inventoryService.create(newItemBody)
  }

  /**
   * Delete an item from inventory, with a deleteReason that can be
   * specified in request body
   */
  @Delete('{itemId}')
  @SuccessResponse(202, 'Accepted')
  @Response(400, 'Bad Request')
  async delete(
    @Path() itemId: string,
    @Body() deleteBody: DeleteBody
  ): Promise<InventoryResponse> {
    return this.inventoryService.delete(itemId, deleteBody?.deleteReason)
  }

  /**
   * Retrieves all delete events
   */
  @Get('deleted')
  @SuccessResponse(200, 'OK')
  @Response(400, 'Bad Request')
  async getDeleteEvents(): Promise<GetDeleteEventsResponse> {
    return this.inventoryService.getDeleteEvents()
  }
}
