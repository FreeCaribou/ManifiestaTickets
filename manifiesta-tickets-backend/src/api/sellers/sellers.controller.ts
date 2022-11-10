import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConnectSellerDto } from './dto/connect-seller.dto';
import { SellersService } from './sellers.service';

@Controller('api/sellers')
export class SellersController {

  constructor(private readonly sellersService: SellersService) { }
  
  @Get()
  findAll() {
    return this.sellersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @Post('/connect')
  connect(@Body() connectSeller: ConnectSellerDto) {
    return this.sellersService.connect(connectSeller);
  }

  // TODO for demo purpose
  @Get('/tickets/:email')
  addTicket(@Param('email') email: string) {
    return this.sellersService.addTicket(email);
  }

}
