import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'OK';
  }

  getDevices() {
    return [
      { id: 1, ip: '192.168.1.101', status: 'online' },
      { id: 2, ip: '192.168.1.102', status: 'offline' },
    ];
  }
}