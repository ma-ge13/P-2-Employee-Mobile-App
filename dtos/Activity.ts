export interface Activity {
  id: string;
  title: string;
  desc: string;
  startTime: number;
  endTime: number;
  location: string;
  status: 'On Schedule' | 'Cancelled';
}

export const backendAddress = 'http://20.75.160.73:3000';
