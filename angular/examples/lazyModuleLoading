//*******************
//MAIN ROUTING
//*******************
const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: "character", loadChildren: () => import('./modules/character-creator/character-creator.module').then(m => m.CharacterCreatorModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//*******************
//ng g m name --routing //IMPORTANT!
//*******************

//*******************
//CHILD ROUTING
//*******************
const routes: Routes = [
  {path: '', component: CharacterListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterCreatorRoutingModule { }
