import { PrismaService } from '@homecontrol/nest-common';
import { Injectable } from '@nestjs/common';
import { FileUploadService } from '../services/file-upload.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetRoomQuery } from './queries/get-room-query.entity';
import { GetRoomsQuery } from './queries/get-rooms-query.entity';

@Injectable()
export class RoomService extends FileUploadService {
	constructor(private readonly prisma: PrismaService) {
		super();
	}

	create(createRoomDto: CreateRoomDto) {
		return this.prisma.room.create({
			data: createRoomDto
		});
	}

	findAll(query: GetRoomsQuery) {
		return this.prisma.room.findMany({
			where: {
				homeId: query.homeId
			},
			include: {
				model: query.includeModel
			}
		});
	}

	findOne(id: number, query: GetRoomQuery) {
		return this.prisma.room.findFirst({
			where: { id },
			include: {
				model: query.includeModel
			}
		});
	}

	update(id: number, updateRoomDto: UpdateRoomDto) {
		return this.prisma.room.update({
			where: { id },
			data: updateRoomDto
		});
	}

	remove(id: number) {
		return this.prisma.room.delete({
			where: {
				id
			}
		});
	}

	createModel(id: number, file: Express.Multer.File) {
		const fileStr = this.fileToString(file);

		return this.prisma.roomModel.upsert({
			where: { roomId: id },
			update: {
				file: fileStr
			},
			create: {
				file: fileStr,
				roomId: id
			}
		});
	}

	findModel(id: number) {
		return this.prisma.roomModel.findFirst({ where: { roomId: id } });
	}

	deleteModel(id: number) {
		return this.prisma.roomModel.delete({
			where: { roomId: id }
		});
	}
}
