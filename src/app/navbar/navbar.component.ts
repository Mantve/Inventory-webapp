import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ItemResponseDto } from '../models/response/itemResponseDto.model';
import { ItemService } from '../services/item.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items$!: Observable<ItemResponseDto[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private _itemService: ItemService
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.items$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.length > 0)
          return this._itemService.search(term);
        else
          return of([]);
      }),
    );
  }

}
