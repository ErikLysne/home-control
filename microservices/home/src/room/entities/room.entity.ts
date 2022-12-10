import { Room, RoomModel } from '@prisma/client';

export class RoomEntity implements Room {
	id: number;
	name: string | null;
	homeId: number | null;
	model: RoomModel | null;
}
