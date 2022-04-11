import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from 'src/app/loader-state';
import { LoaderService } from 'src/app/service/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.loading = state.show;
      });
  }
}