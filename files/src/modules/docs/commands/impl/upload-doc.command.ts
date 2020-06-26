import { ReadStream } from 'fs';

export class UploadDocCommand {
    constructor(
        public readonly actId: string,
        public readonly file: File,
        public readonly docId: string,
    ) {}
}