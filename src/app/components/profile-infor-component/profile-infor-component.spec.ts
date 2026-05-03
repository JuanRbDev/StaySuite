import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInforComponent } from './profile-infor-component';

describe('ProfileInforComponent', () => {
  let component: ProfileInforComponent;
  let fixture: ComponentFixture<ProfileInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInforComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInforComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
