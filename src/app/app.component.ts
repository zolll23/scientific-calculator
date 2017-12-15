import { Component } from '@angular/core';
import { Formula } from "./model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

	formula = new Formula('0');

	title = 'Scientific Calculator';

	getFormula() {
		return this.formula.get();
	}

	clear():any {
		return this.formula.clear();
	}

	setRadians():boolean {
		let switcher=!this.getRadians();
		console.log('setRadians:'+switcher);
		return this.formula.setRadians(switcher);
	}

	getRadians():boolean {
		return this.formula.radians;
	}

	getOperand():string {
		return this.formula.operation;
	}

	resetOperand() {
		this.formula.operation='';
		console.log('resetOperand');
	}

	singleton(operand:string,data:any):number {
		return this.formula.singleton(operand,data);
	}

	setOperation(operand:string):string {
		return this.formula.setOperation(operand);
	}

	addSymbol(value:string,start:boolean=false):any {
		console.log(start);
		this.formula.addValue(value,start);
	}

	calculate():string {
		let value=this.formula.calculate().toString();
		this.resetOperand();
		return value;
	}
}
