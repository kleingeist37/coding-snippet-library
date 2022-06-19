<p *ngFor="let msg of errorCheck()">{{msg}}</p>

export class EditorMessagesComponent implements OnInit {
  @Input() control?: AbstractControl | null;
  @Input() controlName?: string;

  private errorMessages: {[key: string]: {[key: string]: string}} = {
    firstName: {
      required: 'Vorname muss angegeben werden!',
      minlength: 'Muss mindestens 2 Zeichen lang sein!'
    },
    lastName: {
      required: 'Nachname muss angegeben werden!',
      forbiddenName: 'Verbotener Name',
      minlength: 'Muss mindestens 2 Zeichen lang sein!'
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  errorCheck(): string[] {

    if(!this.control || !this.control.errors || !this.control.dirty)
     return [];
    
    type msgKeys = keyof EditorMessagesComponent['errorMessages'];
    const messages = this.errorMessages[this.controlName as keyof msgKeys];

    if(!messages)
      return [];    

    return Object.keys(this.control.errors).map(err => messages[err]);

  }

}
