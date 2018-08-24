import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {

  private shouldShowSpinner: boolean = false;

  constructor() { }

  public showSpinner() : boolean {
    return this.shouldShowSpinner;
  }

  public show(): void {
    this.shouldShowSpinner = true;
  }

  public hide(): void {
    this.shouldShowSpinner = false;
  }
}
