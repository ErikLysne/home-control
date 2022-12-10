import { Expose } from 'class-transformer';

export class RoomModelDto {
	@Expose()
	id: number;

	@Expose()
	file: string;

	@Expose()
	roomId: number | null;
}
