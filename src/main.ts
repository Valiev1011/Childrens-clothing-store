import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { LoggerFactory } from './logger/logger';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle("Children's clothing store")
      .setDescription("Mini project for Children's clothing store")
      .setVersion('1.0.0')
      .addTag('NodeJs, NestJS, Postgress, Sequielize, JWT, OTP, Swagger')
      .build();

    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule, {
      logger: LoggerFactory('nest'),
    });
    app.setGlobalPrefix('api');
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
