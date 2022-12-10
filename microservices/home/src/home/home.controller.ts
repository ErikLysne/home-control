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
import { CreateHomeDto } from './dto/create-home.dto';
import { HomeModelDto } from './dto/home-model.dto';
import { HomeDto } from './dto/home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { HomeService } from './home.service';
import { GetHomeQuery } from './queries/get-home-query.entity';

@Controller('homes')
@ApiTags('Home')
export class HomesController {
	constructor(private readonly homeService: HomeService) {}

	@Post()
	@ApiOkResponse({
		type: HomeDto
	})
	@Serialize(HomeDto)
	create(@Body() createHomeDto: CreateHomeDto) {
		return this.homeService.create(createHomeDto);
	}

	@Get()
	@ApiOkResponse({
		type: HomeDto,
		isArray: true
	})
	@Serialize(HomeDto)
	findAll(@Query() query: GetHomeQuery) {
		return this.homeService.findAll(query);
	}
}

@Controller('home')
@ApiTags('Home')
@Serialize(HomeDto)
export class HomeController {
	constructor(private readonly homeService: HomeService) {}

	@Get(':homeId')
	@ApiOkResponse({
		type: HomeDto
	})
	findOne(@Param('homeId') homeId: string, @Query() query: GetHomeQuery) {
		return this.homeService.findOne(+homeId, query);
	}

	@Patch(':homeId')
	@ApiOkResponse({
		type: HomeDto
	})
	update(
		@Param('homeId') homeId: string,
		@Body() updateHomeDto: UpdateHomeDto
	) {
		return this.homeService.update(+homeId, updateHomeDto);
	}

	@Delete(':homeId')
	@ApiOkResponse({
		type: HomeDto
	})
	remove(@Param('homeId') homeId: string) {
		return this.homeService.remove(+homeId);
	}

	@Post(':homeId/model')
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
		type: HomeDto
	})
	@UseInterceptors(FileInterceptor('file'))
	async createModel(
		@Param('homeId') homeId: string,
		@UploadedGlbFile()
		file: Express.Multer.File
	) {
		try {
			await this.homeService.createModel(+homeId, file);
		} catch (error) {
			throw new NotFoundException();
		}
		return this.homeService.findOne(+homeId, { includeModel: true });
	}

	@Get(':homeId/model')
	@ApiOkResponse({ type: HomeModelDto })
	findModel(@Param('homeId') homeId: string) {
		return this.homeService.findModel(+homeId);
	}

	@Delete(':homeId/model')
	@ApiOkResponse({
		type: HomeDto
	})
	async removeModel(@Param('homeId') homeId: string) {
		try {
			await this.homeService.deleteModel(+homeId);
		} catch (error) {
			throw new NotFoundException();
		}
		return this.homeService.findOne(+homeId, { includeModel: false });
	}
}
