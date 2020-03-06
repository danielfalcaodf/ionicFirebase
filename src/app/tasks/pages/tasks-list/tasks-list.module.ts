import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { TasksListPageRoutingModule } from './tasks-list-routing.module';

import { TasksListPage } from './tasks-list.page';

@NgModule({
  imports: [
     SharedModule,
     ComponentsModule,
    TasksListPageRoutingModule
  ],
  declarations: [TasksListPage]
})
export class TasksListPageModule {}
