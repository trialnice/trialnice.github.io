function texto_a_voz_2() {


						
		//de aqui es de donde se agarra el texto
		utterThis = new SpeechSynthesisUtterance(texto_reproducir);
		var volumen = $("#volumen").val();
		utterThis.volume = volumen;

		//IDIOMA   : LA LISTA ESTA EN EL EJEMPLO :   https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
		var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

				//if (español==0) {
				//	for(i = 0; i < voices.length ; i++) {
				//		if(voices[i].name === selectedOption) {
				//		  utterThis.voice = voices[i];
				//		}
				//	}
				//}
				//if (español==0) {
				//	utterThis.voice = voices[6];
				//}

		utterThis.voice = voices[idioma_reproducir];
			
		if ((idioma_reproducir == "3" ) || (idioma_reproducir == "6")) {
			//configuracion de grosor de voz
			utterThis.pitch = pitch.value;

			
			//CONFIGURACION DE VELOCIDAD
			utterThis.rate = rate.value;	
		
		}else{
			//configuracion de grosor de voz
			utterThis.pitch = (parseInt(pitch.value))+tono_reproducir;
			//CONFIGURACION DE VELOCIDAD
			utterThis.rate = (parseInt(rate.value))-velocidad_reproducir;	
		}
			

		if (!(synth.pending)) {
			synth.speak(utterThis);
		}

		utterThis.onpause = function(event) {
		    var char = event.utterance.text.charAt(event.charIndex);
		    console.log('Speech paused at character ' + event.charIndex + ' of "' +
		    event.utterance.text + '", which is "' + char + '".');
		}


		pitch.onchange = function() {
		  pitchValue.textContent = pitch.value;
		}

		rate.onchange = function() {
		  rateValue.textContent = rate.value;
		}

		var estoyaqui = 1;

		if (vengodepregunta == 1) {
			function pasar_a_escuchar(dedondevengo) {

				 var verificar = $("#volumen").val();

				console.log("termine de hablar. vengo de "+dedondevengo);

				if ((extension == "mp4")  && (verificar == 1)) { 
					document.getElementById('video-aqui').play();

					$("#video-aqui").on('ended', function(){
						if ((microfono == 1)  && (verificar == 1)) {

							console.log("llamo a la funcion escuchar");

							escuchar(respuestas_correctas);
						};
					});
				}else{
					if ((microfono == 1) && (verificar == 1)) {

						console.log("llamo a la funcion escuchar");

						escuchar(respuestas_correctas);
					};
				}
			}


			utterThis.onstart = function() {
				console.log("empece a hablar");
				//setTimeout(pasar_a_escuchar, 3000);

			}
			utterThis.onend = function(){
				if ($("#volumen").val()==1) {
					estoyaqui = 2;
					pasar_a_escuchar("onend");	
				};
			}	
		}
}

