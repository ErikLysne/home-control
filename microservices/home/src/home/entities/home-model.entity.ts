import { HomeModel } from '@prisma/client';

export class HomeModelEntity implements HomeModel {
	id: number;
	file: string;
	homeId: number | null;
}
