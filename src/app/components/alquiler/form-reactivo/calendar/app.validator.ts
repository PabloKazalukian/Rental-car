import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { DatePipe } from '@angular/common';
import { request } from 'src/app/core/models/request.interface';

export class ownValidation {
  static dateCorrect(control: AbstractControl): ValidationErrors| null {

    const start = new DatePipe('en').transform(control.value.start, 'dd-MM-yyyy');
    const end = new DatePipe('en').transform(control.value.end, 'dd-MM-yyyy');
    if (start !==null && end){
      if( control.value.total.filter((res:request)=>{
        return containDateDouble(start,end,res.initial_date,res.final_date)
      }).length <1 ) return null;
      else  return { dateCorrect: true }
    }
    else
      return { dateCorrect: true }
  }

}
export const isDateHigher=(finalDate:string,bigger:boolean,jsFinalDate:string,includ:boolean):boolean=>{


    if (finalDate !== undefined) {
      const fdD = parseInt( finalDate[0] + finalDate[1],10);
      const fdM = parseInt( finalDate[3] + (finalDate[4] !== "-" ? finalDate[4] : ""),10);
      const fdA = parseInt( finalDate[finalDate.length - 4] + finalDate[finalDate.length - 3] + finalDate[finalDate.length - 2] + finalDate[finalDate.length - 1],10);

      const arr = jsFinalDate.split('-');
      const jsfdD = parseInt(arr[0],10);
      const jsfdM = parseInt(arr[1],10);
      const jsfdA = parseInt(arr[2],10);
      if (fdA > jsfdA) {//2021 2022
        return  bigger?true:false
      }
      if (fdM > jsfdM && fdA === jsfdA) {//02-2022  < 03-2022
        return  bigger?true:false
      }
      if ( fdD > jsfdD && fdM === jsfdM && fdA === jsfdA) {//21-01-2022 > 18-02-2022
        return  bigger?true:false
      }
      if(fdD === jsfdD && fdM === jsfdM && fdA === jsfdA){
        return  includ?true:false
      }
        return  bigger?false:true

    }else{
      return  bigger?false:true

    }
  }

export const containDateDouble = (start:string | null ,end:string | null,compareStart:string,compareEnd:string):boolean =>{

  if(start !== null && end !== null){
    if(isDateHigher(start,false,compareStart,true) && isDateHigher(end,true,compareEnd,true)) {
      return true
    }
  }
  return false
}
