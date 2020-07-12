import { Component, OnInit } from '@angular/core';

import { PdfViewerService } from './../services/pdf-viewer.service';
import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  pdfURL = 'https://assets.biomarking.com/images/sample.pdf';
  pdfName = 'sample.pdf';

  constructor(
    private pdfViewerSvc: PdfViewerService,
    private usersSvc: UsersService,
    private router: Router
  ) {}

  ngOnInit() {}

  viewPDF() {
    this.pdfViewerSvc.download(this.pdfURL, this.pdfName);
  }

  logout() {
    this.usersSvc.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
