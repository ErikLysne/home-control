import { PrismaModule } from '@homecontrol/nest-common';
import { Module } from '@nestjs/common';
import { HomeController, HomesController } from './home.controller';
import { HomeService } from './home.service';

@Module({
	controllers: [HomesController, HomeController],
	providers: [HomeService],
	imports: [PrismaModule]
})
export class HomeModule {}
