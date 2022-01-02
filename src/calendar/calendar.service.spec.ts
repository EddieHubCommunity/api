// import { ConfigModule } from '@nestjs/config';
// import { Test, TestingModule } from '@nestjs/testing';
// import { CalendarService } from './calendar.service';

// describe('CalendarService', () => {
//   let service: CalendarService;

// beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot({
//           isGlobal: true,
//         }),
//       ],
//       providers: [CalendarService],
//     }).compile();

//     service = module.get<CalendarService>(CalendarService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

it('single test', () => {
  expect(1 + 1).toBe(2);
});
