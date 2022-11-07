import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DogsService } from '@data-access/dogs/dogs.service';
import { Subscription } from 'rxjs';

interface DogsFiltersFormValues {
  breed: string;
}

@Component({
  selector: 'dogs-app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsListComponent implements OnInit, OnDestroy {
  breedList!: string[];
  filtersForm: FormGroup = new FormGroup({});
  imagesUrlList: string[] = [];
  fetchImagesCount: number = 24;
  hasMoreImages: boolean = false;

  get filteredBreedList(): string[] {
    const breedFilterValue = this.filtersForm.get('breed')?.value;

    if (!breedFilterValue || !this.breedList.length) {
      return this.breedList;
    }

    return this.breedList.filter((breed) =>
      breed.toString().toLowerCase().includes(breedFilterValue.toLowerCase())
    );
  }

  get breedFilterValue(): string {
    return this.filtersForm.get('breed')?.value;
  }

  private readonly subcription: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dogsService: DogsService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createFiltersForm();
    this.dogsService
      .getBreedsList()
      .subscribe((breedList) => (this.breedList = Object.keys(breedList)));

    this.subcription.add(
      this.filtersForm.valueChanges.subscribe((filterValues) =>
        this.onFiltersValuesChanges(filterValues)
      )
    );
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onClearBreedFilter(): void {
    this.filtersForm.get('breed')?.setValue('');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.hasMoreImages) {
      return;
    }

    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (pos === max) {
      this.fetchBreedImages(this.breedFilterValue, false);
    }
  }

  private onFiltersValuesChanges(filterValues: DogsFiltersFormValues): void {
    this.fetchBreedImages(filterValues.breed, true);
  }

  private createFiltersForm(): void {
    this.filtersForm = this.formBuilder.group({
      breed: '',
    });
  }

  private fetchBreedImages(breed: string, isNewBreed: boolean): void {
    if (!breed || !breed.length) {
      this.imagesUrlList = [];
      return;
    }

    if (!this.breedList.some((_breed) => _breed === breed)) {
      return;
    }

    this.dogsService
      .getBreedImagesRandomList(breed, this.fetchImagesCount)
      .subscribe((imagesUrlList) => {
        this.hasMoreImages = imagesUrlList.length === this.fetchImagesCount;
        if (isNewBreed) {
          this.imagesUrlList = imagesUrlList;
        } else {
          this.imagesUrlList = [...this.imagesUrlList, ...imagesUrlList];
        }
        this.changeDetectorRef.markForCheck();
      });
  }
}
