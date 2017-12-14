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
		return toString(this.formula.calculate());
	}
}
