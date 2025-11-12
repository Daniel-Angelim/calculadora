const OperaçãoAnterior = document.querySelector("#operacao-anterior");
const OperaçãoAtual = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#container-botoes button");

class calculator {
    constructor(OperaçãoAnterior, OperaçãoAtual){
        this.OperaçãoAnteriorText = OperaçãoAnterior;
        this.OperaçãoAtualText = OperaçãoAtual;
        this.OperaçãoAtual = "";
    }

    addDigit(digit){
        if(digit === "." && this.OperaçãoAtualText.innerText.includes(".")){
            return
        }
        if(digit ==="." && this.OperaçãoAtualText.innerText == ""){
            this.OperaçãoAtualText.innerText = 0.
        }
        this.OperaçãoAtual = digit
        this.updateScreen()
    }

    operacoes(operation){

        if (this.OperaçãoAtualText.innerText === "" && operation != "AC"){
            if (this.OperaçãoAnteriorText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue
        const anterior = +this.OperaçãoAnteriorText.innerText.split(" ")[0];
        const atual = +this.OperaçãoAtualText.innerText;



        switch(operation){
            case "+":
                operationValue = anterior + atual;
                this.updateScreen(operationValue, operation, atual, anterior);
                break;
            case "-":
                operationValue = anterior - atual;
                this.updateScreen(operationValue, operation, atual, anterior);
                break;
            case "x":
                operationValue = anterior * atual;
                this.updateScreen(operationValue, operation, atual, anterior);
                break;
            case "÷":
                operationValue = anterior / atual;
                this.updateScreen(operationValue, operation, atual, anterior);
                break;
            case "C":
                this.COperation();
                break;
            case "AC":
                this.AcOperation();
                break;
            case "DEL":
                this.DelOperation();
                break;
            case "=":
                this.EqualOperation();
                break;
            default:
                return;
        }
    }

    updateScreen(operationValue = null, operation = null, atual = null, anterior = null){
        if (operationValue === null){
            this.OperaçãoAtualText.innerText += this.OperaçãoAtual;
        }
        else{
            if (anterior === 0){
                operationValue = atual
            }
            this.OperaçãoAnteriorText.innerText = `${operationValue} ${operation}`;
            this.OperaçãoAtualText.innerText = "";  
        }
    }
    
    changeOperation(operation){
        const mathOperations = ["+", "-", "x", "÷", "*", "/"]
        if (!mathOperations.includes(operation)){
            return;
        }
        this.OperaçãoAnteriorText.innerText = this.OperaçãoAnteriorText.innerText.slice(0,  -1) + operation;
        
    }

    COperation(){
        this.OperaçãoAtualText.innerText = "";
    }

    AcOperation(){
        this.OperaçãoAnteriorText.innerText = "";
        this.OperaçãoAtualText.innerText = "";
    }

    DelOperation(){
        this.OperaçãoAtualText.innerText = this.OperaçãoAtualText.innerText.slice(0, -1);
    }

    EqualOperation(){
        const operation = this.OperaçãoAnteriorText.innerText.split(" ")[1];
        this.operacoes(operation);
        const result = this.OperaçãoAnteriorText.innerText.split(" ")[0];
        this.OperaçãoAtualText.innerText = result;
        this.OperaçãoAnteriorText.innerText = "";
    }
}

const calc = new calculator(OperaçãoAnterior, OperaçãoAtual);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;

        if (+value >= 0 || value == "."){
            calc.addDigit(value);
        }
        else{
            calc.operacoes(value);
        }

    })
})