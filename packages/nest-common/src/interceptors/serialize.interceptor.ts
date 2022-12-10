import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	UseInterceptors
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
	new (...args: any[]): any;
}

export function Serialize(Dto: ClassConstructor) {
	return UseInterceptors(new SerializeInterceptor(Dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
	constructor(private Dto: ClassConstructor) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map((data: any) => {
				return plainToInstance(this.Dto, data, {
					excludeExtraneousValues: true
				});
			})
		);
	}
}
