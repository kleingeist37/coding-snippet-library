<form 
 [formGroup]="characterForm" 
 class="gl-flex-bar gl-flex-column"
 (ngSubmit)="submit()">
    <mat-form-field appearance="fill" class="charform-item">
        <mat-label>First Name</mat-label>
        <input matInput formControlName="firstName">
        <mat-error>
            <std-editor-messages controlName="firstName" [control]="characterForm.get('firstName')"></std-editor-messages>
        </mat-error>
    </mat-form-field>
    <mat-form-field appearance="fill" class="charform-item">
        <mat-label>Last Name</mat-label>
        <input matInput formControlName="lastName">
        <mat-error>
            <std-editor-messages controlName="lastName" [control]="characterForm.get('lastName')"></std-editor-messages>
        </mat-error>
    </mat-form-field>
    <button 
    mat-raised-button 
    color="primary" 
    type="submit" 
    class="charform-item"
    [disabled]="characterForm.invalid">Submit</button>
</form>


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
    const person: Person = {firstName: this.characterForm.get('firstName')?.value, lastName: this.characterForm.get('lastName')?.value};
    const succ = this.characterService.addCharacter(person);
    const msg = succ ? this.successText : this.failureText ;  
    this.openSnackbar(msg, this.action);
    if(succ)
      this.characterForm.reset();
  } 

  private generateForm(){
    this.characterForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  private openSnackbar(msg: string, action: string){
    this.snackBar.open(msg, action);
  }
}
