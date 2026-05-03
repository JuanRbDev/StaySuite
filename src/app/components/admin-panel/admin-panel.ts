import { RoomsService } from './../../service/admin/rooms/rooms-service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomRequest } from '../../interfaces/RoomRequest';

@Component({
  selector: 'app-admin-panel',
  imports: [
    FormsModule
  ],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel {


  hotelId!: number;

  room: RoomRequest = {
    name: '',
    type: 'SUITE',
    price: 0,
    capacity: 0
  };

  constructor(
    private roomsService: RoomsService
  )
  { }

  onSubmit() {
    this.roomsService.createRoom(this.hotelId, this.room)
      .subscribe({
        next: (res) => {
          console.log('Room creada:', res);
          alert('Habitación creada correctamente');
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear habitación');
        }
      });
  }

}
