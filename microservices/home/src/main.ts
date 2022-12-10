import { NotFoundInterceptor } from '@homecontrol/nest-common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	);
	app.useGlobalInterceptors(new NotFoundInterceptor());

	const config = new DocumentBuilder()
		.setTitle('Home')
		.setDescription('API for HomeControl Home microservice')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('home-api', app, document);

	await app.listen(3000);
}
bootstrap();
