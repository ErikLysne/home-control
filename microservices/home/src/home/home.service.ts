import { PrismaService } from '@homecontrol/nest-common';
import { Injectable } from '@nestjs/common';
import { FileUploadService } from '../services/file-upload.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { GetHomeQuery } from './queries/get-home-query.entity';

@Injectable()
export class HomeService extends FileUploadService {
	constructor(private prisma: PrismaService) {
		super();
	}

	create(createHomeDto: CreateHomeDto) {
		return this.prisma.home.create({
			data: createHomeDto
		});
	}

	findAll(query: GetHomeQuery) {
		return this.prisma.home.findMany({
			include: {
				model: query.includeModel
			}
		});
	}

	findOne(id: number, query: GetHomeQuery) {
		return this.prisma.home.findFirst({
			where: { id },
			include: {
				model: query.includeModel,
				rooms: true
			}
		});
	}

	update(id: number, updateHomeDto: UpdateHomeDto) {
		return this.prisma.home.update({
			where: { id },
			data: updateHomeDto
		});
	}

	remove(id: number) {
		return this.prisma.home.delete({
			where: {
				id
			}
		});
	}

	createModel(id: number, file: Express.Multer.File) {
		const fileStr = this.fileToString(file);

		return this.prisma.homeModel.upsert({
			where: { homeId: id },
			update: {
				file: fileStr
			},
			create: {
				file: fileStr,
				homeId: id
			}
		});
	}

	findModel(id: number) {
		return this.prisma.homeModel.findFirst({ where: { homeId: id } });
	}

	deleteModel(id: number) {
		return this.prisma.homeModel.delete({
			where: { homeId: id }
		});
	}
}
