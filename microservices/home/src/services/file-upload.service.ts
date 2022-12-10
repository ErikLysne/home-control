export abstract class FileUploadService {
	protected fileToString(file: Express.Multer.File) {
		return file.buffer.toString().replace(/\x00/g, '');
	}
}
