import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { TaskSavePageRoutingModule } from './task-save-routing.module';

import { TaskSavePage } from './task-save.page';

@NgModule({
  imports: [
   SharedModule,
    TaskSavePageRoutingModule
  ],
  declarations: [TaskSavePage]
})
export class TaskSavePageModule {}
