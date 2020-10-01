import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileViewService {
  public isMobileSubject = new BehaviorSubject<boolean>(false);
  private isMobile = false;
  
  constructor() { }

  public setMobileView(): void {
    this.isMobile = true;
    this.isMobileSubject.next(true);
  }

  public setDesktopView(): void {
    this.isMobile = false;
    this.isMobileSubject.next(false);
  }

  public getIsMobileSubject(): BehaviorSubject<boolean> {
    return this.isMobileSubject;
  }

}
