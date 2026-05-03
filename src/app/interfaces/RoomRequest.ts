export interface RoomRequest {
  name: string;
  type: 'SINGLE' | 'DOUBLE' | 'SUITE';
  price: number;
  capacity: number;
}
