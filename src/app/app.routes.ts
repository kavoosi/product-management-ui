import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateFeatureComponent } from './create-feature/create-feature.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'create-feature', component: CreateFeatureComponent },

];