import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiService, CreateUserDto } from 'src/app/core/api.service';

@Component({
  templateUrl: './creat-user.component.html',
  styleUrls: ['./creat-user.component.css']
})
export class CreatUserComponent implements OnInit {
  validCpf = true;
  validCont = true;
  user: CreateUserDto = new CreateUserDto();
  time: any;
  value = 0;

  constructor(
    private _dialogRef: MatDialogRef<CreatUserComponent>,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  keyPressContat(){
    if((this.user.phone.length == 0) && (this.user.skype.length == 0) && (this.user.email.length == 0))
      this.validCont = false;
    else
      this.validCont = true;
  }


  save():void{ 
    this.keyPressContat();
    if(this.validCpf == true && this.validCont == true){
    this.apiService.saveUser(this.user, (data)=>{
        location.reload();
    });
    }
  }
  keyPressSearch(): void {
    this.validCpf = true;
    clearTimeout(this.time);
    var time = 3000;
    this.value = 0;
    this.startProgressbar();
  }

startProgressbar(): void {
  this.time = setTimeout(() => {
      if (this.value < 100) {
          this.value++;
          console.log(this.value);
          this.startProgressbar();
      }
      else if (this.value == 100) {
        this.validCpf = this.TestaCPF(this.user.cpf);
      }
  }, 5);

}

TestaCPF(sCPF: string) {
  var strCPF = sCPF+"";
  var Soma;
  var Resto;
  Soma = 0;
if (strCPF == "00000000000") return false;
   
for (var i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
Resto = (Soma * 10) % 11;
 
  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
 
Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;
 
  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}




}
