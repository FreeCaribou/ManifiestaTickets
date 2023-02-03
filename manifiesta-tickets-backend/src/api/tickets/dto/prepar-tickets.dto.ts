import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { AddressNeededValidator } from "src/api/shared/validators/addressNeeded.validator";
import { Address } from "../address.entity";

export class PreparTicketsDto {
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  readonly language: string;
  @IsString()
  readonly ip: string;
  @IsString()
  readonly agent: string;
  @IsNumber()
  readonly invoice: number;
  @IsNumber()
  readonly testmode: number;
  // First and lastname in one
  @IsString()
  @IsNotEmpty()
  readonly sellerName: string;
  // we use the email of the seller
  @IsString()
  @IsNotEmpty()
  readonly sellerId: string;
  @IsString()
  @IsNotEmpty()
  readonly sellerDepartmentId: string;
  @IsString()
  @IsNotEmpty()
  readonly sellerPostalCode: string;
  @IsString()
  readonly clientTransactionId: string;
  @IsArray()
  readonly tickets: { ticketId: string, ticketAmount: number, ticketName: string, ticketPrice: number }[];
  
  readonly askSendTicket: boolean;
  @Validate(AddressNeededValidator)
  readonly address: Address;
}