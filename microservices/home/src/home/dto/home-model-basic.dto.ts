import { Expose } from 'class-transformer';

export class HomeModelBasicDto {
	@Expose()
	id: number;

	@Expose()
	file: string;
}
