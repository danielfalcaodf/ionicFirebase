import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskSavePage } from './task-save.page';

describe('TaskSavePage', () => {
  let component: TaskSavePage;
  let fixture: ComponentFixture<TaskSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
