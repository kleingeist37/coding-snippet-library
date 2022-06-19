//***************
//Template-File
//***************
<ng-container *ngIf="persons$ | async as persons; else loading ">
    <h3>Aktuell eingetragene Personen</h3>
    <ul>
        <li *ngFor="let person of persons">{{person.lastName}}, {{person.firstName}}</li>
    </ul>
</ng-container>

<ng-template #loading>
    <mat-spinner></mat-spinner>
</ng-template>

//***************
//Coding
//***************
export class CharacterListComponent {
  persons$: Observable<Person[]>;
  sub!: Subscription;
  constructor(private characterService: CharacterService) {
    this.persons$ = this.characterService.characterTest();
  }

}

//***************
//Service
//***************
  public characterTest() : Observable<Person[]> {
    return this.http.get<Person[]>(`${this.api}characters.json`);
  }
