
/* OS ESTUDOS DE CASO PARA A CRIAÇÃO DESSE SISTEMA FOI TOTALMENTE BASEADO NO DOCUMENTO "cidades-estados-1.4-utf8.js" NA PASTA "teste" */

/* Dom Ready */
	window.onDomReady = function dgDomReady(fn){
	if(document.addEventListener)	//W3C
		document.addEventListener("DOMContentLoaded", fn, false);
	else //IE
		document.onreadystatechange = function(){dgReadyState(fn);}
}

function dgReadyState(fn){ //dom is ready for interaction (IE)
	if(document.readyState == "interactive") fn();
}

var sp_data;
var cidades;

var cidadeControl = function(data) { // ----------------- Função principal
	
	var defaultData = { // ------------------------------ Váriavel Default para padronizar a informaçao vinda do formulário
		estado: false,
		estadoVal: '',
		cidade: false,
		cidadeVal: '',
		change: false
	  }
  
  for (name in defaultData) { // ------------------------ Set o default se nessário nos dados recebidos
    if (!data[name]) {
      data[name] = defaultData[name];
    }
  }
  
 sp_data = data["spDate"];
 rj_data = data["rjDate"];
 
	 cidades = [
			[''],
			[rj_data],		
			[sp_data] // ARRAY QUE ARMAZENA TODOS AS CIDADES
	] ;
	
	console.log(cidades);
		
	this.set(data['estado'], data['cidade']);
	this.start();
}

cidadeControl.prototype = {
	
  estado : document.createElement('select'),
  cidade : document.createElement('select'),

	set: function(estado, cidade) { //define os elementos DOM a serem preenchidos
			this.estado = estado;
			this.estado.cidadeControl = this;
			this.cidade = cidade;
			this.estado.onchange = function(){ this.cidadeControl.run() };
	},
	start: function () { //preenche os estados
  
			var estado = this.estado;
			
			while (estado.childNodes.length) 
				estado.removeChild(estado.firstChild);
			
			for (var i = 0; i < this.estados.length; i++) 
				this.addOption(estado, this.estados[i][0], this.estados[i][1]);
	
	},
  
	run: function () { //preenche as cidades de acordo com o estado escolhido

			var sel = this.estado.selectedIndex; // estado escolhido
			var itens = cidades[sel][0]; // pega as cidades correspondentes
			var itens_total = itens.length;
			console.log(itens_total);
			
			var opts = this.cidade;

			while (opts.childNodes.length) opts.removeChild(opts.firstChild); // limpa a lista atual
			
			this.addOption(opts, '', 'Selecione uma cidade');
			
			for (var i=0;i<itens_total;i++)
				this.addOption(opts, itens[i][0], itens[i][1]); // vai adicionando as cidades correspondentes
	},
	
	addOption: function (elm, val, text) {
			var opt = document.createElement('option');
			opt.appendChild(document.createTextNode(text));
			opt.value = val;
			elm.appendChild(opt);
	},
	
	estados : [ ['','Selecione um estado'],['RJ','Rio de Janeiro'],['SP','São Paulo'] ], // VÁRIAVEL QUE ARMAZENA TODOS OS ESTADOS
	
	

};