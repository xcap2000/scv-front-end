import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  constructor(
    private spinnerService: SpinnerService) { }

  public showSpinner(): boolean {
    return this.spinnerService.showSpinner();
  }

}
