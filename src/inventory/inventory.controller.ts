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
  GetItemsResponse,
  Item,
  InventoryResponse,
  ItemBody,
} from './inventory.model'
import { InventoryService } from './inventory.service'

@Route('inventory')
export class InventoryController extends Controller {
  private readonly inventoryService: InventoryService

  constructor() {
    super()
    this.inventoryService = new InventoryService()
  }

  @Get()
  @SuccessResponse(200, 'OK')
  @Response(400, 'Bad Request')
  async getItems(): Promise<GetItemsResponse> {
    return this.inventoryService.getItems()
  }

  @Patch('{itemId}')
  @SuccessResponse(202, 'Accepted')
  @Response(400, 'Bad Request')
  async edit(
    @Path() itemId: string,
    @Body() newItemBody: ItemBody
  ): Promise<InventoryResponse> {
    return this.inventoryService.edit(itemId, newItemBody)
  }

  @Post()
  @SuccessResponse(201, 'Created')
  @Response(400, 'Bad Request')
  async create(@Body() newItemBody: ItemBody): Promise<InventoryResponse> {
    return this.inventoryService.create(newItemBody)
  }

  @Delete('{itemId}')
  @SuccessResponse(202, 'Accepted')
  @Response(400, 'Bad Request')
  async delete(@Path() itemId: string): Promise<InventoryResponse> {
    return this.inventoryService.delete(itemId)
  }
}
