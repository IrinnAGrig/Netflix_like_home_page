import { Component, Input, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({ required: true }) userImg: string = '';
  username = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  auth = inject(AuthService);
  navList = ["Home", "TV Shows", "News & Popular", "My List", "Browse by Language"]
}
