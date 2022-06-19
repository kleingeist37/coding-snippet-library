export class CharacterService implements OnDestroy{

  private api : string = "https://test-n4-76312-default-rtdb.europe-west1.firebasedatabase.app/";
  private characters: Person[] = [];

  public characterList: Subject<Person[]> = new Subject<Person[]>();


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
    if(this.characters.some(x => x.firstName === character.firstName && x.lastName === character.lastName))
      return false;
      
    this.characters.push(character);
    this.saveCharacters();
    return true;
  }

  private fetchCharacters(){
    this.subscription = this.http.get<Person[]>(`${this.api}characters.json`).subscribe((data : Person[]) => {
      this.characters = data;
      this.characterList.next(this.characters.slice());
      console.log(data);
    });
  }

  private saveCharacters(){
    this.http.put(`${this.api}characters.json`, this.characters, {responseType: 'text'}).subscribe(response => this.fetchCharacters());
  }
}
