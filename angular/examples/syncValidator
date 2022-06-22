export class CustomValidators {

  private static forbiddenNamesList : string[] = [
    'uglyName'
  ]
  public static isForbiddenName(control?: AbstractControl) : ValidationErrors |null {
    if(!control ||!control.value ||!control.dirty)
      return null;
    
    return {isForbiddenName : { valid : this.forbiddenNamesList.some(x => x.toLowerCase() == control.value)}}
  }
}
