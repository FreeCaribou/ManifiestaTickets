import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfirmTicketsDto } from './dto/confirm-tickets.dto';
import { TicketsService } from './tickets.service';

@Controller('api/tickets')
export class TicketsController {

  constructor(private readonly ticketsService: TicketsService) { }
  
  @Get(['/types/:shop', '/types'])
  findAll(@Param('shop') shop: string = 'app') {
    return this.ticketsService.getAllTicketTypes(shop);
  }

  // TODO protect with jwt
  @Post('/confirm')
  confirmOrder(@Body() confirmTickets: ConfirmTicketsDto) {
    return this.ticketsService.confirmOrder(confirmTickets);
  }

  @Get('/transaction/:id')
  getTransactionById(@Param('id') id: string) {
    return this.ticketsService.getTransactionById(id);
  }
  
}
