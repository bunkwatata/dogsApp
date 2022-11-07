import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DogsService } from '@data-access/dogs/dogs.service';
import { Subscription } from 'rxjs';

interface DogsFiltersFormValues {
  breed: string;
}

@Component({
  selector: 'dogs-app-dogs-list',
  templateUrl: './dogs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsListComponent implements OnInit, OnDestroy {
  breedList!: string[];
  filtersForm: FormGroup = new FormGroup({});
  imagesUrlList: string[] = [];

  get filteredBreedList(): string[] {
    const breedFilterValue = this.filtersForm.get('breed')?.value;

    if (!breedFilterValue || !this.breedList.length) {
      return this.breedList;
    }

    return this.breedList.filter((breed) =>
      breed.toString().toLowerCase().includes(breedFilterValue.toLowerCase())
    );
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

  private onFiltersValuesChanges(filterValues: DogsFiltersFormValues): void {
    if (
      filterValues.breed &&
      this.breedList.some((breed) => filterValues.breed === breed)
    ) {
      this.dogsService
        .getBreedImagesList(filterValues.breed)
        .subscribe((imagesUrlList) => {
          this.imagesUrlList = imagesUrlList;
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  private createFiltersForm(): void {
    this.filtersForm = this.formBuilder.group({
      breed: '',
    });
  }
}
