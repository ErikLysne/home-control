import { Expose, Type } from 'class-transformer';
import { RoomDto } from '../../room/dto/room.dto';
import { HomeModelBasicDto } from './home-model-basic.dto';

export class HomeDto {
	@Expose()
	id: number;

	@Expose()
	name?: string | null;

	@Expose()
	@Type(() => RoomDto)
	rooms?: RoomDto[];

	@Expose()
	@Type(() => HomeModelBasicDto)
	model?: HomeModelBasicDto | null;
}
