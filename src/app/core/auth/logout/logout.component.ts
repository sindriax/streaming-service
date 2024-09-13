import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  private timeoutId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => {
      this.router.navigate(['/home']);
    }, 30000); //30000 milliseconds = 30 seconds
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
