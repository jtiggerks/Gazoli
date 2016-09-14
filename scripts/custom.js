(function ($) {
$(document).ready(function() {
$('#menu-box').show();
$("#menu-box").delay(1500).effect("pulsate",{ times:5}, 2500).delay(1400).fadeOut(1000);

$('#content').scroll(function(){
        if($("#noticias").css('display') != 'none'){
		var elem = $('#content');            
		if (elem.scrollTop() > 50){
			$("#box-atualizar").show("slide", { direction: "down", easing: 'easeInOutBack' }, 700);
    	}
		else{
			$("#box-atualizar").hide("fade", { direction: "top", easing: 'easeInOutBack' }, 700)			
		}
	}
	else{
			$("#box-atualizar").hide("fade", { direction: "top", easing: 'easeInOutBack' }, 700)					
	}
})

var characters = 500;
    $(".limite").html("Limite: <strong>"+  characters+"</strong>");
    $("#campo_mensagem").keyup(function(){
        if($(this).val().length > characters){
        $(this).val($(this).val().substr(0, characters));
        }
    var remaining = characters -  $(this).val().length;
    $(".limite").html("Limite: <strong>"+  remaining+"</strong>");
    });


$("#box-atualizar").click(function(){
	$('#lista-noticia').html('');
	pagina_Noticia();
	outras_Noticias(1)
});

$("#botoes-menu img").click(function(){
	$(this).effect("highlight", {}, 500);
});

if((localStorage.likes == null) || (localStorage.likes == '')){
    localStorage.likes = JSON.stringify(["0"]);
}
    
$('.bt-home').addClass('menu-home-ativo');

$("#footer ul li").click(function(){
	$("#footer ul li").removeClass('menu-home-ativo');
	$("#footer ul li").removeClass('menu-ativo');
	$("#footer ul li").removeClass('menu-msg-ativo');
	$(this).addClass('menu-ativo');
});
$(".bt-mensagem").click(function(){
	$("#footer ul li").removeClass('menu-home-ativo');
	$("#footer ul li").removeClass('menu-ativo');
	$("#footer ul li").removeClass('menu-msg-ativo');
	$(this).addClass('menu-msg-ativo');
});
$(".bt-home").click(function(){
	$("#footer ul li").removeClass('menu-home-ativo');
	$("#footer ul li").removeClass('menu-ativo');
	$("#footer ul li").removeClass('menu-msg-ativo');
	$(this).addClass('menu-home-ativo');
});

var audio = [];
function seg(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	app.receivedEvent('deviceready');

	window.plugin.backgroundMode.enable();
    document.addEventListener("backbutton", function (e) {
    }, false );}
document.addEventListener("backbutton", function(e){
e.preventDefault();
if($('#pagina-atual').val() == 'home'){	 
$("<div title='Confirmação'></div>").dialog({
   open: function(event, ui) { $(this).html('<span style="text-align:"center;">Deseja fechar o aplicativo?</span>'); $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
	show: { effect: "fade", duration: 300 },
buttons: {
		"Não": function() {
			$(this).dialog( "close" );
		},
		"Sim": function() {
			navigator.app.exitApp(); 
		}
	}

});		 	
}
else if($('#pagina-atual').val() == 'abre_noticia'){
	pagina_Noticia();
	$('#pagina-atual').val('noticia');	
}
else if($('#pagina-atual').val() == 'abre_podcast'){
	abre_Podcast()
	$('#pagina-atual').val('podcast');

}
else{
	abre_Home();		
	$('#pagina-atual').val('home');
}
	

}, true);


$('#enviar-foto').click(function(){
	escolherFoto();
});

function escolherFoto() {
  document.getElementById("img-input").click();
}	
	
$('#envia_mensagem').click(function(e){

var os = $("#os").val();
/*var telefone = $("#telefone").val();
var email = $("#email").val();*/
var nome = $("#nome").val();
var programa = $( "#programa option:selected" ).val();
var mensagem = $("#campo_mensagem").val();

/*if((nome == 'Informe seu nome') || (email == 'Seunome@seuemail.com') || (mensagem == 'Mensagem') || (telefone == '(DD) Telefone')){
*/if((nome == 'Informe seu nome') || (mensagem == 'Mensagem')){

	alerta('Preencha todos os campos');	
}
else if(programa == ''){
	alerta('Escolha o programa');
}
/*else if((email.indexOf("@") == -1) || (email.indexOf(".") == -1) ){
	alerta('Informe um e-mail válido');
}
*/
else{
$('#envia_mensagem').hide();
$('.loading_mensagem').show();

 $.ajax({
    url: 'http://www.postosgazoli.com.br/app/func-mensagem.php?nocache=' + (new Date()).getTime(),
    type: 'POST',
	cache:false,
    /*data: {nome: nome, email:email, programa:programa, mensagem:mensagem, telefone:telefone, os:os },*/
    data: {nome: nome,programa:programa, mensagem:mensagem, os:os },
	crossDomain:true,
    complete: function() { 
			alerta('Mensagem enviada com sucesso.');	
			abre_Home();
			$('#envia_mensagem').show();
			$('.loading_mensagem').hide();					
	 }
  });


}
});	
	
$('.envia').click(function(){
var nome = $("#nome_reporter").val();
var email = $("#email_reporter").val();
var localizacao = $("#localizacao_reporter").val();
var telefone = $("#telefone_reporter").val();
var celular = $("#celular_reporter").val();

var mensagem = $("#mensagem_reporter").val();

if((nome == 'Informe seu nome') || (email == 'Seunome@seuemail.com') || (mensagem == 'Mensagem')){
	alerta('Preencha todos os campos');	
}
else if(localizacao == ''){
	alerta('Informe a localização');
}
else if((email.indexOf("@") == -1) || (email.indexOf(".") == -1) ){
	alerta('Informe um e-mail válido');
}

else{
$('.envia').hide();
$('.loading_vc_reporter').show();

var arr = new Array();
$('.textareas').children().each(function(){
    if ($(this).attr('name'))
    {
        arr.push($(this).val());
    }
});
str = arr.join('|');

$.ajax({
	url: 'http://www.postosgazoli.com.br/app/ping.php?nocache=' + (new Date()).getTime(),
	cache:false,
	dataType: 'jsonp',
	jsonp: 'callback',
	timeout: 5000,
	success: function(results){
	$.ajax({
		url : "http://www.postosgazoli.com.br/app/func-vcreporter.php",
		type : "post",
		crossDomain: true,
		timeout: 30000,
		processData: true,
		data : {"imagem" : str, "nome": nome, "email": email, "localizacao": localizacao, "mensagem": mensagem, "telefone": telefone, "celular": celular},
		dataType : "json",
		complete: function(){
			$('.envia').show();
			$('.loading_vc_reporter').hide();

			$('#imagens-selecionadas').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 500);
			$('#imagens-selecionadas').html('');
			$('textarea.gerado').remove();
		
		$("<div title='Enviado'></div>").dialog({
		   open: function(event, ui) { $(this).html('<span style="text-align:"center;">Enviado com sucesso!</span>'); $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
			show: { effect: "fade", duration: 300 },
			buttons: [
			{
			  text: "Voltar",
			  click: function() {
				$( this ).dialog("close");
				abre_Home();
			  }
			}
		  ]
		});	


		  }			
		});	
	},
	error: function() {
		sem_Conexao();
	}
});		

}
});

function readImage(input, name) {
    if ( input.files && input.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
			var id = Math.floor(Math.random()*50);
            $('.textareas').append('<textarea style="display:none;" name="imagens[]" class="gerado" alt="'+name+'" id="textarea_'+id+'">'+e.target.result+'</textarea>');
			$('#imagens-selecionadas').html('');
			$('textarea.gerado').each(function(){
			$('#imagens-selecionadas').show("fade", { direction: "up", easing: 'easeInOutBack' }, 1000);
			$('#imagens-selecionadas').append('<div class="limpar" id="'+$(this).attr('id')+'">( x ) ' +$(this).attr('alt')+'</div>');

			$('.limpar').unbind("click");
			$(".limpar").click(function(){
						var data = $(this).attr('id');
						$(this).remove();
						$('#'+data+'').remove();						
						if($('textarea.gerado').length == 0){
							$('#imagens-selecionadas').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 500);
						}
			});

			});
        };       
        FR.readAsDataURL( input.files[0] );
    }

}

$('input[type=file]').bind('change', function() {
	if($('textarea.gerado').length == 4){
		alerta('Limite de 4 imagens excedido');
	}
	else{
				for (var i = 0; i < $(this).get(0).files.length; ++i) {
				var ext = $(this).get(0).files[i].name.slice($(this).get(0).files[i].name.lastIndexOf('.'));
				if((ext != '.jpg') && (ext != '.jpeg')){
					alerta('Apenas imagens JPEG.');
				}
				else if(($(this).get(0).files[i].size) > 500000){
					alerta('A imagem não pode passar de 500kb');
				}
				else{
					readImage(this, $(this).get(0).files[i].name);
				}
			}
		}
});



var noticias = ["0"];
$('#content').scroll(function(){
        if($("#noticias").css('display') != 'none'){
		var elem = $('#content');            
		if (elem.scrollTop() > 0 && 
				(elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight())) {
				var t = $('#qtd-noticia').val();
					if(t != 0){
						setTimeout(outras_Noticias, 1500);
					}
				
    	}
	}
})

$('#stop').hide();



$(".localizacao").click(function(e){
e.preventDefault();
$('.localizacao').attr('src', 'imagens/loader.gif');
navigator.geolocation.getCurrentPosition(function(position)
{
var location = [position.coords.latitude, position.coords.longitude];
var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + ","+position.coords.longitude+"&sensor=true&language=pt";
var p = $.getJSON(url, function (data) {
    for(var i=0;i<data.results.length;i++) {
        var rua = data.results[0].formatted_address;
    }
	$('.localizacao').attr('src', 'imagens/localizacao.png');
	$('#localizacao_reporter').val(rua);
	$('#localizacao_reporter').show();	
});

},
function(error)
{
	alerta('Seu GPS está desligado.');
	$('#localizacao_reporter').show();
	$('#localizacao_reporter').val('Informe a localização');
	$('.localizacao').attr('src', 'imagens/localizacao.png');
	return false;
}, 
{ enableHighAccuracy: true, maximumAge: 3000, timeout: 60000 });
return false;
});



$("#faixa").click(function(e){
	var posX = $(this).offset().left;
	var pos = Math.min(Math.max((e.pageX - posX) / $(this).width() * 100, 0), audio.duration);
	if(!isNaN(pos))
	audio.setPosition(Math.round(pos*audio.duration/100));
});
$("#proximo").click(function() {
	var tracks = $('#tracks').val();
	var tracks = tracks.split(',');
	var num = $('#playing').val();
	soundManager.destroySound('podcast');
	var track = tracks[($.inArray(num, tracks) + 1) % tracks.length]; 
	info_Track(track);
	$('#playing').val(track);
	$('#play').hide();
	$('#stop').show();
	playAudio(track);
	
});

$("#repetir").click(function() {
	if($('#loop').val() == 0){
		$('#loop').val('1'); 
		$('img#repetir').css('opacity', '1');
		$('img#repetir').css({'filter':'alpha(opacity=1)'});
		$('#random').val('0'); 
		$('img#aleatorio').css('opacity', '0.3');
		$('img#aleatorio').css({'filter':'alpha(opacity=30)'});		
	}
	else{
		$('#loop').val('0'); 
		$('img#repetir').css('opacity', '0.3');
		$('img#repetir').css({'filter':'alpha(opacity=30)'});		
	}
});


$("#aleatorio").click(function() {
	if($('#random').val() == 0){
		$('#random').val('1'); 
		$('#loop').val('0'); 
		$('img#repetir').css('opacity', '0.3');
		$('img#repetir').css({'filter':'alpha(opacity=30)'});		
		$('img#aleatorio').css('opacity', '1');
		$('img#aleatorio').css({'filter':'alpha(opacity=1)'});
	}
	else{
		$('#random').val('0'); 
		$('img#aleatorio').css('opacity', '0.3');
		$('img#aleatorio').css({'filter':'alpha(opacity=30)'});		
	}
});


$("#anterior").click(function() {
	var tracks = $('#tracks').val();
	var tracks = tracks.split(',');
	var num = $('#playing').val();
	soundManager.destroySound('podcast');
	var track = tracks[($.inArray(num, tracks) - 1 + tracks.length) % tracks.length];
	info_Track(track);
	$('#playing').val(track);
	$('#play').hide();
	$('#stop').show();
	playAudio(track);
});

$("#stop").click(function() {
	$('.loaded').html('pausado');
	soundManager.pauseAll();
	$('#stop').hide();
	$('#play').show();
});

$('#play').click(function(){
	$('.loaded').html('tocando');
	var num = $('#playing').val();
	if (audio.playState === 1) {
		soundManager.pauseAll();
		soundManager.play("podcast");
		$('#play').hide();
	    $('#stop').show();
	}
	else{
		playAudio(num);
     	$('#stop').show();
		$('#play').hide();
	}
});

function info_Track(track){ // Função para bucar dados do que está tocando no Podcast
$.ajax({
	url: 'http://www.postosgazoli.com.br/app/func-infotrack.php?track='+track+'&nocache=' + (new Date()).getTime(),
	cache:false,
	dataType: 'jsonp',
	jsonp: 'callback',
	timeout: 10000,
	success: function(results){
		$('.ordena-podcast').html("");
		var arrayLength = results.data.length;
		for (var i = 0; i < arrayLength; i++) {
			if(results.data[i].status != null){
				if(results.data[i].status == 1){ //Se retornou positivo
				$('#desc-playing').val(''+results.data[i].titulo+' - '+results.data[i].descricao+''); //Salva pra exibir no menu podcast quem está tocando
					$('.nome-comentarista').text(''+results.data[i].titulo+'');
					if($(window).width() > 768){
						$('.nome-comentario').text(''+results.data[i].descricao.substr(0, 30)+' ...');
					}
					else{
						$('.nome-comentario').text(''+results.data[i].descricao.substr(0, 18)+' ...');
					}

				}
			}
		}
	
	},
	error: function() {
		sem_Conexao();
	}
});		

}


function playAudio(track){
	stopRadio();
	$('.loaded').html('carregando...');
	$(".progBar").css('width', '0');
	var track = 'http://api.soundcloud.com/tracks/'+track+'/stream?client_id=1c82aa5bb56619ce7cb8c1c223ca19f6';
    soundManager.onready(function() {
        audio = soundManager.createSound({
            id: 'podcast',
			debugMode: false,
            url: track,
			multiShot: false,
            autoLoad: false,
            autoPlay: false,
				whileplaying: function() {
				if (audio.playState === 1) {
					$('.loaded').html('tocando');
				}
					$(".progBar").css('width', ((this.position/this.duration) * 100) + '%');
					var duracao = this.duration;
					$('.duracao').html(seg(this.duration));
					$('.decorrido').html(seg(this.position));
						$('#play').hide();
						$('#stop').show();
				},
            onfinish: function(){
				$('.loaded').html(' ');
				$(".progBar").css('width', '0');
				if($('#loop').val() == 1){
					playAudio(track);					
				}
				else if($('#random').val() == 1){
						$('#play').hide();
						$('#stop').show();
					soundManager.destroySound('podcast');
					var randomize = $('#tracks').val();
					var randomize = randomize.split(',');
					var randomize = randomize[Math.floor(Math.random()*randomize.length)];
					playAudio(randomize);
					info_Track(randomize);
				}
				else{
						$('#play').show();
						$('#stop').hide();
					soundManager.destroySound('podcast');
				}
            }
        })
    });
	soundManager.play("podcast");
}

$('.playRadio').on('click', function(e) {
	playRadio();
});


$('.loadingRadio').on('click', function(e) {
	stopRadio();
});


$('.stopRadio').on('click', function(e) {
	stopRadio();
});


function stopRadio(){
	$('.playRadio').show();
	$('.loadingRadio').hide();
	$('.stopRadio').hide();
	soundManager.destroySound('playerRadio');
}



$('.home').on('click', function(e) {
	abre_Home(e);
	
	$('#pagina-atual').val('home');
});

function sem_Conexao(e){
$("<div title='Sem conexão'></div>").dialog({
   open: function(event, ui) { $(this).html('<span style="text-align:"center;">Conecte-se para utilizar esta função.</span>'); $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
	show: { effect: "fade", duration: 300 },
	buttons: [
    {
      text: "Voltar",
      click: function() {
        $( this ).dialog("close");
		abre_Home();
      }
    }
  ]
});	
}


function alerta(e){
$("<div title='Aviso'></div>").dialog({
   open: function(event, ui) { $(this).html('<span style="text-align:"center;">'+e+'</span>'); $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
	show: { effect: "fade", duration: 300 },
	buttons: [
    {
      text: "Ok",
      click: function() {
        $( this ).dialog("close");
      }
    }
  ]
});	
}



function abre_Home(){
$("#footer ul li").removeClass('menu-home-ativo');
$("#footer ul li").removeClass('menu-ativo');
$("#footer ul li").removeClass('menu-msg-ativo');
$('.bt-home').addClass('menu-home-ativo');

$('#pagina-atual').val('home');	
$("#voltar-header").hide();
$('.header-controls').hide();

var hideDeffered = $('#notificacoes, #podcast, #radio, #podcast-player, #noticias, #abre-noticia, #mensagem, #vc-reporter').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
hideDeffered.promise().done(function() {
	$('#titulo-header').text("");
	$('#home').show("fade", { direction: "right", easing: 'easeInOutBack' }, 1000);
});	
}
 

 

$('.posto').on('click', function(e) {

$('#pagina-atual').val('POSTOS GAZOLI');
$('#titulo-header').html("<div style='margin-left: -70px;height: 35px;'>POSTOS GAZOLI</div>");
$('.header-controls').hide();
$("#voltar-header").hide();
	e.preventDefault();
	var hideDeffered = $('#notificacoes, #vc-reporter, #podcast, #home, #podcast-player, #noticias, #abre-noticia, #radio, #mensagem').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
	hideDeffered.promise().done(function() {
		$('#posto').show("fade", { direction: "right", easing: 'easeInOutBack' }, 1000);
  });



});



$('.mensagem').on('click', function(e) {

	
var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
$('#os').val(deviceType);
$('#pagina-atual').val('mensagem');
$('#titulo-header').html("<div style='margin-left: -30px;height: 35px;'>Mensagem</div>");
$('.header-controls').hide();
$("#voltar-header").hide();
	e.preventDefault();
	var hideDeffered = $('#notificacoes, #podcast, #home, #podcast-player, #noticias, #abre-noticia, #radio, #vc-reporter').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
	hideDeffered.promise().done(function() {
	
		$('#mensagem').show("fade", { direction: "right", easing: 'easeInOutBack' }, 1000);
  });
});


$('.vc-reporter').on('click', function(e) {

$('#pagina-atual').val('voce_reporter');
$('#titulo-header').html("<div style='margin-left: -30px;height: 35px;'>Você Repórter</div>");
$('.header-controls').hide();
$("#voltar-header").hide();
	e.preventDefault();
	var hideDeffered = $('#notificacoes, #podcast, #home, #podcast-player, #noticias, #abre-noticia, #radio, #mensagem').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
	hideDeffered.promise().done(function() {
		$('#vc-reporter').show("fade", { direction: "right", easing: 'easeInOutBack' }, 1000);
  });
});

$('.notificacoes').on('click', function(e) {

$('#pagina-atual').val('notificacoes');
$('#titulo-header').html("<div style='margin-left: -70px;height: 35px;'>Notificações</div>");
$('.header-controls').hide();
$("#voltar-header").hide();
	e.preventDefault();
	var hideDeffered = $('#notificacoes, #vc-reporter, #podcast, #home, #podcast-player, #noticias, #abre-noticia, #radio, #mensagem').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
	hideDeffered.promise().done(function() {
		$('#notificacoes').show("fade", { direction: "right", easing: 'easeInOutBack' }, 1000);
  });
});

if((localStorage.getItem('notificacoes') == '')|| (localStorage.getItem('notificacoes') == null)){
$('.radios').html('<input type="radio" id="radio1" name="radio" value="" checked="checked"><label for="radio1">Sim</label><input type="radio" id="radio2" name="radio" value="1"><label for="radio2">Não</label>');
$(".radios").buttonset();

}
else{
$('.radios').html('<input type="radio" id="radio1" name="radio" value=""><label for="radio1">Sim</label><input type="radio" id="radio2" name="radio" value="1" checked="checked"><label for="radio2">Não</label>');	
$(".radios").buttonset();
}



var applaunchCount = window.localStorage.getItem('launchCount'); /* SE FOR A PRIMEIRA INICIAÇÃO DO APP, FAÇA*/
if(applaunchCount){
}else{
$("<div title='Confirmação'></div>").dialog({
   open: function(event, ui) { $(this).html('<span style="text-align:"center;">Deseja receber noficiações no aplicativo?</span>'); $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
	show: { effect: "fade", duration: 300 },
buttons: {
		"Não": function() {
            localStorage.setItem('notificacoes', 1);
			$(this).dialog( "close" );
$('#menu-box').hide();
$('#menu-box').show();
$("#menu-box").delay(1500).effect("pulsate",{ times:5}, 2500).delay(1400).fadeOut(1000);
			
		},
		"Sim": function() {
            localStorage.setItem('notificacoes', '');
			$(this).dialog( "close" );
$('#menu-box').hide();
$('#menu-box').show();
$("#menu-box").delay(1500).effect("pulsate",{ times:5}, 2500).delay(1400).fadeOut(1000);

		}
	}

});		 	
  window.localStorage.setItem('launchCount',1);
}



$('input[type=radio][name=radio]').change(function() {
        if (this.value == '') {
			alerta('Você agora receberá notificações, reinicie o aplicativo.');
            localStorage.setItem('notificacoes', '');
			Pushbots.tag("active");
        }
        else if (this.value == 1) {
			alerta('Você não receberá notificações, reinicie o aplicativo.');
            localStorage.setItem('notificacoes', 1);
			Pushbots.tag("inactive");
        }
    });

$('.noticias').on('click', function() {
	
	$('#pagina-atual').val('noticia');
	pagina_Noticia();
});

function pagina_Noticia(){
$('#pagina-atual').val('noticia');
$("#voltar-header").hide();

var t = $('#qtd-noticia').val();
if(t == 0){
	outras_Noticias();
}

var hideDeffered = $('#notificacoes, #home, #podcast, #radio, #podcast-player, #abre-noticia, #mensagem, #vc-reporter').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
hideDeffered.promise().done(function() {
	$('#titulo-header').html("<div style='margin-left: -30px;height: 35px;'>Notícias</div>");
	$('.header-controls').show();
	$('#noticias').show("fade", { direction: "right", easing: 'easeInOutBack' }, 1000,function(){
		if($("#status-noticia").val() != 1){
			$('.carrega_noticia').show("fade", { direction: "up", easing: 'easeInOutBack' }, 1000); // Abre o Loader
			$.ajax({
				url: 'http://www.postosgazoli.com.br/app/func-destaque.php?nocache=' + (new Date()).getTime(),
				cache:false,
				dataType: 'jsonp',
				jsonp: 'callback',
				timeout: 10000,
				success: function(results){
					var likes = JSON.parse(localStorage.likes); // PEGA O ARRAY
					$('.carrega_noticia').hide(); // Fecha o loader...
					var arrayLength = results.data.length;
					for (var i = 0; i < arrayLength; i++) {

						if(results.data[i].status != null){
							if(likes.indexOf(results.data[i].id_real) != -1){
								var img_curtir = 'imagens/curtiu.png';
							}else{
								var img_curtir = 'imagens/curtir.png';
							}
							
							
							if($(window).width() < 360){
								var titulo = results.data[i].titulo.substr(0, 115);
							}
							else{
								var titulo = results.data[i].titulo;
							}
							if(results.data[i].status == 1){ //Se retornou positivo	
							
								$('.homepage-slider').append('<div><div class="overlay"></div><div class="homepage-slider-caption homepage-left-caption abre-destaque" data-canal="'+results.data[i].canal+'" data-tipo="destaque" data-id="'+results.data[i].id_real+'" data-mes="'+results.data[i].mes+'" data-url="'+results.data[i].url+'" data-titulo="'+results.data[i].titulo+'"><h3>'+titulo+'</h3></div><img class="responsive-image fakeClass abre-destaque" data-canal="'+results.data[i].canal+'" data-tipo="destaque" data-id="'+results.data[i].id_real+'" data-mes="'+results.data[i].mes+'" data-url="'+results.data[i].url+'" data-titulo="'+results.data[i].titulo+'" style="background-image:url('+results.data[i].url+');" src="imagens/mask-destaque.png" alt="img"><div class="rodape-slide">'+results.data[i].canal+' <div class="rodape-slide-data">'+results.data[i].mes+' <img class="I'+results.data[i].id_real+'" id="'+results.data[i].id_real+'" src="'+img_curtir+'" width="13"/> <span class="L'+results.data[i].id_real+'">'+results.data[i].likes+'</span></div></div></div>');
							}
						}
					}
					$('#noticia_show').show();
					$('.carrega_noticia').hide();
					$(".homepage-slider").owlCarousel({
							slideSpeed : 300,
							paginationSpeed : 500,
							singleItem : true,
							pagination:false,
							afterInit : progressBar,
							afterMove : moved,
							startDragging : pauseOnDragging
						});
						$("#status-noticia").val(1);
						$('.abre-destaque').click(function(e){
							var id = $(this).attr('data-id');
							var src = $(this).attr('data-url');
							var titulo = $(this).attr('data-titulo');
							var tipo = $(this).attr('data-tipo');
							var mes = $(this).attr('data-mes');
							var canal = $(this).attr('data-canal');

							abre_Noticia(id, src, titulo, tipo, mes, canal);
						});			
				},
				error: function() {
					sem_Conexao();
				}
			});		
		}
	});
});
};


function outras_Noticias(z){
var t = $('#qtd-noticia').val();

if(t != 0){$('.linha-noticia:last').after('<div class="linha-noticia carregando"><div class="desc-noticia-lista">Carregando...</div></div>');}
if (z == 1){
	var t = 0;	
}
$.ajax({
	url: 'http://www.postosgazoli.com.br/app/func-noticia.php?t='+t+'&nocache=' + (new Date()).getTime(),
	cache:false,
	dataType: 'jsonp',
	jsonp: 'callback',
	timeout: 10000,
	success: function(results){
		var arrayLength = results.data.length;
		var likes = JSON.parse(localStorage.likes); // PEGA O ARRAY
		for (var i = 0; i < arrayLength; i++) {
			if(results.data[i].status != null){

				if(results.data[i].status == 1){ //Se retornou positivo	
			
						if(likes.indexOf(results.data[i].id) != -1){
							var img_curtir = 'imagens/curtiu.png';
						}else{
							var img_curtir = 'imagens/curtir.png';
						}
												
					$('#lista-noticia').append('<div class="linha-noticia abre-noticia" data-canal="'+results.data[i].canal+'"data-mes="'+results.data[i].mes+'" data-tipo="normal" data-id="'+results.data[i].id+'" data-url="'+results.data[i].url+'" data-titulo="'+results.data[i].titulo+'"><div class="foto-noticia-lista"><img style="background-image:url('+results.data[i].url+');" src="imagens/mask-not.png"></div><div class="desc-noticia-lista">'+results.data[i].titulo+'</div><div class="rodape-noticia-lista">'+results.data[i].mes+' <img class="I'+results.data[i].id+'" id="'+results.data[i].id+'" src="'+img_curtir+'" width="13"/> <span class="L'+results.data[i].id+'">'+results.data[i].likes+'</span></div></div>');
				}
			}
		}
		var calc = parseInt($('#qtd-noticia').val());
		var sum = (calc + 10);
		noticias.push(sum);
		$('#qtd-noticia').val(sum);
		$('.carregando').remove();	
		$('.abre-noticia').unbind("click");
		$('.abre-noticia').click(function(e){
			var id = $(this).attr('data-id');
			var src = $(this).attr('data-url');
			var titulo = $(this).attr('data-titulo');
			var tipo = $(this).attr('data-tipo');
			var mes = $(this).attr('data-mes');
			var canal = $(this).attr('data-canal');

			abre_Noticia(id, src, titulo, tipo, mes, canal);
		});	

			
	},
	error: function() {
	}
});
}
	
function abre_Noticia(id,img,titulo,tipo,mes,canal){
$("#voltar-header").removeClass();
$("#voltar-header").addClass('lista-noticia');
$('#voltar-header').show();
$('#pagina-atual').val('abre_noticia');
	
if(tipo == "normal"){
	var img = img.substring(0,img.length - 5) + '-4.jpg';
}

$.ajax({
	url: 'http://www.postosgazoli.com.br/app/func-detalhe-noticia.php?id='+id+'&nocache=' + (new Date()).getTime(),
	cache:false,
	dataType: 'jsonp',
	jsonp: 'callback',
	timeout: 10000,
	success: function(results){
		var arrayLength = results.data.length;
		var likes = JSON.parse(localStorage.likes); // PEGA O ARRAY
		for (var i = 0; i < arrayLength; i++) {
			if(results.data[i].status != null){
				if(results.data[i].status == 1){ //Se retornou positivo
				
				if(likes.indexOf(results.data[i].id) != -1){
					var img_curtir = 'imagens/curtiu.png';
				}else{
					var img_curtir = 'imagens/curtir.png';
				}
				
				
				var titulo = results.data[i].titulo;
				var texto = results.data[i].texto;
			$('#abre-noticia').show("fade", { direction: "down", easing: 'easeInOutBack' }, 700)		
				$('#abre-noticia').html('<div id="noticias-abertas"><img style="background-image:url('+img+');" src="imagens/mask-destaque.png" width="100%"/><div class="rodape-slide">'+canal+' <div class="rodape-slide-data interna-img">'+mes+' <img class="img_like" id="'+results.data[i].id+'" src="'+img_curtir+'" width="13" style="min-height: 12px"/> <span class="likes-interna">'+results.data[i].likes+'</span></div></div><div id="texto-noticia"><h3>'+titulo+'</h3>'+texto+'</div></div>');



$('.img_like').on('click', function() {
		var id = $(this).attr('id');
		var likes = JSON.parse(localStorage.likes); // PEGA O ARRAY
		var tem = likes.indexOf($(this).attr('id'));

		if(tem > -1) {
			$(this).attr('src', 'imagens/curtir.png');
			$('.I'+id+'').attr('src', 'imagens/curtir.png');
			var likes = JSON.parse(localStorage.likes); // PEGA O ARRAY
			var i = likes.indexOf(id); // PROCURA SE JÁ TEM O ITEM NO ARRAY
			likes.splice(i, 1);
			var urllike = 'http://www.postosgazoli.com.br/app/func-like.php?id='+id+'&t=d&nocache=';
		}
		else{
			$(this).attr('src', 'imagens/curtiu.png');
			$('.I'+id+'').attr('src', 'imagens/curtiu.png');
			var id = $(this).attr('id');
			var likes = JSON.parse(localStorage.likes); // PEGA O ARRAY
			likes.push(id);	
			localStorage.likes = JSON.stringify(likes);
			var urllike = 'http://www.postosgazoli.com.br/app/func-like.php?id='+id+'&t=s&nocache=';
		}
		
	localStorage.likes = JSON.stringify(likes);


$.ajax({
	url: urllike + (new Date()).getTime(),
	cache:false,
	dataType: 'jsonp',
	jsonp: 'callback',
	timeout: 10000,
	success: function(results){
		var arrayLength = results.data.length;
		for (var i = 0; i < arrayLength; i++) {
			if(results.data[i].status != null){
				if(results.data[i].status == 1){ //Se retornou positivo
					$('.likes-interna').html(results.data[i].likes);
					$('.L'+id+'').html(results.data[i].likes);

				}
			}
		}
	
	},
	error: function() {
		alerta('Conexão lenta');
	}
});		



});


				}
			}
		}
	
	},
	error: function() {
		sem_Conexao();
	}
});		


	var hideDeffered = $('#notificacoes, #home, #radio, #podcast, #noticias, #podcast-player, #mensagem, #vc-reporter').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
		hideDeffered.promise().done(function() {
			});


}


function pega_Podcast(){
	
if($('#playing').val() != ''){
$('.ordena-podcast').html('');
$('.ordena-podcast').prepend('<li class="audio-ativo">\
<div class="icone-audio"><img src="imagens/podcast.png"/></div><div class="desc-audio" style="margin-left: 40px;">'+$('#desc-playing').val()+'</div></li>');
}
$('.ordena-podcast').append("<div class='carregando' style='margin: 0 auto;width: 31px;'><img src='imagens/loader.gif'/></div>");

$.ajax({
	url: 'http://www.postosgazoli.com.br/app/func-podcast.php?nocache=' + (new Date()).getTime(),
	cache:false,
	dataType: 'jsonp',
	jsonp: 'callback',
	timeout: 10000,
	success: function(results){
		$('.carregando').hide();
		var arrayLength = results.data.length;
		for (var i = 0; i < arrayLength; i++) {
			if(results.data[i].status != null){
				if(results.data[i].status == 1){ //Se retornou positivo
				if(results.data[i].array != null){
					$('#tracks').val(results.data[i].array);
				}
				if($('#playing').val() != results.data[i].track){
				if(results.data[i].descricao != ''){
				$('.ordena-podcast').append('<li class="faixa-play" data-titulo="'+results.data[i].titulo+'"  data-track="'+results.data[i].track+'" data-descricao="'+results.data[i].titulo+' - '+results.data[i].descricao+'" data-url="'+results.data[i].url+'">\
                <div class="icone-play"><img src="imagens/ir-podcast.png"/></div><div class="desc-audio">'+results.data[i].titulo+' - '+results.data[i].descricao+'</div></li>');						
						}
					}
				}
			}			
		}
		
  	$('.audio-ativo').on('click', function(e) {
	$("#voltar-header").removeClass();
	$("#voltar-header").addClass('lista-podcast');
	$('#voltar-header').show();

		var hideDeffered = $('#notificacoes, #home, #radio, #podcast, #noticias, #abre-noticia, #mensagem, #vc-reporter').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
		hideDeffered.promise().done(function() {
			$('#podcast-player').show("fade", { direction: "down", easing: 'easeInOutBack' }, 700)});
			$('#pagina-atual').val('abre_podcast');
	});


  	$('.faixa-play').on('click', function(e) {
		$('.header-controls').show();
		var nome = $(this).attr('data-titulo');
		var descricao = $(this).attr('data-descricao');
		var track = $(this).attr('data-track');
		$('.nome-comentarista').text(''+nome+'');
		if($(window).width() > 768){
		$('.nome-comentario').text(''+descricao.substr(0, 30)+' ...');
		}
		else{
		$('.nome-comentario').text(''+descricao.substr(0, 18)+' ...');
		}
		var hideDeffered = $('#notificacoes, #home, #radio, #podcast, #noticias, #abre-noticia, #mensagem, #vc-reporter').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
		hideDeffered.promise().done(function() {
			$('#titulo-header').html("<div style='margin-left: -30px;height: 35px;'>Podcast</div>");
			$('#podcast-player').show("fade", { direction: "down", easing: 'easeInOutBack' }, 700, function() {
				$('#pagina-atual').val('abre_podcast');
				$('#podcast-player').html();
					$('#playing').val(track);						
					$('#desc-playing').val(descricao);
					if (audio.playState === 1) {
							stopRadio();
							soundManager.destroySound('podcast');
							soundManager.pauseAll();
							$('#play').hide();
							$('#stop').show();
							playAudio(track);
							}
					});
					
			});
	$("#voltar-header").removeClass();
	$("#voltar-header").addClass('lista-podcast');
	$('#voltar-header').show();

	});
	
	},
	error: function() {
		sem_Conexao();		
	}
});		
}

function playRadio(){
	stopRadio();
	$('.playRadio').hide();
	$('.loadingRadio').show();
	$('.stopRadio').hide();

	soundManager.pauseAll();
	
	var track = 'http://audio.postosgazoli.net.br:8000/;stream.mp3';
    soundManager.onready(function() {
        audio = soundManager.createSound({
            id: 'playerRadio',
			debugMode: true,
            url: track,
			multiShot: false,
            autoLoad: false,
            autoPlay: false,
			onload: function() {
					$('.playRadio').hide();
					$('.loadingRadio').hide();
					$('.stopRadio').show();

			   },
        })
    });
	soundManager.play("playerRadio");
	

	
	
}



$('#voltar-header img').on('click', function(e) {
	if($('#voltar-header').attr('class') == 'lista-podcast'){
		abre_Podcast();
		$('#pagina-atual').val('podcast');
	}
	else{
		pagina_Noticia();
		$('#pagina-atual').val('noticia');
	}
});


  //Remove 300ms lag set by -webkit-browsers     
    window.addEventListener('load', function() {
		FastClick.attach(document.body);
	}, false);	
    
    
    //Slide Menu Settings//
    $('.open-slide').click(function(){
        $('.menu-wrapper em').delay(2500).slideUp(300);
        $(this).toggleClass('active-slide');
        $('.header').toggleClass('move-header');
    });
    
    $('.menu-wrapper').addClass('hide-menu-wrapper');
    var menu_slider = $(".menu");
    menu_slider.owlCarousel({
        autoPlay: false, //Set AutoPlay to 3 seconds
        scrollPerPage:true,
        pagination:false,
        rewindSpeed:0,
        items : 15,
        itemsDesktop : [1199,6],
        itemsDesktopSmall : [979,5],
        itemsTablet:	[768,4],
        itemsMobile:	[560,3]//,
        //afterInit : function(elem){
        //     this.jumpTo(0); //for 4th slide
        //}
    });
    
    var selected_menu_item = document.getElementById( "selected" );
    var selected_menu_item_number = ($( ".menu a" ).index( selected_menu_item ) );
    menu_slider.trigger('owl.jumpTo', selected_menu_item_number);
    
    console.log(selected_menu_item_number);
    
    var scl=0; // Create a variable
    window.setInterval(function(){
       scl=0; // Reset this variable every 0.5 seconds
    }, 500);

    $('.menu').on('DOMMouseScroll mousewheel', function (e) { 
        if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
        while(scl==0) { 
            menu_slider.trigger('owl.next');
            scl++;
        }
    } else {
        while(scl==0) { 
            menu_slider.trigger('owl.prev');
            scl++;
        }
    }
    });
        
    //Sidebar Menu Settings//
    
    $('.deploy-submenu').click(function(){
        $(this).toggleClass('active-submenu');
        $(this).parent().find('.submenu').toggleClass('active-submenu-items');
        return false;
    });

	$('.swipebox').click(function(){ 
		$('.gallery').hide(0);
		$('.portfolio-wide').hide(0);
	});

	$('.open-menu').click(function() {
		$('#menu-box').hide();
        $(this).toggleClass('active-slide');
		$('.menu-controls').effect("highlight", {}, 500);
		if( snapper.state().state=="left" ){
			snapper.close();
			if(($("#radio").css('display') != 'none') || ($("#radio").css('display') != 'none')){
				
			}			
		} else {
			snapper.open('left');
			if(($("#radio").css('display') != 'none') || ($("#radio").css('display') != 'none')){
				
			}
		}
		return false;
	});	


    $('.caixa-busca').click(function() {
		return false;
	});
	
	$( ".caixa-busca" ).keyup(function() {
	  var chr = $(this).val().length;
	  	if(chr == 0){
			$('.side-busca span').text("Digite a sua busca");
			$('#resultado').html('');

		}
		else if((chr > 0) && (chr < 5)){
			$('.side-busca span').text("5 caracteres ou mais.");
			$('#resultado').html('');

		}
		else{
			$('.side-busca span').text("Localizando...");
			if(($("#noticias").css('display') != 'none') || ($("#abre-noticia").css('display') != 'none')){
				localiza_Noticia($(this).val());
			}
			else{
				localiza_Podcast($(this).val());				
			}
		}
	});


function localiza_Noticia(noticia){
$('#resultado').html('<div class="sidebar-divider side-resultado"><img src="imagens/loader-busca.gif" style="margin:0 auto;"/></div>');	
$.ajax({
	url: 'http://www.postosgazoli.com.br/app/func-buscanoticia.php?texto='+noticia+'&nocache=' + (new Date()).getTime(),
	cache:false,
	dataType: 'jsonp',
	jsonp: 'callback',
	timeout: 10000,
	success: function(results){
		$('#resultado').html('');
		var arrayLength = results.data.length;
		for (var i = 0; i < arrayLength; i++) {
			if(results.data[i].status != null){
				
				if(results.data[i].status == 1){ //Se retornou positivo
					$('.side-busca span').text("Exibindo resultados.");

					$('#resultado').append('<div class="sidebar-divider side-resultado abre-noticia" data-canal="'+results.data[i].canal+'" data-tipo="destaque" data-id="'+results.data[i].id+'" data-mes="'+results.data[i].mes+'" data-url="'+results.data[i].url+'" data-titulo="'+results.data[i].titulo+'">\
    <span>'+results.data[i].titulo+'</span>\
</div>');
				}
				else{
					$('#resultado').html('');
					$('.side-busca span').text("Nenhum resultado encontrado.");
				}
			}
		}
		$('.abre-noticia').unbind("click");
		$('.abre-noticia').click(function(e){
			var id = $(this).attr('data-id');
			var src = $(this).attr('data-url');
			var titulo = $(this).attr('data-titulo');
			var tipo = $(this).attr('data-tipo');
			var mes = $(this).attr('data-mes');
			var canal = $(this).attr('data-canal');

			abre_Noticia(id, src, titulo, tipo, mes, canal);
		});	

			
	},
	error: function() {
		sem_Conexao();
	}
});
}

function localiza_Podcast(termo){
$('#resultado').html('<div class="sidebar-divider side-resultado"><img src="imagens/loader-busca.gif" style="margin:0 auto;"/></div>');	
$.ajax({
	url: 'http://www.postosgazoli.com.br/app/func-buscapodcast.php?termo='+termo+'&nocache=' + (new Date()).getTime(),
	cache:false,
	dataType: 'jsonp',
	jsonp: 'callback',
	timeout: 10000,
	success: function(results){
		$('#resultado').html('');
		var arrayLength = results.data.length;
		for (var i = 0; i < arrayLength; i++) {
			if(results.data[i].status != null){
				
				if(results.data[i].status == 1){ //Se retornou positivo
					$('.side-busca span').text("Exibindo resultados.");

					$('#resultado').append('<div class="sidebar-divider side-resultado faixa-play" data-titulo="'+results.data[i].titulo+'"  data-track="'+results.data[i].track+'" data-descricao="'+results.data[i].descricao+'" data-url="'+results.data[i].url+'">\
                <div class="desc-audio">'+results.data[i].descricao+'</div></div>');
				}
				else{
					$('#resultado').html('');
					$('.side-busca span').text("Nenhum resultado encontrado.");
				}
			}
		}

  	$('.faixa-play').on('click', function(e) {
		$('.header-controls').show();
		var nome = $(this).attr('data-titulo');
		var descricao = $(this).attr('data-descricao');
		var track = $(this).attr('data-track');
		$('.nome-comentarista').text(''+nome+'');
		if($(window).width() > 768){
		$('.nome-comentario').text(''+descricao.substr(0, 30)+' ...');
		}
		else{
		$('.nome-comentario').text(''+descricao.substr(0, 18)+' ...');
		}
		var hideDeffered = $('#notificacoes, #home, #radio, #podcast, #noticias, #abre-noticia, #mensagem, #vc-reporter').hide("fade", { direction: "up", easing: 'easeInOutBack' }, 50);
		hideDeffered.promise().done(function() {
			$('#titulo-header').html("<div style='margin-left: -30px;height: 35px;'>Podcast</div>");
			$('#podcast-player').show("fade", { direction: "down", easing: 'easeInOutBack' }, 700, function() {
				$('#pagina-atual').val('abre_podcast');
				$('#podcast-player').html();
					$('#playing').val(track);						
					$('#desc-playing').val(descricao);
					if (audio.playState === 1) {
							soundManager.destroySound('podcast');
							soundManager.pauseAll();
							$('#play').hide();
							$('#stop').show();
							playAudio(track);
							}
					});
					
			});

	});



	},
	error: function() {
	}
});
}

    
    $('.busca').click(function() {
		$('.caixa-busca').val('');
		$('#resultado').html('');
		$('.side-busca span').text("Digite a sua busca");
		$( ".caixa-busca" ).focus();
        $('.header, .menu-wrapper').removeClass('hide-header-left');
        $('.header, .menu-wrapper').addClass('hide-header-right');
        $('.menu-wrapper').addClass('hide-menu-wrapper'); 
        $('.open-slide').removeClass('active-slide');
		if( snapper.state().state=="right" ){
			snapper.close();
		} else {
			snapper.open('right');
			$("#box-atualizar").hide("fade", { direction: "top", easing: 'easeInOutBack' }, 700)			

		}
		return false;
	});
	
	$('.sidebar-close, .all-elements').click(function() {
        $('.header, .menu-wrapper').removeClass('hide-header-left');
        $('.header, .menu-wrapper').removeClass('hide-header-right');
        $('.menu-wrapper').addClass('hide-menu-wrapper');
        $('.open-slide').removeClass('active-slide');
		snapper.close();
	});

	var snapper = new Snap({
	  element: document.getElementById('content')
	});
    
    //Sharebox Settings//
        
	
	var time = 7; // time in seconds
	
	var $progressBar,
		$bar, 
		$elem, 
		isPause, 
		tick,
		percentTime;
	  
	
	//Init the carousel
	
	//Init progressBar where elem is $("#owl-demo")
	function progressBar(elem){
		$elem = elem;
		//build progress bar elements
		buildProgressBar();
		//start counting
		start();
	}
	
	//create div#progressBar and div#bar then prepend to $("#owl-demo")
	function buildProgressBar(){
		$progressBar = $("<div>",{
			id:"progressBar"
		});
		$bar = $("<div>",{
			id:"bar"
		});
		$progressBar.append($bar).prependTo($elem);
	}
	
	function start() {
		//reset timer
		percentTime = 0;
		isPause = false;
		//run interval every 0.01 second
		tick = setInterval(interval, 10);
	};
	
	function interval() {
		if(isPause === false){
			percentTime += 1 / time;
			$bar.css({
			   width: percentTime+"%"
			 });
			//if percentTime is equal or greater than 100
			if(percentTime >= 100){
			  //slide to next item 
			  $elem.trigger('owl.next')
			}
		}
	}
	
	//pause while dragging 
	function pauseOnDragging(){
		isPause = true;
	}
	
	//moved callback
	function moved(){
		//clear interval
		clearTimeout(tick);
		//start again
		start();
	}	
	});

}(jQuery));
