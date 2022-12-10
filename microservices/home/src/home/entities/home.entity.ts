import { Home, HomeModel } from '@prisma/client';
import { RoomDto } from '../../room/dto/room.dto';

export class HomeEntity implements Home {
	id: number;
	name: string | null;
	model: HomeModel | null;
	rooms: RoomDto[] | null;
}
