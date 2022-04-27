import { Component, OnInit } from '@angular/core';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { Subscription } from 'rxjs';
import { IListing } from '../listing';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  listings: IListing[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  constructor(private apiHttpService: ApiHttpService) { };

  ngOnInit(): void {
    this.sub = this.apiHttpService.getMurals().subscribe({
      next: listings => this.listings = listings,
      error: err => this.errorMessage = err
    });
  }

}
