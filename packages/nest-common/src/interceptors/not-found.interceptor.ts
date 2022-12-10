import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	NotFoundException
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			tap((data: any) => {
				if (data == null) throw new NotFoundException();
			})
		);
	}
}
