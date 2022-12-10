import { Transform } from 'class-transformer';

export function TransformBoolean() {
	return Transform(
		({ value }) => [true, 'enabled', 'true'].indexOf(value) > -1
	);
}
