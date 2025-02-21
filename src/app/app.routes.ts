import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateFeatureComponent } from './create-feature/create-feature.component';
import { MainComponent } from './main/main.component';
import { EditProductComponent } from './edit-product/edit-product.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'create-feature', component: CreateFeatureComponent },
    { path: 'edit-product/:id', component: EditProductComponent }

];