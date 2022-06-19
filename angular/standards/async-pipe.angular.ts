//***************
//Template-File
//***************
<ng-container *ngIf="persons$ ; else loading ">
    <h3>Aktuell eingetragene Personen</h3>
    <ul>
        <li *ngFor="let person of persons$ | async">{{person.lastName}}, {{person.firstName}}</li>
    </ul>
</ng-container>

<ng-template #loading>
    <mat-spinner></mat-spinner>
</ng-template>

//***************
//Coding, now with REFRESH
//***************
export class CharacterListComponent implements OnDestroy{
  persons$: Observable<Person[]>;
  refreshSub: Subscription;

  constructor(private characterService: CharacterService) {
    this.persons$ = this.characterService.characterTest();
    this.refreshSub = this.characterService.refreshData.subscribe(() => this.refreshData());
  }
  ngOnDestroy(): void {
    this.refreshSub.unsubscribe();
  }

  private refreshData(){
    this.persons$ = this.characterService.characterTest();
  }
  
}


//***************
//Service ... a bit smelly. need to improve
//***************
export class CharacterService implements OnDestroy{

  private api : string = "https://test-n4-76312-default-rtdb.europe-west1.firebasedatabase.app/";
  private charactersCache: Person[] = [];

  @Output() refreshData = new EventEmitter();
  private subscription!: Subscription;

  constructor(private http: HttpClient) { 
    this.fetchCharacters();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getCharacters() : void{
    this.fetchCharacters();
  }

  public addCharacter(character: Person) : boolean {
    //NEEDS TO BE ASYNC VALIDATOR IN FORM, THEN THIS CAN BE DROPPED
    if(this.charactersCache != null){
      if(this.charactersCache.some(x => x.firstName === character.firstName && x.lastName === character.lastName))
      return false;
    }else {
      this.charactersCache 
    }
    this.charactersCache.push(character);
    this.saveCharacters();
    return true;
  }

  private fetchCharacters(){   
    //Besseres Errorhandling einbauen
    this.subscription = this.http.get<Person[]>(`${this.api}characters.json`).subscribe((data : Person[]) => {
      if(data){
        this.charactersCache = data;
        this.refreshData.emit();
      }
    });
  }

  private saveCharacters(){
    this.http.put(`${this.api}characters.json`, this.charactersCache, {responseType: 'text'}).subscribe(response => this.fetchCharacters());
  }

  public characterTest() : Observable<Person[]> {
    return this.http.get<Person[]>(`${this.api}characters.json`);
  }
}
