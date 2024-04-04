import {
  AfterViewInit,
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  showFiller = false;

  @ViewChild('drawer', { static: true }) drawer: any;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.drawer) {
      this.drawer.toggle();
      this.cdr.detectChanges();
    }

    // this.observer
    //   .observe(['(max-width: 800px)'])
    //   .pipe(delay(1))
    //   .subscribe((res) => {
    //     if (res.matches) {
    //       this.sidenav.mode = 'over';
    //       this.sidenav.close();
    //     } else {
    //       this.sidenav.mode = 'side';
    //       this.sidenav.open();
    //     }
    //   });

    // this.router.events
    //   .pipe(filter((e) => e instanceof NavigationEnd))
    //   .subscribe(() => {
    //     if (this.sidenav.mode === 'over') {
    //       this.sidenav.close();
    //     }
    //   });
  }
}
