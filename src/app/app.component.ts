import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { Option } from './select/select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'custom-select';

  mySelect: FormControl = new FormControl('');
  myForm: FormGroup = new FormGroup({
    mySelect: this.mySelect,
  });

  selectOptions: Option[] = [
    {
      value: 'test',
      label: 'option',
    },
    {
      value: 'test1',
      label: 'option1',
    },
    {
      value: 'test2',
      label: 'option2',
    },
    {
      value: 'test3',
      label: 'option3',
    },
    {
      value: 'test4',
      label: 'option4',
    },
    {
      value: 'test5',
      label: 'option5',
    },
    {
      value: 'test6',
      label: 'option6',
    },
    {
      value: 'test7',
      label: 'option7',
    },
  ];
}
