import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pdf } from './modules/pdf/schemas/pdf.model';
import { PdfModule } from './modules/pdf/pdf.module';
// import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
// import { SequelizeModule } from './infrastructure/config/sequelize/sequelize.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'esign',
      models: [Pdf],
    }),
    PdfModule,
    // EnvironmentConfigModule,
    SequelizeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
