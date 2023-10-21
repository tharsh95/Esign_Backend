import {
  Get,
  Controller,
  UploadedFile,
  Post,
  UseInterceptors,
  Put,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { PdfService } from '../../service/pdf/pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('pdf')

export class PdfController {

  constructor(private pdfService: PdfService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Res() res:Response) {
    const data=await this.pdfService.uploadFile(file)
    res.status(200).json(data);
  }

  @Post('fill')
  async uploadResponse(@Body() body?: any) {
    await this.pdfService.uploadResponse(body);
  }

  @Put('update/:id')
  async updateDocument(@Param() id: any, @Res() res: Response) {
    const data = await this.pdfService.update(id.id);
    return res.status(200).json(data);
  }

  @Get('list')
  async listSign(@Res() res: Response) {
    const data = await this.pdfService.list();
    return res.status(200).json(data);
  }

  @Post(':id/submit')
  async submit(@Param() id: any, @Res() res: Response) {
    const data = await this.pdfService.submit(id.id);
    return res.status(200).json(data);
  }

  // @Get(':id/download')
  // async download(@Param() id:any,@Res() res:Response){
  //   const data=await this.pdfService.download(id.id)
  //   return res.status(200).json(data)
  // }
}
