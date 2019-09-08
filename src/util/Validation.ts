class Validation {
    constructor() {}
    
    public isOnlyNumbers(numeros: string): boolean{
        let notNumber = /^[0-9]$/g;
        return notNumber.test(numeros);
    }

    public isCepValid(cep: string): boolean{
        let cepValid = /^\d{5}\-?\d{3}$/;
        return cepValid.test(cep);
    }

    public isDateBrVallid(data: string): boolean{
        let notValid = false;
        if (data && data.length === 10) {
            let dia = data.substring(0, 2);
            let mes = data.substring(3, 5);
            let ano = data.substring(6, 10);
            // Criando um objeto Date usando os valores ano, mes e dia.
            let novaData = new Date(parseInt(ano), (parseInt(mes) - 1), parseInt(dia));
            let mesmoDia = parseInt(dia, 10) == parseInt(novaData.getDate().toString());
            let mesmoMes = parseInt(mes, 10) == parseInt(novaData.getMonth().toString()) + 1;
            let mesmoAno = parseInt(ano) == parseInt(novaData.getFullYear().toString());
            if (!((mesmoDia) && (mesmoMes) && (mesmoAno))) {notValid = true;}
        }else{notValid = true;}
        return !notValid;
    }

    public isHourMninuteValid(hora: string): boolean {
        let notValid = false;
        if (hora && hora.length == 5) {
            let horas = hora.substring(0, 2);
            let minutos = hora.substring(3, 5);
            // Criando um objeto Date usando os valores ano, mes e dia.
            if(horas){
                let horasNumber =  parseInt(horas);
                if(horasNumber > 23){notValid = true;}
            }
            if(minutos){
                let minutosNumber =  parseInt(minutos);
                if(minutosNumber > 59){notValid = true;}
            }
        }else{notValid = true;}
        return !notValid;
    }

    public isCpfValid(cpf: string): boolean{
        let notValid = false;
        let cpfv  = cpf;
        if(cpfv.length == 14 || cpfv.length == 11){
            cpfv = cpfv.replace('.', '');
            cpfv = cpfv.replace('.', '');
            cpfv = cpfv.replace('-', '');
            let nonNumbers = /\D/;
            if(nonNumbers.test(cpfv)){notValid = true;}else{
                if (cpfv == "00000000000" ||
                    cpfv == "11111111111" ||
                    cpfv == "22222222222" ||
                    cpfv == "33333333333" ||
                    cpfv == "44444444444" ||
                    cpfv == "55555555555" ||
                    cpfv == "66666666666" ||
                    cpfv == "77777777777" ||
                    cpfv == "88888888888" ||
                    cpfv == "99999999999") {
                    notValid = true;
                }
                let a = [];
                let b;
                let c = 11;
                for(let i = 0; i < 11; i++){
                    a[i] = cpfv.charAt(i);
                    if (i < 9) b += (a[i] * --c);
                }
                let x = b % 11;
                if((x) < 2){
                    a[9] = 0;
                }else{
                    a[9] = 11-x;
                }
                b = 0;
                c = 11;
                for (let y=0; y<10; y++) b += (a[y] * c--);
                if((x = b % 11) < 2){
                    a[10] = 0;
                }else{
                    a[10] = 11-x;
                }
                if((cpfv.charAt(9) != a[9]) || (cpfv.charAt(10) != a[10])){
                    notValid = true;
                }else{
                    notValid = false;
                }
            }
        }else {notValid = true;}
        return !notValid;
    }

    public isCnpjValid(cnpj: string){
        var notValid = false;
        cnpj = cnpj.replace(/[^0-9]+/g, "");
        if (cnpj.length != 14){
                notValid = true;
        }else if (cnpj == "00000000000000" ||//Elimina CNPJs invalidos conhecidos 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999"){
                notValid = true; 
            }else{
                let tamanho = cnpj.length - 2;
                let numeros = cnpj.substring(0,tamanho);
                let digitos = cnpj.substring(tamanho);
                let soma = 0;
                let pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                     soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
                    if (pos < 2)
                        pos = 9;
                }
                let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != parseInt(digitos.charAt(0))){
                    notValid = true;
                }else{
                    tamanho = tamanho + 1;
                    numeros = cnpj.substring(0,tamanho);
                    soma = 0;
                    pos = tamanho - 7;
                    for (let i = tamanho; i >= 1; i--) {
                        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
                        if (pos < 2) pos = 9;
                    }
                    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if (resultado != parseInt(digitos.charAt(1))){
                            notValid = true;				
                    }
                }
            }
        return !notValid;    
    }

    public isEmailValid(email: string): boolean{
        let validador = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return validador.test(email);
    }
}
export default new Validation();