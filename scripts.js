//faixas 
var f1 = 1212.00 * 0.075
var f2 = (2427.79 - 1212.00) * 0.09
var f3 = (3641.69 - 2427.79) * 0.12
var f4 = (7088.50 - 3641.69) * 0.14

$("#valorSalario").maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: true});
$("#valorDesconto").maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: true});

function calcular(){
	
	
	let salarioBruto = parseFloat(document.getElementById("valorSalario").value.replace(/\./g, "").replace(",","."))
	let ndependentes = document.getElementById("numeroDependentes").value
	let valorDesconto = parseFloat(document.getElementById("valorDesconto").value.replace(/\./g, "").replace(",",".").replace("R$ ", "").replace("","0"))

	if(Number.isNaN(salarioBruto) === true){
		alert("Insira um valor valido!")
	} else {

		let inss = calcularINSS(salarioBruto)
		let irrf = calcularIRRF(salarioBruto - inss, ndependentes)
		let salarioLiquido = salarioBruto - inss - irrf - valorDesconto
		let descontos = inss + irrf + valorDesconto

		if(inss == 751.99){
			document.getElementById("porcentagemINSS").innerHTML = "TETO"
		} else{
			document.getElementById("porcentagemINSS").innerHTML = formataPorce(inss, salarioBruto)
		}

		document.getElementById("descontoINSS").innerHTML = formatar(inss)
		document.getElementById("valorLimpo").innerHTML = formatar(salarioLiquido)
		document.getElementById("descontoIRRF").innerHTML = formatar(irrf)
		document.getElementById("salarioBruto").innerHTML = formatar(salarioBruto)
		document.getElementById("totalProvento").innerHTML = formatar(salarioBruto)
		document.getElementById("totalDesconto").innerHTML = formatar(descontos)
		document.getElementById("desconto").innerHTML = formatar(valorDesconto)
		document.getElementById("porcentagemIRRF").innerHTML = formataPorce(irrf, salarioBruto - inss)
		document.getElementById("porcentagemDesconto").innerHTML = formataPorce(valorDesconto, salarioBruto)

		let tbody = document.getElementById("tbody")

		td = tbody.getElementsByTagName("td")

		for(i in td){

			if(td[i].innerHTML == ""){
				td[i].innerHTML = "-"
			}
		}
	}
}

function calcularINSS(salarioBruto){

	let inss = 0

	if(salarioBruto <= 1212.00) {
		inss = salarioBruto * 0.075
	} else if (salarioBruto <= 2427.79){
		inss = f1 + (salarioBruto - 1212.00) * 0.09
	} else if (salarioBruto <= 3641.69){
		inss = f1 + f2 + (salarioBruto - 2427.79) * 0.12
	} else if (salarioBruto <= 7088.50){
		inss = f1 + f2 + f3 + (salarioBruto - 3641.69) * 0.14
	} else {
		inss = 751.99
	}
	return Math.floor(inss * 100)/ 100
}

function calcularIRRF(salarioLimpo, nDependentes){
	let irrf = 0
	let valorDependente = 189.59

	let salario = (salarioLimpo - (nDependentes * valorDependente)).toFixed(2)	

	if(salario <= 1903.98){
		irrf = 0
	} else if (salario <= 2826.65){
		irrf = (salario * 0.075) - 142.80
	} else if (salario <= 3751.05){
		irrf = (salario * 0.15) - 354.80
	} else if (salario <= 4664.68){
		irrf = (salario * 0.225) - 636.13
	} else {
		irrf = (salario * 0.275) - 869.36
	}
	return irrf
}

function formatar(number){
	valorFormatado = number.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })
	return valorFormatado
}

function formataPorce(desconto, salarioBruto){
	let formatado = (Math.floor((desconto * 100 / (salarioBruto)) * 100) / 100).toString().replace(".",",")
	//retorna a porcentagem do valor, convertendo a para string e depois substituindo o ponto pela virgula

	return formatado + "%"
}

// let porcDesconto = Math.floor((valorDesconto * 100 / salarioBruto) * 100) / 100
// let porcInss = 	Math.floor((inss * 100 / salarioBruto) * 100) / 100
// let porcIrrf = 	Math.floor((irrf * 100 / (salarioBruto - inss)) * 100) / 100


