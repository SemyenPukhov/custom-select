import {
  Component,
  OnInit,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export interface Option {
  label: string;
  value: string;
}
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() options: Option[];
  @Input() defaultPlaceholder: string;

  selectedOption: Option;

  get placeholder(): string {
    return this.selectedOption
      ? this.selectedOption.label
      : this.defaultPlaceholder;
  }

  get isOpen(): boolean {
    return this.open;
  }

  open = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

  constructor(private eRef: ElementRef) {}

  ngOnInit() {}

  toggleOpen(): void {
    this.open = !this.open;
  }

  optionSelect(option: Option) {
    this.writeValue(option.value);
    this.onTouched();
    this.open = false;
  }

  makeSelectedFirst(): void {
    const index = this.options.findIndex(
      (option: Option) =>
        this.selectedOption && option.value === this.selectedOption.value
    );
    if (index === -1) {
      return;
    }
    this.options = [
      this.options[index],
      ...this.options.slice(0, index),
      ...this.options.slice(index + 1),
    ];
  }

  writeValue(value) {
    if (!value || typeof value !== 'string') {
      return;
    }
    const selectedElement = this.options.find(
      (option: Option) => option.value === value
    );
    if (selectedElement) {
      this.selectedOption = selectedElement;
      this.onChange(this.selectedOption.value);
      this.makeSelectedFirst();
    }
  }

  onChange: any = () => {};

  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
