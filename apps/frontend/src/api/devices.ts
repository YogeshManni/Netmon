import axios from 'axios';

export interface Device {
  key: string;
  ip: string;
  hostname: string;
  status: string;
  
}

export const fetchDevices = async (): Promise<Device[]> => {
  // In production, replace with: return axios.get('/api/devices').then(res => res.data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { key: '1', ip: '192.168.1.101', hostname: 'PC-01', status: 'Online' },
        { key: '2', ip: '192.168.1.102', hostname: 'PC-02', status: 'Offline' }
      ]);
    }, 1000);
  });
};

export const performOperation = async (
  ip: string,
  operation: string,
  params: string
): Promise<string> => {
  // In production, replace with: return axios.post('/api/operation', { ip, operation, params }).then(res => res.data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Executed ${operation} on ${ip} with params: ${params}`);
    }, 1500);
  });
};
