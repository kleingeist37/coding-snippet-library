//LAZY LOADING

import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'form', pathMatch: 'full'},
    {path: 'form', loadChildren: () => import('./modules/form/form.module').then(m => m.FormModule)},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
