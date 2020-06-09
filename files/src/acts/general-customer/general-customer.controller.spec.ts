import { Test, TestingModule } from '@nestjs/testing';
import { GeneralCustomerController } from './general-customer.controller';

describe('GeneralCustomer Controller', () => {
  let controller: GeneralCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralCustomerController],
    }).compile();

    controller = module.get<GeneralCustomerController>(GeneralCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
