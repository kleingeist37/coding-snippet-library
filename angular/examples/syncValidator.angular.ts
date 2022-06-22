export class CustomValidators {

 public static isForbiddenName(control?: AbstractControl) : ValidationErrors |null {
    const forbiddenNamesList: string[] = [
      'uglyName'
    ];
    
    if(!control ||!control.value ||!control.dirty)
      return null;
    
    return forbiddenNamesList.some(x => x.toLowerCase() == control.value.toLowerCase()) ? {isForbiddenName : { valid : false}} : null;
  }
}
