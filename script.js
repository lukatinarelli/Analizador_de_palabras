var form = document.getElementById("form")

form.addEventListener("submit", () => {

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

    document.write(valor.charAt(0).toUpperCase() + valor.slice(1) + '<br/><br/>');


    if(lan ==  'Castellano'){
        document.write('La palabra tiene ' + valor.length + ' letras <br/>');
    }else{
        document.write('La paraula té ' + valor.length + ' lletres. <br/>')
    }

    
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

    if(lan == 'Castellano'){
        if(vocaless == 1){
            document.write('Tiene ' + vocaless + ' vocal y ');
        }else{
            document.write('Tiene ' + vocaless + ' vocales y ');
        }

        if(consonantess == 1){
            document.write(consonantess + ' consonate <br/>');
        }else{
            document.write(consonantess + ' consonates <br/>');
        }
    }else{
        if(vocaless == 1){
            document.write('Té ' + vocaless + ' vocal y ');
        }else{
            document.write('Té ' + vocaless + ' vocals y ');
        }

        if(consonantess == 1){
            document.write(consonantess + ' consonate <br/>');
        }else{
            document.write(consonantess + ' consonats <br/>');
        }
    }
        


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
            document.write('Se repiten todas las letra <br/>');
        }else{
            document.write('Letras que no se repiten: ' + sildif.length + ' (' + sildif + ') <br/>')
        }
        
        if(silla.length == 0){
            document.write('No se repiten ninguna letra <br/>');
        }else{
            document.write('Letras que se repiten: ' + silla.length + ' (' + silla + ') <br/>')
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
            document.write('Es repeteixen totes les lletra <br/>');
        }else{
            document.write('Lletres que no es repeteixen: ' + sildif.length + ' (' + sildif + ') <br/>')
        }
        
        if(silla.length == 0){
            document.write('No es repeteixen cap llettra <br/>');
        }else{
            document.write('Lletres que es repeteixen: ' + silla.length + ' (' + silla + ') <br/>')
        }
    };

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
        document.write(diptongo + ' tiene diptongo <br/>')
        document.write(hiato + ' tiene hiato <br/>')
        document.write(triptongo + ' tiene triptongo <br/>')
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
        document.write(diptongo + ' té diftongo <br/>')
        document.write(hiato + ' té hiat <br/>')
        document.write(triptongo + ' té triftongo <br/>')
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
        document.write(acento + ' tiene acento <br/>')
        document.write(dieresi + ' tiene diéresis <br/>')
    } else {
        document.write(acento + ' té accent <br/>')
        document.write(dieresi + ' té dièresi <br/>')
    }


    var vol = 0

    if(lan == 'Castellano'){
        if(acento == 'Si'){
            for(var i = valor.length - 1; i >= 0; i--){
                if(vocales.includes(valor[i])){
                    vol++
                    if(acentos.includes(valor[i])){
                        if(vol == 1){
                            document.write('La palabra es aguda <br/>')
                            break
                        }else if(vol == 2){
                            document.write('La palabra es llana <br/>')
                            break
                        }else if(vol == 3 && diptongo == 'Si'){
                            document.write('La palabra es llana <br/>')
                            break
                        }else{
                            document.write('La palabra es esdrújula <br/>')
                            break
                        }
                    }
                }
            }
                
        }else{
            if(vocales.includes(valor[valor.length - 1]) || valor[valor.length - 1] == 'n' || valor[valor.length - 1] == 's'){
                vol = 2
                document.write('La palabra es llana <br/>');
            }else{
                vol = 1
                document.write('La palabra es aguda <br/>');
            }
        }
    }else{
        if(acento == 'Si'){
            for(var i = valor.length - 1; i >= 0; i--){
                if(vocales.includes(valor[i])){
                    vol++
                    if(acentos.includes(valor[i])){
                        if(vol == 1){
                            document.write('La paraula és aguda <br/>')
                            break
                        }else if(vol == 2){
                            document.write('La paraula és plana <br/>')
                            break
                        }else if(vol == 3 && diptongo == 'Si'){
                            document.write('La paraula és plana <br/>')
                            break
                        }else{
                            document.write('La paraula és esdrúixola <br/>')
                            break
                        }
                    }
                }
            }
        }else{
            if(vocales.includes(valor[valor.length - 1]) || ['as','es','is','os','us'].includes(valor.substring(valor.length - 2, valor.length))){
                vol = 2
                document.write('La paraula és plana <br/>')
            }else{
                vol = 1
                document.write('La paraula és aguda <br/>')
            }
        }
    }
	
	
	inc = []
	fnl = []
	
	for(var i = 0; i < (valorSinAcentos.length / 2) - 0.5; i++){
		inc.push(valorSinAcentos[i])
		fnl.push(valorSinAcentos[valorSinAcentos.length - 1 - i])
	}
	
	if(inc.join() == fnl.join()){
		if (lan == "Castellano"){
			document.write("La palabra es un palíndromo: ")
            for(var i = 0; i < valor.length; i++){
                if(i == 0){
                    document.write(valor[0].fontcolor("red"))
                }else if(i != valor.length - 1){
                    document.write(valor[i])
                }else{
                    document.write(valor[valor.length - 1].fontcolor("purple") + "<br/>")
                }
            }
		}
	}else{
        document.write("La palabra al revés se escribe: ")
        for(var i = valor.length; i != 1; i--){
            document.write(valor[i - 1])
        }
        document.write(valor[0].toUpperCase() + "<br/>")
    }
	
	

    nrs = ['rr','ll','br','cr','dr','gr','fr','kr','tr','bl','cl','gl','fl','kl','pr','pl','ch']
    con = ['br','bl','cn','cr','cl','dr','fr','fl','gr','gl','pr','pl','tr','ch','ll','ny']
    silabas = []

    if(valor.substring(0, 5) == 'trans'){
        var valor = valor.replace('trans','')
        silabas.push('trans|')
    }

    if(lan == 'Castellano'){
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


        document.write('<p>');

        for(i = 0; i < silabas.length; i++){

            if(i + vol == silabas.length){
                document.write('<span style="color: red;">' + silabas[i] + '</span> ')

                if(vol != 1){
                    document.write('<span style="color: black;">' + '|' + '</span> ')
                }
                
            }else{
                document.write('<span style="color: black;">' + silabas[i] + '</span> ')

                if(i + 1 != silabas.length){
                    document.write('<span style="color: black;">' + ' |' + '</span> ')
                }
            
            }
        }
        document.write('</p>')
        
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
        document.write('Separació de síl·labas: ' + silabas.join(''))
    }
});
