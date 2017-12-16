export class Formula {
    formula:string;
    current_number:number = 0;
    prev_number:number = 0;
    start:boolean = false; 
    dotted:boolean = false; // input number having dot
    is_operand:boolean = false;
    radians:boolean = true;
    operation:string = '';
    prev_formula:string = '';
    memory:number = 0;
    in_memory:boolean = false;

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

    getPrevNumber() {
        return this.parse(this.prev_formula);
    }

    setRadians(switcher:boolean):boolean {
        this.radians=switcher;
        return this.radians;
    }


    clear():string {
        this.formula = '0';
        this.prev_formula = '';
        this.dotted = false;
        this.is_operand = false;
        this.operation = '';
        this.start = false;
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
        console.log(this.memory);
    }

    deductToMemory() {
        let value=this.getCurrentNumber();
        this.memory -= value;
        this.in_memory = true;
        console.log(this.memory);
    }

    readMemory():string {
        this.prev_formula=this.formula;
        this.formula=this.memory.toString();
        return this.formula;
    }

    setOperation(operand:string):string {
        if (this.is_operand) return this.operation;
        this.is_operand = true;
        this.calculate();
        this.operation=operand;
        this.prev_formula=this.formula;
        this.start=true;

        console.log(this.prev_formula+':'+operand);
        return this.operation;
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
        return this.formula;
    }

    singleton(operand:string,data:any):number {
        let result:number=0;
        let rad:number=0;
        let grad=180/Math.PI;
        this.current_number=parseFloat(this.formula);
        console.log(operand);
        console.log(this.current_number);
        
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
                result=Math.log(this.current_number)/Math.log(10);
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
        }
        this.start=true;
        this.show(result);
        return result;
    }

    calculate():number {
        let result:number;
        this.is_operand = false;
        if (this.prev_formula=='') return 0;
        this.prev_number=parseFloat(this.prev_formula);
        this.current_number=parseFloat(this.formula);
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
        }

        console.log(this.prev_number+' '+this.operation+' '+this.current_number + ' = '+result);
        this.start=true;
        return result;
    }

    show(value:number):string {
        this.prev_formula='';
        this.formula=value.toString();
        return this.formula;
    }
}