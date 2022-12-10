import { Expose } from 'class-transformer';
import { TransformBoolean } from '../../decorators/transform-boolean.decorator';
import { TransformNumber } from '../../decorators/transform-number.decorator';

export class GetRoomsQuery {
	@Expose()
	@TransformNumber()
	homeId?: number;

	@Expose()
	@TransformBoolean()
	includeModel?: boolean;
}
