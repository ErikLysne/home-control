import { Expose } from 'class-transformer';
import { TransformBoolean } from '../../decorators/transform-boolean.decorator';

export class GetHomeQuery {
	@Expose()
	@TransformBoolean()
	includeModel?: boolean;
}
