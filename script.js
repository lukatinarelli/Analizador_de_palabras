document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var input = document.getElementById("palabra");
    var valor = input.value.toLowerCase();
    


    var pos

    if(valor.includes('·')){
        pos = valor.indexOf('·')
        valor = valor.replace('·','')
    }


    
    var valorSinAcentos = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    function cuantasVecesAparece(cadena, caracter){
        var indices = [];
        for(var i = 0; i < cadena.length; i++) {
            if (cadena[i].toLowerCase() === caracter) indices.push(i);
        }
        return indices.length;
    }

    var language = document.getElementById('lan');
    var lan = language.value;

    
    localStorage.setItem('palabra', valor.charAt(0).toUpperCase() + valor.slice(1));
    localStorage.setItem('idioma', lan);


    
    var vocales = ['a','e','i','o','u','á','é','í','ó','ú','à','è','ì','ò','ù','ï','ü'];
    var vocaless = 0
    var consonantess = 0
    var sila = []

    for(var i = 0; i < valor.length; i++){
        if(vocales.includes(valor[i])){
            vocaless += 1
            sila.push(valor[i])
        }else{
            consonantess += 1
            sila.push(valor[i])
        }
    };



    localStorage.setItem('vocales', vocaless);
    localStorage.setItem('consonantes', consonantess);
    

    
        

    
    var sildif = []
    var silla = []

    if(lan == 'Castellano'){
        for(var i = 0; i < valorSinAcentos.length; i++){
            if(cuantasVecesAparece(valorSinAcentos, valorSinAcentos[i]) == 1){
                sildif.push(valorSinAcentos[i]);
            }else if(cuantasVecesAparece(valorSinAcentos, valorSinAcentos[i]) > 1 && ! silla.includes(valorSinAcentos[i] + ' --> ' + cuantasVecesAparece(valorSinAcentos, valorSinAcentos[i]) + ' veces')){
                silla.push(valorSinAcentos[i] + ' --> ' + cuantasVecesAparece(valorSinAcentos, valorSinAcentos[i]) + ' veces')
            }
        }
        
        if(sildif.length == 0){
            localStorage.setItem('letras_no_repetidas', 'Se repiten todas las letra');
        }else{
            localStorage.setItem('letras_no_repetidas', `Letras que no se repiten: ${sildif.length}  (${sildif})`)
        }
        
        if(silla.length == 0){
            localStorage.setItem('letras_repetidas', 'No se repiten ninguna letra');
        }else{
            localStorage.setItem('letras_no_repetidas', `Letras que se repiten: ${silla.length} (${silla})`)
        }
        
    }else{
        for(var i = 0; i < valorSinAcentos.length; i++){
            if(cuantasVecesAparece(valorSinAcentos, valorSinAcentos[i]) == 1){
                sildif.push(valorSinAcentos[i]);
            }else if (cuantasVecesAparece(valorSinAcentos, valorSinAcentos[i]) > 1 && ! silla.includes(valorSinAcentos[i] + ' --> ' + cuantasVecesAparece(valorSinAcentos, valorSinAcentos[i]) + ' vegades')){
                silla.push(valorSinAcentos[i] + ' --> ' + cuantasVecesAparece(valorSinAcentos, valorSinAcentos[i]) + ' vegades')
            }
        }
        if(sildif.length == 0){
            localStorage.setItem('letras_no_repetidas', 'Es repeteixen totes les lletra');
        }else{
            localStorage.setItem('letras_no_repetidas', `Lletres que no es repeteixen: ${sildif.length}  (${sildif})`)
        }
        
        if(silla.length == 0){
            localStorage.setItem('letras_repetidas', 'No es repeteixen cap llettra');
        }else{
            localStorage.setItem('letras_no_repetidas', `Lletres que es repeteixen: ${silla.length} (${silla})`)
        }
    };


    

    inc = []
	fnl = []
    var mensaje = '';
	
	for(var i = 0; i < (valorSinAcentos.length / 2) - 0.5; i++){
		inc.push(valorSinAcentos[i])
		fnl.push(valorSinAcentos[valorSinAcentos.length - 1 - i])
	}
	
	if(inc.join() == fnl.join()){
		if (lan == "Castellano"){
			mensaje += "La palabra es un palíndromo: "
            for(var i = 0; i < valor.length; i++){
                if(i == 0){
                    mensaje += valor[0].fontcolor("red")
                }else if(i != valor.length - 1){
                    mensaje += valor[i]
                }else{
                    mensaje += valor[valor.length - 1].fontcolor("purple")
                }
            }
		}
	}else{
        mensaje += "La palabra al revés se escribe: "
        for(var i = valor.length; i != 1; i--){
            mensaje += valor[i - 1]
        }
        mensaje += valor[0].toUpperCase()
    }

    localStorage.setItem('polindromo', mensaje)


    
    var abiertastd = ['a','e','o','á','é','ó','à','è','ò']
    var abiertas = ['a','e','o']
    var abiertasconacento = ['á','é','ó']
    var cerradas = ['i','u']
    var cerradasconacento = ['í','ú']
    var cerradascondie = ['u', 'ü']
    var cerads = ['i','u','ü']
    var cerradases = ['í','ï','ú','ü','ì','ù']
    var vocc = ['a','e','i','í','o']
    var triptongo = 'No'
    var diptongo = 'No'
    var hiato = 'No'

    if(lan == 'Castellano'){
        for(var i = 0; i < valor.length; i++){
            if(cerads.includes(valor[i]) && abiertastd.includes(valor[i+1]) && cerads.includes(valor[i+2])){
                triptongo = 'Si'
            }else if(abiertas.includes(valor[i]) && cerradas.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(abiertasconacento.includes(valor[i]) && cerradas.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(cerradas.includes(valor[i]) && abiertas.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(cerradas.includes(valor[i]) && abiertasconacento.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(valor[i] + valor[i+1] == 'ui' || valor[i] + valor[i+1] == 'uí' && triptongo == 'No'){
                diptongo = 'Si'
            }else if(valor[i] + valor[i+1] == 'iu' || valor[i] + valor[i+1] == 'iú' && triptongo == 'No'){
                diptongo = 'Si'
            }else if(abiertas.includes(valor[i]) && cerradasconacento.includes(valor[i+1]) && triptongo == 'No'){
                hiato = 'Si'
            }else if(cerradasconacento.includes(valor[i]) && abiertas.includes(valor[i+1]) && triptongo == 'No'){
                hiato = 'Si'
            }else if(abiertas.includes(valor[i]) && abiertastd.includes(valor[i+1]) && triptongo == 'No'){
                hiato = 'Si'
            }
        }
        localStorage.setItem('diptongo', `${diptongo} tiene diptongo`)
        localStorage.setItem('hiato', `${hiato} tiene hiato`)
        localStorage.setItem('triptongo', `${triptongo} tiene triptongo`)
    }else{
        for(var i = 0; i < valor.length; i++){
            if(vocales.includes(valor[i-1]) && cerads.includes(valor[i]) && abiertas.includes(valor[i+1]) && cerads.includes(valor[i+2])){
                triptongo = 'Si'
            }else if(valor[i-1] == 'h' && cerradas.includes(valor[i]) && abiertastd.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if((! vocales.includes(valor[i-1]) && ! i == 0) && cerradas.includes(valor[i]) && abiertastd.includes(valor[i+1]) && triptongo == 'No'){
                hiato = 'Si'
            }else if(cerads.includes(valor[i]) && abiertas.includes(valor[i+1]) && cerads.includes(valor[i+2]) && abiertas.includes(valor[i+3])){
                diptongo = 'Si'
                hiato = 'Si'
            }else if(abiertas.includes(valor[i]) && cerradas.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(valor[i] == 'q' && cerradascondie.includes(valor[i+1]) && vocc.includes(valor[i+2]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(valor[i] == 'g' && cerradascondie.includes(valor[i+1]) && vocc.includes(valor[i+2]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(valor[i] == 'i' && i == 0 && abiertas.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(abiertas.includes(valor[i-1]) && cerradas.includes(valor[i]) && abiertas.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(cerradas.includes(valor[i]) && cerradas.includes(valor[i+1]) && triptongo == 'No'){
                diptongo = 'Si'
            }else if(abiertastd.includes(valor[i]) && abiertastd.includes(valor[i+1]) && triptongo == 'No'){
                hiato = 'Si'
            }else if(['a','e','o','u'].includes(valor[i]) && cerradases.includes(valor[i+1]) && triptongo == 'No'){
                hiato = 'Si'
            }
        }
        localStorage.setItem('diptongo', `${diptongo} té diftongo`)
        localStorage.setItem('hiato', `${hiato} té hiat`)
        localStorage.setItem('triptongo', `${triptongo} té triftongo`)
    }

    
    acentos = ['á','é','í','ó','ú','à','è','ì','ò','ù']
    dieresis = ['ä','ë','ï','ö','ü']
    acento = 'No'
    dieresi = 'No'
    
    for(var i = 0; i < valor.length; i++){
        if(acentos.includes(valor[i])){
            acento = 'Si'
        }
    }
    for(var i = 0; i < valor.length; i++){
        if (dieresis.includes(valor[i])){
            dieresi = 'Si'
        }
    }


    if (lan == "Castellano"){
        localStorage.setItem('acento', `${acento} tiene acento`)
        localStorage.setItem('dieresis', `${dieresi} tiene diéresis `)
    } else {
        localStorage.setItem('acento', `${acento} té accent`)
        localStorage.setItem('dieresis', `${dieresi} té dièresi`)
    }


    
    nrs = ['rr','ll','br','cr','dr','gr','fr','kr','tr','bl','cl','gl','fl','kl','pr','pl','ch']
    con = ['br','bl','cn','cr','cl','dr','fr','fl','gr','gl','pr','pl','tr','ch','ll','ny']
    silabas = []

    if(valor.substring(0, 5) == 'trans'){
        var valor = valor.replace('trans','')
        silabas.push('trans|')
    }

    if(lan == "Castellano"){
        for(var i = 0; i < valor.length; i++){
            if(nrs.includes(valor[i] + valor[i+1])){
                silabas.push('|' + valor[i])
            }else if(vocales.includes(valor [i-1]) && ! vocales.includes(valor[i]) && vocales.includes(valor[i+1])){
                silabas.push('|' + valor[i])
            }else if(vocales.includes(valor [i-1]) && ! vocales.includes(valor[i]) && ! vocales.includes(valor[i+1]) && vocales.includes(valor[i+2])){
                silabas.push(valor[i] + '|')
            }else if(vocales.includes(valor [i-2]) && ! vocales.includes(valor[i-1]) && ! vocales.includes(valor[i]) && ! vocales.includes(valor[i+1]) && vocales.includes(valor[i+2])){
                silabas.push(valor[i] + '|')
            }else if(abiertas.includes(valor[i]) && cerradas.includes(valor[i+1]) && diptongo == 'Si'){
                silabas.push(valor[i])
            }else if(vocales.includes(valor[i]) && vocales.includes(valor[i+1]) && hiato == 'Si'){
                silabas.push(valor[i] + '|')
            }else{
                silabas.push(valor[i])
            }
        }

        silabas = (silabas.join('')).split("|")
    }else{
        for(var i = 0; i < valor.length; i++){
            if(valor[i] + valor[i+1] == 'tx' && i == valor.length - 2){
                silabas.push(valor[i])
            }else if(['rr','ss','tx'].includes(valor[i] + valor[i+1])){
                silabas.push(valor[i] + '|')
            }else if(vocales.includes(valor[i]) && cerads.includes(valor[i+1]) && abiertas.includes(valor[i+2]) && cerads.includes(valor[i+3])){
                silabas.push(valor[i] + '|')
            }else if(! vocales.includes(valor[i-1]) && cerradas.includes(valor[i]) && abiertastd.includes(valor[i+1]) && hiato == 'Si'){
                silabas.push(valor[i] + '|')
            }else if(cerradas.includes(valor[i]) && abiertas.includes(valor[i+1]) && diptongo == 'Si'){
                silabas.push(valor[i])
            }else if(valor[i] + valor[i+1] == 'll' && pos == i+1){
                silabas.push(valor[i] + '|')
            }else if(valor[i] + valor[i+1] == 'ix' && i != valor.length - 2){
                silabas.push(valor[i] + '|')
            }else if(! vocales.includes(valor[i]) && valor[i+1] == 'h'){
                silabas.push(valor[i] + '|')
            }else if(con.includes(valor[i] + valor[i+1]) && i != valor.length - 2 && i != 0){
                silabas.push('|' + valor[i])
            }else if(vocales.includes(valor[i-1]) && ! vocales.includes(valor[i]) && vocales.includes(valor[i+1])){
                silabas.push('|' + valor[i])
            }else if(vocales.includes(valor[i-1]) && ! vocales.includes(valor[i]) && ! vocales.includes(valor[i+1]) && vocales.includes(valor[i+2])){
                silabas.push(valor[i] + '|')
            }else if(vocales.includes(valor[i-2]) && ! vocales.includes(valor[i-1]) && ! vocales.includes(valor[i]) && ! vocales.includes(valor[i+1]) && vocales.includes(valor[i+2])){
                silabas.push(valor[i] + '|')
            }else{
                silabas.push(valor[i])
            }
        }
        while(silabas.indexOf('·|') > 0){
            silabas.splice(silabas.indexOf('·|'), 1);
        }

        silabas = (silabas.join('')).split("|")
    }


    var vol = 0

    if(lan == 'Castellano'){
        if(acento == 'Si'){
            for(var i = silabas.length - 1; i >= 0; i--){
                vol++

                if(acentos.some(vocal => silabas[i].includes(vocal))){
                    if(vol == 1){
                        localStorage.setItem('acentuacion', 'La palabra es aguda')
                        break
                    }else if(vol == 2){
                        localStorage.setItem('acentuacion', 'La palabra es llana')
                        break
                    }else if(vol == 3){
                        localStorage.setItem('acentuacion', 'La palabra es esdrújula')
                        break
                    }else{
                        localStorage.setItem('acentuacion', 'La palabra es sobresdrújula')
                        break
                    }
                }
                
            }
                
        }else{
            if(vocales.includes(valor[valor.length - 1]) || valor[valor.length - 1] == 'n' || valor[valor.length - 1] == 's'){
                vol = 2
                localStorage.setItem('acentuacion', 'La palabra es llana')
            }else{
                vol = 1
                localStorage.setItem('acentuacion', 'La palabra es aguda')
            }
        }
    }else{
        if(acento == 'Si'){
            for(var i = silabas.length - 1; i >= 0; i--){
                vol++

                if(acentos.some(vocal => silabas[i].includes(vocal))){
                    if(vol == 1){
                        localStorage.setItem('acentuacion', 'La paraula és aguda')
                        break
                    }else if(vol == 2){
                        localStorage.setItem('acentuacion', 'La paraula és plana')
                        break
                    }else if(vol == 3){
                        localStorage.setItem('acentuacion', 'La paraula és esdrúixola')
                        break
                    }else{
                        localStorage.setItem('acentuacion', 'La paraula és sobresdrúixola')
                        break
                    }
                }
                
            }
        }else{
            if(vocales.includes(valor[valor.length - 1]) || ['as','es','is','os','us'].includes(valor.substring(valor.length - 2, valor.length))){
                vol = 2
                localStorage.setItem('acentuacion', 'La paraula és plana')
            }else{
                vol = 1
                localStorage.setItem('acentuacion', 'LLa paraula és aguda')
            }
        }
    }
	
    var mensaje = ''
    
    if(lan == 'Castellano'){
        mensaje += 'Separación de sílabas: '

        for(i = 0; i < silabas.length; i++){

            if(i + vol == silabas.length){
                mensaje += `<span style="color: red;"> ${silabas[i]} </span> `

                if(vol != 1){
                    mensaje += '<span style="color: black;"> | </span> '
                }
                
            }else{
                mensaje += `<span style="color: black;"> ${silabas[i]} </span> `

                if(i + 1 != silabas.length){
                    mensaje += '<span style="color: black;"> | </span> '
                }
            
            }
        }
        
        
    }else{
        mensaje += 'Separació de síl·labes: '

        for(i = 0; i < silabas.length; i++){

            if(i + vol == silabas.length){
                mensaje += `<span style="color: red;"> ${silabas[i]} </span> `

                if(vol != 1){
                    mensaje += '<span style="color: black;"> | </span> '
                }
                
            }else{
                mensaje += `<span style="color: black;"> ${silabas[i]} </span> `

                if(i + 1 != silabas.length){
                    mensaje += '<span style="color: black;"> | </span> '
                }
            
            }
        }
    }
    localStorage.setItem('separacion_silabas', mensaje)
    window.location.href = 'result.html';
});
