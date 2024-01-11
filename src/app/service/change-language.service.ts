import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.setDefaultLang('en');
  }

  translate(key: string): string {
    return this.translateService.translations(key);
  }
}
