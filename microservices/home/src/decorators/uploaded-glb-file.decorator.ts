import { HttpStatus, ParseFilePipeBuilder, UploadedFile } from '@nestjs/common';

export function UploadedGlbFile() {
	return UploadedFile(
		new ParseFilePipeBuilder()
			.addFileTypeValidator({
				fileType: 'application/octet-stream'
			})
			.addMaxSizeValidator({
				maxSize: 100000
			})
			.build({
				errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
			})
	);
}
