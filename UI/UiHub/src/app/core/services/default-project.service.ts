import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProject } from '../shared-models/ProjectModels';

@Injectable({
  providedIn: 'root'
})
export class DefaultProjectService {

  private dropdownDataSubject = new BehaviorSubject<string>(this.getDefaultProjectId());
  dropdownData$ = this.dropdownDataSubject.asObservable();
  updateDropdownData(data: string) {
    this.dropdownDataSubject.next(data);
  }

  setDefaultProjectId(id: string) {
    localStorage.setItem("DefaultProjectId", id);
  }

  getDefaultProjectId(): string {
    return localStorage.getItem("DefaultProjectId") ?? '';
  }
}
