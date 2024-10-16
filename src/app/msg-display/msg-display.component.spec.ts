import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgDisplayComponent } from './msg-display.component';

describe('MsgDisplayComponent', () => {
  let component: MsgDisplayComponent;
  let fixture: ComponentFixture<MsgDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
