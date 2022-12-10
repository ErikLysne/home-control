import { PrismaModule } from '@homecontrol/nest-common';
import { Module } from '@nestjs/common';
import { RoomController, RoomsController } from './room.controller';
import { RoomService } from './room.service';

@Module({
	controllers: [RoomsController, RoomController],
	providers: [RoomService],
	imports: [PrismaModule]
})
export class RoomModule {}
