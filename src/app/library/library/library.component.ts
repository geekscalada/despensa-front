import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/core/services/ApiAuthService';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  constructor(private authService: ApiAuthService) {}

  async logout(): Promise<void> {
    this.authService.logout();
  }

  ngOnInit() {}
}
