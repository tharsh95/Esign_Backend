import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pdf } from './schemas/pdf.model';
import { PdfController } from './controller/pdf/pdf.controller';
import { PdfService } from './service/pdf/pdf.service';

@Module({
    imports:[SequelizeModule.forFeature([Pdf])],
    controllers:[PdfController],
    providers:[PdfService]
})
export class PdfModule {}
