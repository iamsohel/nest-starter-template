import { Module } from '@nestjs/common';
import { LeavesController } from './controllers/leaves.controller';
import { LeavesService } from './services/leaves.service';

@Module({
  controllers: [LeavesController],
  providers: [LeavesService]
})
export class LeavesModule { }
