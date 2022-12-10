import { Expose, Type } from 'class-transformer';
import { RoomModelBasicDto } from './room-model-basic.dto';

export class RoomDto {
	@Expose()
	id: number;

	@Expose()
	name?: string | null;

	@Expose()
	@Type(() => RoomModelBasicDto)
	model?: RoomModelBasicDto | null;
}
