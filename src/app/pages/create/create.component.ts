import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports : [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  txtStyle:any;
  txtAlign:any;
  formGroup:FormGroup;

  colors:any[] = [
    "#000000",
    "#ffffff",
    "#E53636",
    "#66E106",
    "#36E5E5",
    "#3936E5",
    "#3C0B0B"
  ];
  tabs = ['font', 'image']
  activeTab = 'font'

  fontColor:any = this.colors[0]
  borderColor:any = this.colors[0]
  bgColor:any = this.colors[0]

  theme:any

  constructor(private fb : FormBuilder, private common : CommonService){

    this.formGroup = this.fb.group({
      text : new FormControl('Sample Quote'),
      bold : new FormControl(false),
      italic : new FormControl(false),
      underline : new FormControl(false),
      fontAlign : ['left'],
      horizontal : ['left'],
      vertical : ['top'],
      colorType : new FormControl('fontColor'),
      fontColor : new FormControl('#000000'),
      borderColor : new FormControl('#000000'),
      bgColor : new FormControl('#cccccc'),
      fontSize : new FormControl(12),
      fontFamily : new FormControl('Inria Sans'),
      borderSize : new FormControl(0)
    })
    
    this.common.getTheme.subscribe(th => {
      this.theme = th;
    })
  }

  selectColor(color:any){
    if(color?.value) color = color.value;
    this.fontColor = color;
    this.formGroup.controls[this.formGroup.value?.colorType].setValue(color);
  }
}
