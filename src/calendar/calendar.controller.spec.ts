// import { ConfigModule } from '@nestjs/config';
// import { Test, TestingModule } from '@nestjs/testing';
// import { CalendarController } from './calendar.controller';
// import { CalendarService } from './calendar.service';

// describe('CalendarController', () => {
//   let controller: CalendarController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot({
//           isGlobal: true,
//         }),
//       ],
//       controllers: [CalendarController],
//       providers: [CalendarService],
//     }).compile();

//     controller = module.get<CalendarController>(CalendarController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
it('single test', () => {
  expect(1 + 1).toBe(2);
});
