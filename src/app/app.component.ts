import { Component, HostListener } from '@angular/core';
import { Formula } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Calculator';

  formula = new Formula('0');

  @HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent) {
		let key=event.key.toString();
		let digits=['0','1','2','3','4','5','6','7','8','9','.'];
		if (digits.indexOf(key) != -1) {
			this.addSymbol(key,false);
		}
		if (event.key == 'BackSpace') {
			this.removeSymbol();
		}
		if (event.key == 'Enter') {
			this.calculate();
		}
		if (event.key == 'ESC') {
			this.clear();
		}
		let operations=['+','-','*','/'];
		if (operations.indexOf(key) != -1) {
			this.setOperation(key);
		}
		if (key == '%') {
			this.toOperate('percent',-1);
		}
	}

  getFormula() {
    return this.formula.get();
  }

  secondScreen(): boolean {
    let screen = !this.formula.secondScreen;
    this.formula.secondScreen = screen;
    return screen;
  }

  getScreen(): boolean {
    return this.formula.secondScreen;
  }

  addToMemory() {
    this.formula.addToMemory();
  }

  deductFromMemory() {
    this.formula.deductFromMemory();
  }

  statusMemory(): boolean {
    return this.formula.in_memory;
  }

  value(): number {
    return this.formula.memory;
  }

  getOperand(): string {
    let op = this.formula.operation;
    if(op == '*') return '&#215;';
    return op;
  }

  resetOperand() {
    this.formula.operation='';
  }

  toOperate(operand:string, data:any):number {
    return this.formula.toOperate(operand, data);
  }

  setOperation(operand: string): void {
    this.formula.setOperation(operand);
  }

  addSymbol(value:string, start:boolean=false):void {
    this.formula.addValue(value, start);
  }

  calculate(): string {
    if (this.formula.operand == true || this.formula.stack.length<2) return;
    this.formula.stack.push(this.formula.formula);
    let value = this.formula.calculate().toString();
    this.resetOperand();
    return value;
  }
  
  removeSymbol(): void {
    this.formula.removeSymbol();
  }
  
  clearMemory() {
    this.formula.clearMemory();
  }

  clear() : any {
    return this.formula.clear();
  }

}

