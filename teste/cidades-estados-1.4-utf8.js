/**
 * Originalmente escrito por DGmike, atualizado por roberto.cr e Ian Pacheco
 * http://code.google.com/p/cidades-estados-js/
 */

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

/* Objeto */
var dgCidadesEstados = function(data) {
  
	  var defaultData = {
		estado: false,
		estadoVal: '',
		cidade: false,
		cidadeVal: '',
		change: false
	  }
  
  for (name in defaultData) {
    if (!data[name]) {
      data[name] = defaultData[name];
    }
  }
  
  var keys = ['estado', 'cidade'];
  
  if (data['change']) { //caso change: true, não se trata de um select a ser povoado
    var nome;
    for (var a=0; a < keys.length; a++ ) {
      nome = keys[a];
      if (data[nome].tagName) {
        var opt = document.createElement('select');
        opt.disabled = null
        for (var i = 0; i < data[nome].attributes.length ; i++) {
          var attr = data[nome].attributes[i];
          if (attr.name != 'type') {
            opt.setAttribute(attr.name, attr.value);
          }
        }
        opt.size = 1;
        opt.disabled = false;
        data[nome].parentNode.replaceChild(opt, data[nome]);
        data[nome] = opt;
      }
    }
  }
  
  
  this.set(data['estado'], data['cidade']);
  this.start();

  var nome, length = keys.length;
  for (var i=0; i<length; i++) {
    nome = keys[i]; //estado e cidade
	
    if (this[nome].getAttribute('value')) {
      data[nome+'Val'] = this[nome].getAttribute('value');
    }
	
    if (data[nome+'Val']) { //preenche estadoVal e cidadeVal se fornecidos na criação do dgCidadesEstados.
		var options = this[nome].options;
		if (nome=='estado') this.estado.onchange(); //se tiver preenchido o estado, dá run() pra preencher as cidades
		for (var j = 0; j<options.length; j++) { //olha cada linha e vê se é a que quer... aí coloca como selected.
			if (options[j].tagName == 'OPTION') {
				if (options[j].value == data[nome+'Val']) {
					options[j].setAttribute('selected',true);
					if (nome=='estado'){ //esses dois passos são necessários pro IE6!
						this.estado.selectedIndex=j;
						this.estado.onchange();
					}
				}
			}
		}
	}
	
  }
  
}


dgCidadesEstados.prototype = {
	
  estado: document.createElement('select'),
  cidade: document.createElement('select'),
  
  set: function(estado, cidade) { //define os elementos DOM a serem preenchidos
    this.estado=estado;
    this.estado.dgCidadesEstados=this;
    this.cidade=cidade;
    this.estado.onchange=function(){this.dgCidadesEstados.run()};
  },
  start: function () { //preenche os estados
    var estado = this.estado;
    while (estado.childNodes.length) estado.removeChild(estado.firstChild);
    for (var i=0;i<this.estados.length;i++) this.addOption(estado, this.estados[i][0], this.estados[i][1]);
  },
  run: function () { //preenche as cidades de acordo com o estado escolhido

	var sel = this.estado.selectedIndex; // estado escolhido
    var itens = this.cidades[sel]; // pega as cidades correspondentes
    var itens_total = itens.length;
	
    var opts = this.cidade;
    while (opts.childNodes.length) opts.removeChild(opts.firstChild); // limpa a lista atual
	
    this.addOption(opts, '', 'Selecione uma cidade');
    for (var i=0;i<itens_total;i++) this.addOption(opts, itens[i], itens[i]); // vai adicionando as cidades correspondentes
  },
  addOption: function (elm, val, text) {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(text));
    opt.value = val;
    elm.appendChild(opt);
  },
  
  
  estados : [
    ['','Selecione um estado'],['RJ','Rio de Janeiro'],['SP','São Paulo']
  ],
  cidades : [
	[''],
	
	['Rio de Janeiro','Angra dos Reis','Aperibé','Araruama','Areal','Armação dos Búzios','Arraial do Cabo','Barra do Piraí','Barra Mansa','Belford Roxo','Bom Jardim','Bom Jesus do Itabapoana','Cabo Frio','Cachoeiras de Macacu','Cambuci','Campos dos Goytacazes','Cantagalo','Carapebus','Cardoso Moreira','Carmo','Casimiro de Abreu','Comendador Levy Gasparian','Conceição de Macabu','Cordeiro','Duas Barras','Duque de Caxias','Engenheiro Paulo de Frontin','Guapimirim','Iguaba Grande','Itaboraí','Itaguaí','Italva','Itaocara','Itaperuna','Itatiaia','Japeri','Laje do Muriaé','Macaé','Macuco','Magé','Mangaratiba','Maricá','Mendes','Mesquita','Miguel Pereira','Miracema','Natividade','Nilópolis','Niterói','Nova Friburgo','Nova Iguaçu','Paracambi','Paraíba do Sul','Parati','Paty do Alferes','Petrópolis','Pinheiral','Piraí','Porciúncula','Porto Real','Quatis','Queimados','Quissamã','Resende','Rio Bonito','Rio Claro','Rio das Flores','Rio das Ostras','Santa Maria Madalena','Santo Antônio de Pádua','São Fidélis','São Francisco de Itabapoana','São Gonçalo','São João da Barra','São João de Meriti','São José de Ubá','São José do Vale do Rio Preto','São Pedro da Aldeia','São Sebastião do Alto','Sapucaia','Saquarema','Seropédica','Silva Jardim','Sumidouro','Tanguá','Teresópolis','Trajano de Moraes','Três Rios','Valença','Varre-Sai','Vassouras','Volta Redonda'],
	
	['São Paulo','Adamantina','Adolfo','Aguaí','Águas da Prata','Águas de Lindóia','Águas de Santa Bárbara','Águas de São Pedro','Agudos','Alambari','Alfredo Marcondes','Altair','Altinópolis','Alto Alegre','Alumínio','Álvares Florence','Álvares Machado','Álvaro de Carvalho','Alvinlândia','Americana','Américo Brasiliense','Américo de Campos','Amparo','Analândia','Andradina','Angatuba','Anhembi','Anhumas','Aparecida','Aparecida d\'Oeste','Apiaí','Araçariguama','Araçatuba','Araçoiaba da Serra','Aramina','Arandu','Arapeí','Araraquara','Araras','Arco-Íris','Arealva','Areias','Areiópolis','Ariranha','Artur Nogueira','Arujá','Aspásia','Assis','Atibaia','Auriflama','Avaí','Avanhandava','Avaré','Bady Bassitt','Balbinos','Bálsamo','Bananal','Barão de Antonina','Barbosa','Bariri','Barra Bonita','Barra do Chapéu','Barra do Turvo','Barretos','Barrinha','Barueri','Bastos','Batatais','Bauru','Bebedouro','Bento de Abreu','Bernardino de Campos','Bertioga','Bilac','Birigui','Biritiba-Mirim','Boa Esperança do Sul','Bocaina','Bofete','Boituva','Bom Jesus dos Perdões','Bom Sucesso de Itararé','Borá','Boracéia','Borborema','Borebi','Botucatu','Bragança Paulista','Braúna','Brejo Alegre','Brodowski','Brotas','Buri','Buritama','Buritizal','Cabrália Paulista','Cabreúva','Caçapava','Cachoeira Paulista','Caconde','Cafelândia','Caiabu','Caieiras','Caiuá','Cajamar','Cajati','Cajobi','Cajuru','Campina do Monte Alegre','Campinas','Campo Limpo Paulista','Campos do Jordão','Campos Novos Paulista','Cananéia','Canas','Cândido Mota','Cândido Rodrigues','Canitar','Capão Bonito','Capela do Alto','Capivari','Caraguatatuba','Carapicuíba','Cardoso','Casa Branca','Cássia dos Coqueiros','Castilho','Catanduva','Catiguá','Cedral','Cerqueira César','Cerquilho','Cesário Lange','Charqueada','Chavantes','Clementina','Colina','Colômbia','Conchal','Conchas','Cordeirópolis','Coroados','Coronel Macedo','Corumbataí','Cosmópolis','Cosmorama','Cotia','Cravinhos','Cristais Paulista','Cruzália','Cruzeiro','Cubatão','Cunha','Descalvado','Diadema','Dirce Reis','Divinolândia','Dobrada','Dois Córregos','Dolcinópolis','Dourado','Dracena','Duartina','Dumont','Echaporã','Eldorado','Elias Fausto','Elisiário','Embaúba','Embu das Artes','Embu-Guaçu','Emilianópolis','Engenheiro Coelho','Espírito Santo do Pinhal','Espírito Santo do Turvo','Estiva Gerbi','Estrela d\'Oeste','Estrela do Norte','Euclides da Cunha Paulista','Fartura','Fernando Prestes','Fernandópolis','Fernão','Ferraz de Vasconcelos','Flora Rica','Floreal','Florínia','Flórida Paulista','Franca','Francisco Morato','Franco da Rocha','Gabriel Monteiro','Gália','Garça','Gastão Vidigal','Gavião Peixoto','General Salgado','Getulina','Glicério','Guaiçara','Guaimbê','Guaíra','Guapiaçu','Guapiara','Guará','Guaraçaí','Guaraci','Guarani d\'Oeste','Guarantã','Guararapes','Guararema','Guaratinguetá','Guareí','Guariba','Guarujá','Guarulhos','Guatapará','Guzolândia','Herculândia','Holambra','Hortolândia','Iacanga','Iacri','Iaras','Ibaté','Ibirá','Ibirarema','Ibitinga','Ibiúna','Icém','Iepê','Igaraçu do Tietê','Igarapava','Igaratá','Iguape','Ilha Comprida','Ilha Solteira','Ilhabela','Indaiatuba','Indiana','Indiaporã','Inúbia Paulista','Ipaussu','Iperó','Ipeúna','Ipiguá','Iporanga','Ipuã','Iracemápolis','Irapuã','Irapuru','Itaberá','Itaí','Itajobi','Itaju','Itanhaém','Itaóca','Itapecerica da Serra','Itapetininga','Itapeva','Itapevi','Itapira','Itapirapuã Paulista','Itápolis','Itaporanga','Itapuí','Itapura','Itaquaquecetuba','Itararé','Itariri','Itatiba','Itatinga','Itirapina','Itirapuã','Itobi','Itu','Itupeva','Ituverava','Jaborandi','Jaboticabal','Jacareí','Jaci','Jacupiranga','Jaguariúna','Jales','Jambeiro','Jandira','Jardinópolis','Jarinu','Jaú','Jeriquara','Joanópolis','João Ramalho','José Bonifácio','Júlio Mesquita','Jumirim','Jundiaí','Junqueirópolis','Juquiá','Juquitiba','Lagoinha','Laranjal Paulista','Lavínia','Lavrinhas','Leme','Lençóis Paulista','Limeira','Lindóia','Lins','Lorena','Lourdes','Louveira','Lucélia','Lucianópolis','Luís Antônio','Luiziânia','Lupércio','Lutécia','Macatuba','Macaubal','Macedônia','Magda','Mairinque','Mairiporã','Manduri','Marabá Paulista','Maracaí','Marapoama','Mariápolis','Marília','Marinópolis','Martinópolis','Matão','Mauá','Mendonça','Meridiano','Mesópolis','Miguelópolis','Mineiros do Tietê','Mira Estrela','Miracatu','Mirandópolis','Mirante do Paranapanema','Mirassol','Mirassolândia','Mococa','Mogi das Cruzes','Mogi-Guaçu','Mogi-Mirim','Mombuca','Monções','Mongaguá','Monte Alegre do Sul','Monte Alto','Monte Aprazível','Monte Azul Paulista','Monte Castelo','Monte Mor','Monteiro Lobato','Morro Agudo','Morungaba','Motuca','Murutinga do Sul','Nantes','Narandiba','Natividade da Serra','Nazaré Paulista','Neves Paulista','Nhandeara','Nipoã','Nova Aliança','Nova Campina','Nova Canaã Paulista','Nova Castilho','Nova Europa','Nova Granada','Nova Guataporanga','Nova Independência','Nova Luzitânia','Nova Odessa','Novais','Novo Horizonte','Nuporanga','Ocauçu','Óleo','Olímpia','Onda Verde','Oriente','Orindiúva','Orlândia','Osasco','Oscar Bressane','Osvaldo Cruz','Ourinhos','Ouro Verde','Ouroeste','Pacaembu','Palestina','Palmares Paulista','Palmeira d\'Oeste','Palmital','Panorama','Paraguaçu Paulista','Paraibuna','Paraíso','Paranapanema','Paranapuã','Parapuã','Pardinho','Pariquera-Açu','Parisi','Patrocínio Paulista','Paulicéia','Paulínia','Paulistânia','Paulo de Faria','Pederneiras','Pedra Bela','Pedranópolis','Pedregulho','Pedreira','Pedrinhas Paulista','Pedro de Toledo','Penápolis','Pereira Barreto','Pereiras','Peruíbe','Piacatu','Piedade','Pilar do Sul','Pindamonhangaba','Pindorama','Pinhalzinho','Piquerobi','Piquete','Piracaia','Piracicaba','Piraju','Pirajuí','Pirangi','Pirapora do Bom Jesus','Pirapozinho','Pirassununga','Piratininga','Pitangueiras','Planalto','Platina','Poá','Poloni','Pompéia','Pongaí','Pontal','Pontalinda','Pontes Gestal','Populina','Porangaba','Porto Feliz','Porto Ferreira','Potim','Potirendaba','Pracinha','Pradópolis','Praia Grande','Pratânia','Presidente Alves','Presidente Bernardes','Presidente Epitácio','Presidente Prudente','Presidente Venceslau','Promissão','Quadra','Quatá','Queiroz','Queluz','Quintana','Rafard','Rancharia','Redenção da Serra','Regente Feijó','Reginópolis','Registro','Restinga','Ribeira','Ribeirão Bonito','Ribeirão Branco','Ribeirão Corrente','Ribeirão do Sul','Ribeirão dos Índios','Ribeirão Grande','Ribeirão Pires','Ribeirão Preto','Rifaina','Rincão','Rinópolis','Rio Claro','Rio das Pedras','Rio Grande da Serra','Riolândia','Riversul','Rosana','Roseira','Rubiácea','Rubinéia','Sabino','Sagres','Sales','Sales Oliveira','Salesópolis','Salmourão','Saltinho','Salto','Salto de Pirapora','Salto Grande','Sandovalina','Santa Adélia','Santa Albertina','Santa Bárbara d\'Oeste','Santa Branca','Santa Clara d\'Oeste','Santa Cruz da Conceição','Santa Cruz da Esperança','Santa Cruz das Palmeiras','Santa Cruz do Rio Pardo','Santa Ernestina','Santa Fé do Sul','Santa Gertrudes','Santa Isabel','Santa Lúcia','Santa Maria da Serra','Santa Mercedes','Santa Rita d\'Oeste','Santa Rita do Passa Quatro','Santa Rosa de Viterbo','Santa Salete','Santana da Ponte Pensa','Santana de Parnaíba','Santo Anastácio','Santo André','Santo Antônio da Alegria','Santo Antônio de Posse','Santo Antônio do Aracanguá','Santo Antônio do Jardim','Santo Antônio do Pinhal','Santo Expedito','Santópolis do Aguapeí','Santos','São Bento do Sapucaí','São Bernardo do Campo','São Caetano do Sul','São Carlos','São Francisco','São João da Boa Vista','São João das Duas Pontes','São João de Iracema','São João do Pau d\'Alho','São Joaquim da Barra','São José da Bela Vista','São José do Barreiro','São José do Rio Pardo','São José do Rio Preto','São José dos Campos','São Lourenço da Serra','São Luís do Paraitinga','São Manuel','São Miguel Arcanjo','São Pedro','São Pedro do Turvo','São Roque','São Sebastião','São Sebastião da Grama','São Simão','São Vicente','Sarapuí','Sarutaiá','Sebastianópolis do Sul','Serra Azul','Serra Negra','Serrana','Sertãozinho','Sete Barras','Severínia','Silveiras','Socorro','Sorocaba','Sud Mennucci','Sumaré','Suzanápolis','Suzano','Tabapuã','Tabatinga','Taboão da Serra','Taciba','Taguaí','Taiaçu','Taiúva','Tambaú','Tanabi','Tapiraí','Tapiratiba','Taquaral','Taquaritinga','Taquarituba','Taquarivaí','Tarabai','Tarumã','Tatuí','Taubaté','Tejupá','Teodoro Sampaio','Terra Roxa','Tietê','Timburi','Torre de Pedra','Torrinha','Trabiju','Tremembé','Três Fronteiras','Tuiuti','Tupã','Tupi Paulista','Turiúba','Turmalina','Ubarana','Ubatuba','Ubirajara','Uchoa','União Paulista','Urânia','Uru','Urupês','Valentim Gentil','Valinhos','Valparaíso','Vargem','Vargem Grande do Sul','Vargem Grande Paulista','Várzea Paulista','Vera Cruz','Vinhedo','Viradouro','Vista Alegre do Alto','Vitória Brasil','Votorantim','Votuporanga','Zacarias'],
	
	]
};