export interface RoomResponse {
  id: number;
  name: string;
  type: 'SINGLE' | 'DOUBLE' | 'SUITE';
  price: number;
  capacity: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
}
