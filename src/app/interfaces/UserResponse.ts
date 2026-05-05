export interface UserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  photo:string;
  role: 'ADMIN' | 'USER';
}
