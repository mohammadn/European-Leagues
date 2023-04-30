import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

export type SortColumn = string;
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  standalone: true,
  selector: 'th[sortable]',
})
export class SortHeaderDirective {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.desc') get desc() {
    return this.direction === 'desc';
  }
  @HostBinding('class.asc') get asc() {
    return this.direction === 'asc';
  }
  @HostBinding('role') role = 'button';

  @HostListener('click') rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
