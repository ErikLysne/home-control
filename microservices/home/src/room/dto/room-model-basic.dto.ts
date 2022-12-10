import { Expose } from 'class-transformer';

export class RoomModelBasicDto {
	@Expose()
	id: number;

	@Expose()
	file: string;
}
