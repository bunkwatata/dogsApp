import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response.model';
import { Breed } from '@shared/models/breed.model';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class DogsService {
  constructor(private readonly _httpClient: HttpClient) {}

  getBreedsList(): Observable<Breed> {
    return this._httpClient
      .get<ApiResponse<Breed>>(`${environment.apiUrl}/breeds/list/all`)
      .pipe(map((apiResponse) => apiResponse.message));
  }

  getBreedImagesList(breed: string): Observable<string[]> {
    return this._httpClient
      .get<ApiResponse<string[]>>(`${environment.apiUrl}/breed/${breed}/images`)
      .pipe(map((apiResponse) => apiResponse.message));
  }

  getBreedImagesRandomList(
    breed: string,
    count: number = 12
  ): Observable<string[]> {
    return this._httpClient
      .get<ApiResponse<string[]>>(
        `${environment.apiUrl}/breed/${breed}/images/random/${count}`
      )
      .pipe(map((apiResponse) => apiResponse.message));
  }
}
