import { Component, inject } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../core/types/user';
import { environment } from '../../environments/environment';

@Component({
  selector: 'cas-profile',
  imports: [JsonPipe, AsyncPipe],
  template: `
    @let user = user$ | async;

    <p>profile works!</p>
    <pre>{{ userService.currentUser() | json }}</pre>
    <pre>{{ user | json }}</pre>

    <img [src]="urlUploads + user?.avatar" alt="user image" />
  `,
  styles: ``,
})
export default class ProfileComponent {
  userService = inject(UserService);
  router = inject(Router);
  user$: Observable<User>;
  urlUploads = environment.urlServer + '/uploads/';

  constructor() {
    if (!this.userService.currentUser()) {
      this.router.navigate(['/home']);
    }

    this.user$ = this.userService.getUserById(
      this.userService.currentUser()!.id,
    );
  }
}
