export class Formula {
    
    formula: string;
    current_num: number = 0;
    previous_num: number = 0;
    stack: string[] = [];
    init: boolean = false;
    decimal: boolean = false;  //input number having decimal value
    operand: boolean = false;
    operation: string = '';
    memory: number = 0;
    in_memory: boolean = false;
    bracket: boolean = false;
    secondScreen: boolean = false;

    constructor(formula: string='') {
        this.formula = formula;
    }

    get() {
        return this.formula;
    }

    parse(value: string): number {
        return parseFloat(value);
    }

    getCurrentNum() {
        return this.parse(this.formula);
    }


    clear(): string {
        this.formula = '0';

        this.decimal = false;
        this.operand = false;
        this.operation = '';
        this.init = false;
        this.stack = [];
        this.bracket = false;
        return this.formula;

    }


    addToMemory() {
        let value = this.getCurrentNum();
        this.memory += value;
        this.in_memory = true;
        this.init = true;
    }

    deductFromMemory() {
        let value=this.getCurrentNum();
        this.memory -= value;
        this.in_memory = true;
        this.init = true;
    }


    addValue(value:string,start:boolean):string {
        if (start || this.init || (this.decimal == false && this.formula == '0' && value != '.')) {
            this.formula='';
        }
        this.init=start;
        if (value=='.') {
            if (this.decimal==true) {
                return this.formula;    
            }
            this.decimal=true;
        }
        this.formula+=value;
        this.operand = false;
        return this.formula;
    }

    setOperation(operand: string): void {
        this.operation = operand;
        //if operand already set 
        if (this.operand) {
            this.operation = operand;
            return null;
        }
        this.operand = true;
        this.stack.push(this.formula);
        this.stack.push(this.operation);
        this.init = true;
    }

    removeSymbol():void {
        let len=this.formula.length;
        let last_symbol=this.formula.substring(len - 1,len);
        if (last_symbol == '.') {
            this.decimal=false;
        }
        this.formula=this.formula.slice(0,-1);
    }


    calculate():number {
        let result:number;
        if (this.stack.length<3) return;
        this.operand = false;
        this.current_num=this.parse(this.stack.pop());
        this.operation=this.stack.pop();
        this.previous_num=this.parse(this.stack.pop());
        if (!this.previous_num) return 0;

        switch (this.operation) {
            case '+':
                result=this.previous_num+this.current_num;
                this.display(result);
                break;
            case '-':
                result=this.previous_num-this.current_num;
                this.display(result);
                break;
            case '*':
                result=this.previous_num*this.current_num;
                this.display(result);
                break;
            case '/':
                result=this.previous_num/this.current_num;
                this.display(result);
                break;
            case 'sqrt':
                result=Math.pow(this.previous_num,1/this.current_num);
                this.display(result);
                break;
            case 'pow':
                result=Math.pow(this.previous_num,this.current_num);
                this.display(result);
                break;
            
            case 'log':
                result = Math.log(this.previous_num) / Math.log(this.current_num);
                break;
        }

        this.current_num=this.parse(this.formula);

        this.init=true;
        return result;
    }


    toOperate(operand:string,data:any):number {
        let result:number=0;
        let exp:number=0;
        
        this.current_num=parseFloat(this.formula);

        switch(operand) {
            case 'invert':
                result = this.current_num*data;
            break;
            
            case 'sqrt':
                result = Math.sqrt(this.current_num);
            break;

            case 'sqrt3':
                result = Math.pow(this.current_num,1/3);
            break;

            case 'ln':
                result = Math.log(this.current_num);
            break;

            case 'lg':
                result = Math.log(this.current_num)/Math.log(data);
            break;

            case 'pow_base':
                let base = data =='e' ? Math.E : data;
                result=Math.pow(base, this.current_num);
            break;

            case 'pow':
                let step=parseFloat(data);
                result=Math.pow(this.current_num, step);
            break;

            case 'div':
                result = 1/this.current_num;
            break;

            case 'sin':
                exp= this.current_num;
                result = Math.sin(exp);
            break;

            case 'cos':
                exp= this.current_num;
                result=Math.cos(exp);
            break;

            case 'tan':
                exp=this.current_num;
                result=Math.tan(exp);
            break;

            case 'sinh':
                exp=this.current_num;
                result=(Math.exp(exp)-Math.exp(-exp))/2;
            break;

            case 'cosh':
                exp=this.current_num;
                result=(Math.exp(exp)+Math.exp(-exp))/2;
            break;

            case 'tanh':
                exp=this.current_num ;
                result=(Math.exp(exp)-Math.exp(-exp))/(Math.exp(exp)+Math.exp(-exp));
            break;

            case 'rand':
                result=Math.random();
            break;
            
            case 'fact':
                let n=Math.ceil(this.current_num);
                result=1;
                for (let i=1;i<=n;i++) {
                    result*=i;
                }
            break;

            case 'percent':
                result=this.current_num/100;
            break;

            case 'ee':
                this.formula=this.current_num.toExponential();
                return 0;
        }

        this.init=true;
        this.display(result);
        return result;
    }
    

    display(value:number):string {
        this.formula=value.toString();
        return this.formula;
    }

    clearMemory() {
        this.memory = 0;
        this.in_memory = false;
    }
        
    
}