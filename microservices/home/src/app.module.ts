import { PrismaModule } from '@homecontrol/nest-common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { RoomModule } from './room/room.module';

@Module({
	imports: [PrismaModule, HomeModule, RoomModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
