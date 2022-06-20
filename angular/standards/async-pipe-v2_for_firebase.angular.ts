//INKLUSIVE REFRESH

//***********
//Template 
//***********
<std-editor></std-editor>
<mat-divider></mat-divider>

<ng-container *ngIf="persons$ ; else loading ">
    <h3>Aktuell eingetragene Personen</h3>
    <ul>
        <li *ngFor="let person of persons$ | async keyvalue">{{person.lastName}}, {{person.firstName}} - Email {{person.email}}</li>
    </ul>
</ng-container>

<ng-template #loading>
    <mat-spinner></mat-spinner>
</ng-template>

//***********
//Coding
//***********
export class CharacterListComponent implements OnDestroy{
  persons$: Observable<Person[]>;
  refreshSub: Subscription;

  constructor(private characterService: CharacterService) {
    this.persons$ = this.characterService.getCharacters();
    this.refreshSub = this.characterService.refreshData.subscribe(() => this.refreshData());
  }
  ngOnDestroy(): void {
    this.refreshSub.unsubscribe();
  }

  private refreshData(){
    this.persons$ = this.characterService.getCharacters();
  }  
}

//***********
//Coding FORM
//***********
export class EditorComponent implements OnInit {

  characterForm!: FormGroup;

  private successText : string = "Person erfolgreich eingetragen";
  private failureText : string = "Person war bereits eingtragen. Aktion abgebrochen!";
  private action: string = "Okay!";

  constructor(  private formBuilder: FormBuilder, 
                private characterService: CharacterService,
                private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.generateForm();
  }

  public submit(){
    const person: Person = {
          firstName: this.characterForm.get('firstName')?.value, 
          lastName: this.characterForm.get('lastName')?.value, 
          email: this.characterForm.get('email')?.value};
    this.characterService.addCharacter(person).subscribe(data => {
      const msg = data ? this.successText : this.failureText ; 
      this.openSnackbar(msg, this.action);
      if(data)
        this.characterForm.reset();
    });
  }

  private generateForm(){
    this.characterForm = this.formBuilder.group({      
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]] // this.asyncNameValidator.validate.bind(this) ]
    });
  }

  private openSnackbar(msg: string, action: string){
    this.snackBar.open(msg, action);
  }
}

//***********
//Coding SERVICE
//***********
export class CharacterService {

  private  api : string = "https://test-n4-76312-default-rtdb.europe-west1.firebasedatabase.app/";
  private charactersAPI : string = `${this.api}characters.json`;

  @Output() refreshData = new EventEmitter();
  constructor(private http: HttpClient) {}
  

  public addCharacter(character: Person) : Observable<boolean> {    
    return this.http.post(this.charactersAPI, character)
                    .pipe(
                      map(() => {
                        this.refreshData.emit();
                        return true;
                      }));
  }

  public replaceCharacters(characterList: Person[]) : Observable<boolean>{
    return this.http .put(this.charactersAPI, characterList)
              .pipe(
                map(() => {
                  this.refreshData.emit();
                  return true;
                }));
  }  
  public getCharacters() : Observable<Person[]> {
    return this.http.get(this.charactersAPI).pipe(
      map(data => {
        //weil Firebase immer Random IDs generiert bei POST, was Angular/JS irritiert
        //Deswegen dieses Konstrukt, um die Daten "ordentlich" zu machen. 
        //Rückgabe von GET wird als Objekt interpretiert, daher umwandlung in Array.
        //FirebaseStruktur: { 
        //    { id: {firstName: bla, lastName: bli, email: bloar}
        //    { id2: {firstName: bla, lastName: bli, email: bloar}
        //}
        var entries = Object.entries(data);
        var filteredData: Person[] = [];
        for(let i = 0; i < entries.length; i++){
          filteredData.push({ firstName: entries[i][1].firstName, lastName: entries[i][1].lastName, email: entries[i][1].email});         
        }
        return filteredData;
      })
    );
  }
}
