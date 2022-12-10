import { Serialize } from '@homecontrol/nest-common';
import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UploadedGlbFile } from '../decorators/uploaded-glb-file.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomModelDto } from './dto/room-model.dto';
import { RoomDto } from './dto/room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetRoomQuery } from './queries/get-room-query.entity';
import { GetRoomsQuery } from './queries/get-rooms-query.entity';
import { RoomService } from './room.service';

@Controller('rooms')
@ApiTags('Room')
export class RoomsController {
	constructor(private readonly roomService: RoomService) {}

	@Post()
	@ApiOkResponse({
		type: RoomDto
	})
	@Serialize(RoomDto)
	create(@Body() createRoomDto: CreateRoomDto) {
		return this.roomService.create(createRoomDto);
	}

	@Get()
	@ApiOkResponse({
		type: RoomDto,
		isArray: true
	})
	@Serialize(RoomDto)
	findAll(@Query() query: GetRoomsQuery) {
		return this.roomService.findAll(query);
	}
}

@Controller('room')
@ApiTags('Room')
@Serialize(RoomDto)
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@Get(':roomId')
	@ApiOkResponse({
		type: RoomDto
	})
	findOne(@Param('roomId') roomId: string, @Query() query: GetRoomQuery) {
		return this.roomService.findOne(+roomId, query);
	}

	@Patch(':roomId')
	@ApiOkResponse({
		type: RoomDto
	})
	update(
		@Param('roomId') roomId: string,
		@Body() updateRoomDto: UpdateRoomDto
	) {
		return this.roomService.update(+roomId, updateRoomDto);
	}

	@Delete(':roomId')
	@ApiOkResponse({
		type: RoomDto
	})
	remove(@Param('roomId') roomId: string) {
		return this.roomService.remove(+roomId);
	}

	@Post(':roomId/model')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@ApiOkResponse({
		type: RoomDto
	})
	@UseInterceptors(FileInterceptor('file'))
	async createModel(
		@Param('roomId') roomId: string,
		@UploadedGlbFile()
		file: Express.Multer.File
	) {
		try {
			await this.roomService.createModel(+roomId, file);
		} catch (error) {
			throw new NotFoundException();
		}
		return this.roomService.findOne(+roomId, { includeModel: true });
	}

	@Get(':roomId/model')
	@ApiOkResponse({ type: RoomModelDto })
	findModel(@Param('roomId') roomId: string) {
		return this.roomService.findModel(+roomId);
	}

	@Delete(':roomId/model')
	@ApiOkResponse({
		type: RoomDto
	})
	async removeModel(@Param('roomId') roomId: string) {
		try {
			await this.roomService.deleteModel(+roomId);
		} catch (error) {
			throw new NotFoundException();
		}
		return this.roomService.findOne(+roomId, { includeModel: false });
	}
}
