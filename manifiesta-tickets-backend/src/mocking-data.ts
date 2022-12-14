/**
 * Some string with query
 * It's to assemble them into some scenario
 */

import { DataSource } from "typeorm";
import { Department } from "./api/departments/department.entity";
import { Seller } from "./api/sellers/seller.entity";
import { Address } from "./api/tickets/address.entity";
import { SellingInformation } from "./api/tickets/selling-information.entity";
import { appDataSourceConfig } from "./data-source";

export async function mockingData() {
  const repo = await new DataSource(appDataSourceConfig()).initialize();
  await repo.dropDatabase();
  repo.initialize();
  // we need to recall it to have again the table after the clean up
  await new DataSource(appDataSourceConfig()).initialize();
  const departments = await mockDepartments(repo);
  const sellers = await mockSellers(repo, departments);
  const address = await mockAddress(repo);
  const sellingInformation = await mockSellingInformation(repo);
}

async function mockDepartments(repo) {
  const departmentRepo = repo.getRepository(Department);
  return [
    await departmentRepo.save(departmentRepo.create({ label: 'BBW', code: 'BBW' })),
    await departmentRepo.save(departmentRepo.create({ label: 'Antwerpen', code: 'Antwerpen' })),
    await departmentRepo.save(departmentRepo.create({ label: 'IT - Communication', code: 'IT' })),
  ];
}

async function mockSellers(repo, departments: Department[]) {
  const sellerRepo = await repo.getRepository(Seller);
  const mainId = process.env.BEEPLE_TEST_ID || '007';
  return [
    await sellerRepo.save(sellerRepo.create({ email: 'samy@manifiesta.com', name: 'Samy Gnu', beepleId: mainId })),
    await sellerRepo.save(sellerRepo.create({ email: 'raoul@manifiesta.com', name: 'Raoul Mertens', beepleId: '117' })),
    await sellerRepo.save(sellerRepo.create({ email: 'rosa@manifiesta.com', name: 'Rosa Monaco', beepleId: '1919' })),
    await sellerRepo.save(sellerRepo.create({ email: 'louise@manifiesta.com', name: 'Louise Petrole', beepleId: '1871' })),
    await sellerRepo.save(sellerRepo.create({ email: 'orwell@manifiesta.com', name: 'Eric Arthur Blair', beepleId: '1984' })),
  ];
}

async function mockAddress(repo) {
  const addressRepo = await repo.getRepository(Address);
  return [
    await addressRepo.save(addressRepo.create({
      eventsquareReference: 'FKV87745',
      firstName: 'Samy',
      lastName: 'Gnulol',
      street: 'Rue du Lombard',
      number: '1917',
      postCode: '1000',
      city: 'Brussels',
      sendDone: false,
    })),
    await addressRepo.save(addressRepo.create({
      eventsquareReference: 'VNF29658',
      firstName: 'Flotal',
      lastName: 'Inrard',
      street: 'Rue Rosa',
      number: '1936',
      postCode: '1000',
      city: 'Brussels',
      sendDone: true,
    })),
  ]
}

async function mockSellingInformation(repo) {
  const mainId = process.env.BEEPLE_TEST_ID || '007';
  const sellingInformationRepo = await repo.getRepository(SellingInformation);
  return [
    await sellingInformationRepo.save(sellingInformationRepo.create({
      sellerId: mainId,
      sellerDepartmentId: 'BBW',
      sellerPostalCode: '1040',
      vwTransactionId: '117',
      eventsquareReference: 'JWT-666',
      date: new Date(),
      quantity: 4,
      clientName: 'Random Client 1',
      ticketInfo: [
        { "ticketId": "1", "ticketAmount": 2, "ticketName": "Regular Intal", ticketPrice: 0.01 },
        { "ticketId": "2", "ticketAmount": 2, "ticketName": "Weekend Intal", ticketPrice: 0.02 }
      ]
    })),
    await sellingInformationRepo.save(sellingInformationRepo.create({
      sellerId: mainId,
      sellerDepartmentId: 'BBW',
      sellerPostalCode: '1040',
      vwTransactionId: '118',
      eventsquareReference: 'PTB-666',
      date: new Date(),
      quantity: 1,
      clientName: 'Random Client 2',
      ticketInfo: [{ "ticketId": "1", "ticketAmount": 1, "ticketName": "Regular Intal", ticketPrice: 0.01 }]
    })),
    await sellingInformationRepo.save(sellingInformationRepo.create({
      sellerId: '117',
      sellerDepartmentId: 'NLU',
      sellerPostalCode: '5000',
      vwTransactionId: '120',
      eventsquareReference: 'CDH-666',
      date: new Date(),
      quantity: 3,
      clientName: 'Random Client 3',
      ticketInfo: [{ "ticketId": "1", "ticketAmount": 3, "ticketName": "Regular Intal", ticketPrice: 0.01 }]
    })),
    await sellingInformationRepo.save(sellingInformationRepo.create({
      sellerId: mainId,
      sellerDepartmentId: 'NLU',
      sellerPostalCode: '5000',
      vwTransactionId: '119',
      eventsquareReference: 'PVDA-666',
      date: new Date(),
      quantity: 1,
      clientName: 'Random Client 4',
      ticketInfo: [{ "ticketId": "1", "ticketAmount": 1, "ticketName": "Regular Intal", ticketPrice: 0.01 }]
    })),
    await sellingInformationRepo.save(sellingInformationRepo.create({
      sellerId: '1919',
      sellerDepartmentId: 'BBW',
      sellerPostalCode: '1000',
      vwTransactionId: '121',
      eventsquareReference: 'PVDA-667',
      date: new Date(),
      quantity: 1,
      clientName: 'Random Client 5',
      ticketInfo: [{ "ticketId": "1", "ticketAmount": 1, "ticketName": "Regular Intal", ticketPrice: 0.01 }]
    })),
    await sellingInformationRepo.save(sellingInformationRepo.create({
      sellerId: '1871',
      sellerDepartmentId: 'BBW',
      sellerPostalCode: '1000',
      vwTransactionId: '122',
      eventsquareReference: 'PVDA-668',
      date: new Date(),
      quantity: 1,
      clientName: 'Random Client 6',
      ticketInfo: [{ "ticketId": "1", "ticketAmount": 1, "ticketName": "Regular Intal", ticketPrice: 0.01 }]
    })),
    await sellingInformationRepo.save(sellingInformationRepo.create({
      sellerId: '1984',
      sellerDepartmentId: 'BBW',
      sellerPostalCode: '1000',
      vwTransactionId: '122',
      eventsquareReference: 'PVDA-669',
      date: new Date(),
      quantity: 1,
      clientName: 'Random Client 7',
      ticketInfo: [{ "ticketId": "1", "ticketAmount": 1, "ticketName": "Regular Intal", ticketPrice: 0.01 }]
    })),
  ]

}