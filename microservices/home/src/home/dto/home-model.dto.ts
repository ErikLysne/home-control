import { Expose } from 'class-transformer';

export class HomeModelDto {
	@Expose()
	id: number;

	@Expose()
	file: string;

	@Expose()
	homeId: number | null;
}
