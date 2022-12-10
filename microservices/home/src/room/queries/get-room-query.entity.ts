import { Expose } from 'class-transformer';
import { TransformBoolean } from '../../decorators/transform-boolean.decorator';

export class GetRoomQuery {
	@Expose()
	@TransformBoolean()
	includeModel?: boolean;
}
