import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabController } from './lab.controller';
import { labSchema } from './lab.schema';
import { LabsService } from './labs.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'lab', schema: labSchema }]),
    ],
    controllers: [
        LabController,
    ],
    providers: [LabsService]
})
export class LabsModule {}
