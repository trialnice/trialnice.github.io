function escuchar(tipo) {
	var tipo = tipo;

	var sonidograbando = document.getElementById("sonidograbando"); 

	recognition;
	recognizing = false;
	var idiomaR;

	switch(idioma_numeroR) {
	    case "0":
	        idiomaR = "en-US";
	        break;
        case "6":
	        idiomaR = "es-VE";
	        break;
        case "7":
	        idiomaR = "fr-FR";
	        break;
        case "8":
	        idiomaR = "hi-IN";
	        break;
        case "9":
	        idiomaR = "id-ID";
	        break;
        case "10":
	        idiomaR = "it-IT";
	        break;
        case "11":
	        idiomaR = "ja-JP";
	        break;
        case "12":
	        idiomaR = "ko-KR";
	        break;
        case "13":
	        idiomaR = "nl-NL";
	        break;
        case "14":
	        idiomaR = "pl-PL";
	        break;
        case "15":
	        idiomaR = "pt-BR";
	        break;
        case "16":
	        idiomaR = "ru-RU";
	        break;
        case "17":
	        idiomaR = "zh-CN";
	        break;
        case "18":
	        idiomaR = "zh-HK";
	        break;
        case "19":
	        idiomaR = "zh-TW";
	        break;
	    default:     
	}

	if (!('webkitSpeechRecognition' in window)) {
		if (microfono == 1) {alert("¡API de reconocimiento de voz no soportada!. Se recomienda usar Google chrome.");}
	} else {


		recognition = new webkitSpeechRecognition();
		recognition.lang = idiomaR;
		recognition.continuous = true;
		recognition.interimResults = true;

		var palabraescuchada = "";
		var continuarespera = 0;
		var variable_de_contador_espera = "";

		recognition.onstart = function() {
			if (tipo == 1) {sonidograbando.play(); };
			recognizing = true;
			console.log("empezando a eschucar");
		}

		var texto_respuesta_microfono = "";

		recognition.onresult = function(event) {
			console.log("estoy en funcion resultados");
			for (var i = event.resultIndex; i < event.results.length; i++) {

				if(event.results[i].isFinal){
					
						if ($("#volumen").val()==1) {
							texto_respuesta_microfono += event.results[i][0].transcript;
							microfono_error = 0;

							$("#respuesta").val(texto_respuesta_microfono);
							console.log(texto_respuesta_microfono);

							/*for (var p = respuestas_correctas.length - 1; p >= 0; p--) {


								console.log("estoy verificando la respuesta");

								var respuesta_correcta_simple_microfono = respuestas_correctas[p].replace(/\?|\.|\,|\¿|\!|\¡|\"|\'|\$|\#|\&|\%|\(|\)|\=|\$|\^|\~|\:|\;|\-|\_|\ /gi,"");
								var texto_respuesta_microfono1 = texto_respuesta_microfono.replace(/\?|\.|\,|\¿|\!|\¡|\"|\'|\$|\#|\&|\%|\(|\)|\=|\$|\^|\~|\:|\;|\-|\_|\ /gi,"");
								console.log(texto_respuesta_microfono1);
								console.log(respuesta_correcta_simple_microfono);
								
								if (texto_respuesta_microfono1 == respuesta_correcta_simple_microfono){ 
									
									siguiente_microfono();
								}
								else{

									respuesta_correcta_simple_microfono = respuestas_correctas[p].replace(/\?|\.|\,|\¿|\!|\¡|\"|\'|\$|\#|\&|\%|\(|\)|\=|\$|\^|\~|\:|\;|\-|\_|\ /gi," ");
									var texto_respuesta_microfono2 = texto_respuesta_microfono.replace(/\?|\.|\,|\¿|\!|\¡|\"|\'|\$|\#|\&|\%|\(|\)|\=|\$|\^|\~|\:|\;|\-|\_|\ /gi," ");

									var esperarsiguientepalabra = 0;

									texto_respuesta_microfono2 = texto_respuesta_microfono2.split(" ");
									respuesta_correcta_simple_microfono = respuesta_correcta_simple_microfono.split(" ");
									
									for (var p2 = 0; p2 < texto_respuesta_microfono2.length; p2++) {
									

										console.log(texto_respuesta_microfono2[p2]);
										console.log(respuesta_correcta_simple_microfono[p2]);

										if (texto_respuesta_microfono2[p2] == respuesta_correcta_simple_microfono[p2] ) {
											esperarsiguientepalabra = 1;
										}else{
											esperarsiguientepalabra = 0;
										}

										switch(texto_respuesta_microfono2[p2]) {
										    case "pause":
										    case "pausa":
										       pause2();
										        break;
										    default:
										}
									};

									if (esperarsiguientepalabra == 0) {
										siguiente_microfono();
									};
								}
							}*/	
					}else{
						texto_respuesta_microfono += event.results[i][0].transcript;
						microfono_error = 0;

						$("#respuesta").val(texto_respuesta_microfono);
						console.log(texto_respuesta_microfono);

					}
			    }    
			}
		}


		function continuaresperafuncion() {
			if (continuarespera == 1) {
				continuarespera = 0;
				$(".btn-pause").click();	
				
			};
		}

		function siguiente_microfono() {
			procesar();

			if (!texto_respuesta_microfono) {
				error();
			}else{
				texto_respuesta_microfono = "";
				$("#siguiente").submit();
			}

//		//	
		}
//
		recognition.onerror = function(event) {

			if (event.error == "not-allowed") {
				alert("Parece que no tiene ningun microfono conectado o ha bloqueado el acceso a el");
			}
			
			if (tipo == 0) {
				recognition.start();
				recognizing = true;	
			}else{
				console.log(event);
				console.log("estoy en error");
				console.log(event.error);

				error();	
			}


		}
//
		function error() {
			
			microfono_error = microfono_error + 1;

		 	if (microfono_error >2) {
		 		microfono_error = 0;
		 		pause2();
		 	}; 
	 		console.log("estoy en error");
	 		texto_respuesta_microfono = 'Respuesta no recibida';
	 		$("#respuesta").val('Respuesta no recibida'); 
	 		setTimeout(siguiente_microfono, 200);  
		}

		recognition.onend = function() {
			if (tipo == 0) {
				recognition.start();
				recognizing = true;	
			}
		}

		/*function submit() {
			
			$("#siguiente").submit();
		}*/

	}


	function procesar() {

		console.log("estoy en funcion procesar");


		if (recognizing == false) {
			recognition.start();
			recognizing = true;
		} else {
			recognition.stop();
			recognizing = false;
		}
	}

	procesar();		
	
	
}

	
