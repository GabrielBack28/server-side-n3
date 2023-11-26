import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  initialRoute(): string {
    return 'Server Side - N3';
  }
}
