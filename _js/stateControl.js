/* Dom Ready */
window.onDomReady = function dgDomReady(fn){
	if(document.addEventListener)	//W3C
		document.addEventListener("DOMContentLoaded", fn, false);
} // Evitar problemas caso a váriavel seja declarada no "head"

var cidades;
var estados;

var cidadeControl = function(data) { // ----------------- Função principal
	
	var defaultData = { // ------------------------------ Váriavel Default para padronizar a informaçao vinda do formulário
		estado: false,
		estadoVal: '',
		cidade: false,
		cidadeVal: '',
		change: false
	  }
  
  for (name in defaultData) { // ------------------------ Set o default se nessário nos dados recebidos
    if (!data[name]) { // ------------------------------- Isso APENAS ocorre se o Index no array estiver vazio 
      data[name] = defaultData[name]; // ---------------- E no caso o default é atribiudo ao data
    }
  }
  
 sp_data = data["spDate"]; // -------------------------- Armazena as cidades que devem ser passado no index "spDate"
 rj_data = data["rjDate"]; // -------------------------- Armazena as cidades que devem ser passado no index "rjDate"
 
	cidades = [
			[''],
			[rj_data],		
			[sp_data] 
	]; // ARRAY QUE ARMAZENA TODOS AS CIDADES
	estados = [ 
			['','Selecione um estado'],
			['RJ','Rio de Janeiro'],
			['SP','São Paulo'] 
	]; // VÁRIAVEL QUE ARMAZENA TODOS OS ESTADOS
		
	this.set(data['estado'], data['cidade']);
	this.start();
}

cidadeControl.prototype = {
	
  estado : document.createElement('select'),
  cidade : document.createElement('select'),

	set: function(estado, cidade) { // ------------------------------------------- define os elementos DOM a serem preenchidos
			this.estado = estado;
			this.estado.cidadeControl = this;
			this.cidade = cidade;
			this.estado.onchange = function(){ this.cidadeControl.run() }; // ---- Adiciona o "onChange" para caso sofra mudanças
	},
	start: function () { // ------------------------------------------------------ preenche os estados
  
			var estado = this.estado;
			
			while (estado.childNodes.length) 
				estado.removeChild(estado.firstChild);
			
			for (var i = 0; i < estados.length; i++) 
				this.addOption(estado, estados[i][0], estados[i][1]);
	
	},
  
	run: function () { // -------------------------------------------------------- preenche as cidades de acordo com o estado escolhido

			var sel = this.estado.selectedIndex; // ------------------------------ estado escolhido
			var itens = cidades[sel][0]; // -------------------------------------- pega as cidades correspondentes
			var itens_total = itens.length;
			
			var opts = this.cidade; // -------------------------------------------- Pega o Select

			while (opts.childNodes.length) opts.removeChild(opts.firstChild); // - limpa a lista atual
			
			this.addOption(opts, '', 'Selecione uma cidade'); // ----------------- Primeira opção do select
			
			for (var i=0;i<itens_total;i++)
				this.addOption(opts, itens[i][0], itens[i][1]); // --------------- vai adicionando as cidades correspondentes
	},
	
	addOption: function (elm, val, text) { // ------------------------------------ Função que cria o option do select
			var opt = document.createElement('option'); // ----------------------- Cria o option
			opt.appendChild(document.createTextNode(text)); // ------------------- Cria um TextNode com o texto passado
			opt.value = val; // -------------------------------------------------- Atribui um "valor"
			elm.appendChild(opt); // --------------------------------------------- Define o option como filho do select
	}

};