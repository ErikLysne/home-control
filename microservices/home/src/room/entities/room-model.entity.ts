import { RoomModel } from '@prisma/client';

export class RoomModelEntity implements RoomModel {
	id: number;
	file: string;
	roomId: number | null;
}
