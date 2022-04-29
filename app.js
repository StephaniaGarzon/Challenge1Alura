(function() {

    window.uiCodificar = uiCodificar
    window.uiDecodificar = uiDecodificar
    window.uiCopiar = uiCopiar
    window.uiVerificar = uiVerificar
    
    
    var entrada = document.querySelector('#entrada')
    var salida = document.querySelector('#salida')
    var info = document.querySelector('.sec-salida')
    var botones = document.querySelector('.botones')
    
    function isEntradaValida() {
      return !entrada.classList.contains('invalida')
    }
    
    function Cod(x) {
      switch(x){
      case 'e' : return 'enter';
      case 'i' : return 'imes';
      case 'a' : return 'ai';
      case 'o' : return 'ober';
      case 'u' : return 'ufat';
      default  : return x;
      }
    }
    
    function codificar(cadena) {
      var ret = ''
      for (var c of cadena) {
       ret += Cod(c);
      }
      return ret;
    }
    
    function decodificar(S) {
      var ret = ''
      for (var j = 0; j < S.length;) {
        switch(S[j]) {
        case 'e':
          if (S[j + 4] === 'r') { ret +=  'e'; j += 5 }
          else { return false }
          break
        case 'i':
          if (S[j + 3] === 's') { ret += 'i'; j += 4 }
          else { return false }
          break
        case 'a':
          if (S[j + 1] === 'i') { ret += 'a'; j += 2 }
          else { return false }
          break
        case 'o':
           if (S[j + 3] === 'r') { ret += 'o'; j += 4 }
           else { return false }
          break
        case 'u':
           if (S[j + 3] === 't') { ret += 'u'; j += 4 }
           else { return false }
          break
        default:
           ret += S[j++]
        }
      }
      return ret
    }
    
    function uiCodificar() {
      if (!isEntradaValida()) {
        return
      }
      var txt = entrada.value
      if (txt === '') {
        info.classList.remove('con-texto')
      } else {
        salida.textContent = codificar(txt)
        info.classList.add('con-texto')
      }
    }
    
    function uiDecodificar() {
      if (!isEntradaValida()) {
        return
      }
      var txt = entrada.value
      if (txt === '') {
        info.classList.remove('con-texto')
      } else {
        let deco = decodificar(txt)
        if (deco === false) {
          salida.textContent = 'Error: codificación inválida'
        } else {
          salida.textContent = deco
        }
        info.classList.add('con-texto')
      }
    }
    
    
    function uiCopiar() {
      const cb = navigator.clipboard
      cb.writeText(salida.textContent)
      .then(() => {
        let selec = window.getSelection()
        let range = document.createRange()
        range.selectNodeContents(salida)
        selec.removeAllRanges()
        selec.addRange(range)
        entrada.value = ''
      })
    }
    
    function uiVerificar() {
      const regex = /[a-z ]/y
      const txt = entrada.value
      for (var i = 0; i < txt.length; i++) {
        if (!regex.test(txt)) {
          break
        }
      }
      if (i != txt.length) {
        entrada.classList.add('invalida')
        botones.classList.add('disabled')
      } else {
        entrada.classList.remove('invalida')
        botones.classList.remove('disabled')
      }
    }
    
    }())