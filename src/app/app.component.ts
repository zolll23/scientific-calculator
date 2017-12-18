import { Component } from '@angular/core';
import {HostListener} from '@angular/core';
import { Formula } from "./model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

	formula = new Formula('0');

	title = 'Scientific Calculator';


	@HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent) {
		let key=event.key.toString();
		let digits=['0','1','2','3','4','5','6','7','8','9','.'];
		if (digits.indexOf(key) != -1) {
			this.addSymbol(key,false);
		}
		if (event.keyCode == 8) {
			this.removeSymbol();
		}
		if (event.keyCode == 13) {
			this.calculate();
		}
		if (event.keyCode == 27) {
			this.clear();
		}
		let operations=['+','-','*','/'];
		if (operations.indexOf(key) != -1) {
			this.setOperation(key);
		}
		if (key == '%') {
			this.singleton('percent',-1);
		}
	}

	addBracket(value:string):void {
		this.formula.addBracket(value);
	}

	getFormula() {
		return this.formula.get();
	}

	clear():any {
		return this.formula.clear();
	}

	setRadians():boolean {
		let switcher=!this.getRadians();
		return this.formula.setRadians(switcher);
	}

	getRadians():boolean {
		return this.formula.radians;
	}

	sumToMemory() {
		this.formula.sumToMemory();
	}

	deductToMemory() {
		this.formula.deductToMemory();
	}

	clearMemory() {
		this.formula.clearMemory();
	}

	readMemory():string {
		return this.formula.readMemory();
	}

	statusMemory():boolean {
		return this.formula.in_memory;
	}

	valueMemory():number {
		return this.formula.memory;
	}

	getOperand():string {
		let o=this.formula.operation;
		if (o == '*') return '&#215;';
		return o;
	}

	resetOperand() {
		this.formula.operation='';
	}

	singleton(operand:string,data:any):number {
		return this.formula.singleton(operand,data);
	}

	setOperation(operand:string):void {
		this.formula.setOperation(operand);
	}

	addSymbol(value:string,start:boolean=false):void {
		this.formula.addValue(value,start);
	}

	removeSymbol():void {
		this.formula.removeSymbol();
	}

	calculate():string {
		if (this.formula.is_operand == true || this.formula.stack.length<2) return;
		this.formula.stack.push(this.formula.formula);
		let value=this.formula.calculate().toString();
		this.resetOperand();
		return value;
	}
}
