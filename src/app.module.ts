import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackingModule } from './packing/packing.module';

@Module({
  imports: [PackingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
