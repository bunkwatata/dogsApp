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
import { Breed } from '@shared/models/breed.model';
import { Subscription } from 'rxjs';

interface DogsFiltersFormValues {
  breed: string;
  subBreed: string;
}

@Component({
  selector: 'dogs-app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsListComponent implements OnInit, OnDestroy {
  breeds!: Breed;
  breedList!: string[];

  filtersForm: FormGroup = new FormGroup({});
  imagesUrlList: string[] = [];
  fetchImagesCount: number = 24;
  hasMoreImages: boolean = false;

  get breed(): string {
    return this.filtersForm.get('breed')?.value;
  }

  get subBreed(): string {
    return this.filtersForm.get('subBreed')?.value;
  }

  get filteredBreedList(): string[] {
    if (!this.breed || !this.breedList.length) {
      return this.breedList;
    }
    return this.breedList.filter((breed) =>
      breed.toString().toLowerCase().includes(this.breed.toLowerCase())
    );
  }

  get subBreedList(): string[] | null {
    if (!this.breeds || !this.breed) {
      return null;
    }
    return this.breeds[this.breed];
  }

  private readonly subcription: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dogsService: DogsService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createFiltersForm();
    this.dogsService.getBreedsList().subscribe((breedList) => {
      this.breeds = breedList;
      this.breedList = Object.keys(breedList);
    });

    this.subcription.add(
      this.filtersForm.valueChanges.subscribe(() => this.fetchImages())
    );
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onClearFromControlFilter(controlName: string): void {
    this.filtersForm.get(controlName)?.setValue('');
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
      this.fetchImages(true);
    }
  }

  private fetchImages(concatResults: boolean = false): void {
    if (!this.breed || !this.breed.length) {
      this.imagesUrlList = [];
      return;
    }

    if (!this.breedList.some((_breed) => _breed === this.breed)) {
      return;
    }

    if (
      !this.breeds[this.breed].some((_subBreed) => _subBreed === this.subBreed)
    ) {
      this.fetchBreedImages(this.breed, concatResults);
      return;
    }
    this.fetchSubBreedImages(this.breed, this.subBreed, concatResults);
  }

  private createFiltersForm(): void {
    this.filtersForm = this.formBuilder.group({
      breed: '',
      subBreed: '',
    });
  }

  private fetchBreedImages(breed: string, concatResults: boolean): void {
    this.dogsService
      .getBreedImagesRandomList(breed, this.fetchImagesCount)
      .subscribe((imagesUrlList) => {
        this.setImages(imagesUrlList, concatResults);
      });
  }

  private fetchSubBreedImages(
    breed: string,
    subBreed: string,
    concatResults: boolean
  ): void {
    this.dogsService
      .getSubBreedImagesRandomList(breed, subBreed, this.fetchImagesCount)
      .subscribe((imagesUrlList) => {
        this.setImages(imagesUrlList, concatResults);
      });
  }

  private setImages(imagesUrlList: string[], concatResults: boolean): void {
    this.hasMoreImages = imagesUrlList.length === this.fetchImagesCount;
    if (concatResults) {
      this.imagesUrlList = [...this.imagesUrlList, ...imagesUrlList];
    } else {
      this.imagesUrlList = imagesUrlList;
    }
    this.changeDetectorRef.markForCheck();
  }
}
