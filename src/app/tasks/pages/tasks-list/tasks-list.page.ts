import { OverlayService } from './../../../core/services/overlay.service';
import { Task } from './../../models/task.model';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {

  tasks$: Observable<Task[]>;
  constructor(private navCtrl: NavController, private taskService: TasksService, private overlayService: OverlayService) {

  }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.tasks$ = this.taskService.getAll();
    this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss())
  }
  onUpdate(task: Task ): void
  {
    this.navCtrl.navigateForward(['tasks','edit', task.id]);
  }
  async onDelete(task: Task): Promise<void>
  {
    await this.overlayService.alert({
      message: `Voce tem certeza que deseja deletar esta tarefa "${task.title}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () =>
          {
            await this.taskService.delete(task);
            await this.overlayService.toast({
              message: `Task "${task.title}" deleted!`
            })
          }
        },
        'Não'
      ]
    })
  }
  async onDone(task: Task): Promise<void>
  {
    const taskToUpdate = { ...task, done: !task.done};
    await this.taskService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Task "${task.title}"  ${taskToUpdate.done ? 'Completed': 'updated'}!   `
    })

  }
}
