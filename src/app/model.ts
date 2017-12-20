export class Formula {
    formula:string;
    current_number:number = 0;
    prev_number:number = 0;
    stack:string[] = [];
    start:boolean = false; 
    dotted:boolean = false; // input number having dot
    is_operand:boolean = false;
    radians:boolean = true;
    operation:string = '';
    memory:number = 0;
    in_memory:boolean = false;
    bracket:boolean = false;
    secondScreen:boolean = false;

    constructor(formula:string='') {
        this.formula=formula;
    }

    get() {
        return this.formula;
    }

    parse(value:string):number {
        return parseFloat(value);
    }

    getCurrentNumber() {
        return this.parse(this.formula);
    }

    setRadians(switcher:boolean):boolean {
        this.radians=switcher;
        return this.radians;
    }


    clear():string {
        this.formula = '0';

        this.dotted = false;
        this.is_operand = false;
        this.operation = '';
        this.start = false;
        this.stack = [];
        this.bracket = false;
        return this.formula;
    }

    clearMemory() {
        this.memory = 0;
        this.in_memory = false;
    }

    sumToMemory() {
        let value=this.getCurrentNumber();
        this.memory += value;
        this.in_memory = true;
        this.start = true;
    }

    deductToMemory() {
        let value=this.getCurrentNumber();
        this.memory -= value;
        this.in_memory = true;
        this.start = true;
    }

    readMemory():string {
        this.formula=this.memory.toString();
        return this.formula;
    }

    addBracket(value:string):void {
        // brackets can be set only if we have not set them before and we set operand (if we set brackets first - it will not make sense)
        if (value == '(' && this.bracket == false && this.is_operand == true) {
            this.stack.push(value);
            this.bracket = true;
            this.is_operand = false;
        }
        if (value == ')' && this.bracket == true && this.is_operand != true) {
            this.bracket = false;
            this.stack.push(this.formula);
            this.stack.push(')');
            this.is_operand = false;
            this.start = true;
            this.formula=eval(this.stack.join('')).toString();
            this.stack=[this.formula];
        }
    }

    setOperation(operand:string):void {
        this.operation=operand;
        // If operator already set - nothing doing
        if (this.is_operand) {
            this.operation = operand;
            return null;
        }
        this.is_operand = true;
        this.stack.push(this.formula);
        this.stack.push(this.operation);
        this.start=true;
    }

    calculate():number {
        let result:number;
        if (this.stack.length<3) return;
        this.is_operand = false;
        this.current_number=this.parse(this.stack.pop());
        this.operation=this.stack.pop();
        this.prev_number=this.parse(this.stack.pop());
        if (!this.prev_number) return 0;

        switch (this.operation) {
            case '+':
                result=this.prev_number+this.current_number;
                this.show(result);
                break;
            case '-':
                result=this.prev_number-this.current_number;
                this.show(result);
                break;
            case '*':
                result=this.prev_number*this.current_number;
                this.show(result);
                break;
            case '/':
                result=this.prev_number/this.current_number;
                this.show(result);
                break;
            case 'sqrt':
                result=Math.pow(this.prev_number,1/this.current_number);
                this.show(result);
                break;
            case 'pow':
                result=Math.pow(this.prev_number,this.current_number);
                this.show(result);
                break;
            case 'yx':
                result = Math.pow(this.current_number, this.prev_number);
                this.show(result);
                break;
            case 'log':
                result = Math.log(this.prev_number) / Math.log(this.current_number);
                break;
        }

        this.current_number=this.parse(this.formula);

        this.start=true;
        return result;
    }


    addValue(value:string,start:boolean):string {
        if (start || this.start || (this.dotted == false && this.formula == '0' && value != '.')) {
            this.formula='';
        }
        this.start=start;
        if (value=='.') {
            if (this.dotted==true) {
                return this.formula;    
            }
            this.dotted=true;
        }
        this.formula+=value;
        this.is_operand = false;
        return this.formula;
    }

    removeSymbol():void {
        let len=this.formula.length;
        let last_symbol=this.formula.substring(len - 1,len);
        if (last_symbol == '.') {
            this.dotted=false;
        }
        this.formula=this.formula.slice(0,-1);
    }

    singleton(operand:string,data:any):number {
        let result:number=0;
        let rad:number=0;
        let grad=180/Math.PI;
        this.current_number=parseFloat(this.formula);
        
        switch (operand) {
            case 'invert':
                result=this.current_number*data;
            break;
            case 'sqrt':
                result=Math.sqrt(this.current_number);
            break;
            case 'sqrt3':
                result=Math.pow(this.current_number,1/3);
            break;
            case 'ln':
                result=Math.log(this.current_number);
            break;
            case 'lg':
                result=Math.log(this.current_number)/Math.log(data);
            break;
            case 'pow_base':
                let base=data=='e' ? Math.E : data;
                result=Math.pow(base,this.current_number);
            break;
            case 'pow':
                let step=parseFloat(data);
                result=Math.pow(this.current_number,step);
            break;
            case 'div':
                result=1/this.current_number;
            break;
            case 'sin':
                rad=(this.radians) ? this.current_number : this.current_number/grad;
                result=Math.sin(rad);
            break;
            case 'cos':
                rad=(this.radians) ? this.current_number : this.current_number/grad;
                result=Math.cos(rad);
            break;
            case 'tan':
                rad=(this.radians) ? this.current_number : this.current_number/grad;
                result=Math.tan(rad);
            break;
            case 'sinh':
                rad=(this.radians) ? this.current_number : this.current_number/grad;
                result=(Math.exp(rad)-Math.exp(-rad))/2;
            break;
            case 'cosh':
                rad=(this.radians) ? this.current_number : this.current_number/grad;
                result=(Math.exp(rad)+Math.exp(-rad))/2;
            break;
            case 'tanh':
                rad=(this.radians) ? this.current_number : this.current_number/grad;
                result=(Math.exp(rad)-Math.exp(-rad))/(Math.exp(rad)+Math.exp(-rad));
            break;
            case 'asin':
                result=Math.asin(this.current_number);
                result=(this.radians) ? result : result*grad;
            break;
            case 'acos':
                result=Math.acos(this.current_number);
                result=(this.radians) ? result : result*grad;
            break;
            case 'atan':
                result=Math.atan(this.current_number);
                result=(this.radians) ? result : result*grad;
            break;
            case 'asinh':
                result=Math.asinh(this.current_number);
                result=(this.radians) ? result : result*grad;
            break;
            case 'acosh':
                result=Math.acosh(this.current_number);
                result=(this.radians) ? result : result*grad;
            break;
            case 'atanh':
                result=Math.atanh(this.current_number);
                result=(this.radians) ? result : result*grad;
            break;
            case 'rand':
                result=Math.random();
            break;
            case 'factorial':
                let n=Math.ceil(this.current_number);
                result=1;
                for (let i=1;i<=n;i++) {
                    result*=i;
                }
            break;
            case 'percent':
                result=this.current_number/100;
            break;
            case 'ee':
                result=this.current_number.toExponential().toString();
            break;
        }

        this.start=true;
        this.show(result);
        return result;
    }

    show(value:number):string {
        this.formula=value.toString();
        return this.formula;
    }
}