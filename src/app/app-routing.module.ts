import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=>import('../app/home/home.module').then(m=>m.HomeModule)
  },
  {
    path: 'crud',
    loadChildren: ()=>import('../app/crud/crud.module').then(m=>m.CrudModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
