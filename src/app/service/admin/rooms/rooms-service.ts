import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomRequest } from '../../../interfaces/RoomRequest';
import { RoomResponse } from '../../../interfaces/RoomResponse';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {

  private url = 'http://localhost:8080/api/rooms'

  constructor(
    private http: HttpClient,
  ) { }


  createRoom(hotelId: number, data: RoomRequest) {
    return this.http.post<RoomResponse>(
      `${this.url}/${hotelId}`,
      data
    );
  }
}
