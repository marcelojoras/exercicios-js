window.onload = function () {
  //exercicio 1
  var csvForm = document.getElementById('csvForm');
  var csvFile = document.getElementById('csvFile');
  
  csvForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = csvFile.files[0];
    var reader = new FileReader();
  
    reader.onload = function (e) {
      var csv = e.target.result;
  
      var array = csv.split('\r');
      var result = [];
      var headers = array[0].split(';');
      
      for (var i = 1; i < array.length; i++) {
        var object = {}
        
        var string = array[i]
        var s = ''
        
        var flag = 0
          for (var char of string) {
          if (char === '"' && flag === 0) {
            flag = 1
          }
          else if (char === '"' && flag == 1) flag = 0
          if (char === ', ' && flag === 0) char = '|'
          if (char !== '"') s += char
        }
        
        var properties = s.split(';')
        
        for (var j in headers) {
          object[headers[j]] = properties[j].replace('\n', '')
        }
        
        result.push(object)
      }
      
      result = JSON.stringify(result);
      var resultTag = document.getElementById('codeResult');
      resultTag.innerHTML = result;
    };
  
    reader.readAsText(input);

  });

  //exercicio 2
  var jsonText = document.getElementById('codeResult');
  var filterTerm = document.getElementById('filterTerm');
  var filterForm = document.getElementById('filterForm');

  filterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var array = JSON.parse(jsonText.innerHTML);

      var filteredArray = array.filter(function(el) {
        return el.cidade == filterTerm.value;
      });

      resultJson = JSON.stringify(filteredArray);
      var resultTagFiltered = document.getElementById('codeResultFiltered');
      resultTagFiltered.innerHTML = resultJson;
  });
  
  //exercicio 3
  var jsonText = document.getElementById('codeResult');
  var orderCollum = document.getElementById('orderCollum');
  var orderValue = document.getElementById('orderValue');
  var orderForm = document.getElementById('orderForm');

  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var array = JSON.parse(jsonText.innerHTML);
    var collum = orderCollum.value.toLowerCase();

    arraySorted = array.sort(function(a, b) {
      switch(collum) {
        case 'nome': 
          if(orderValue.value == 'ASC') {
            if(a.nome < b.nome) { return -1; }
            if(a.nome > b.nome) { return 1; }
            return 0
          } else {
            if(a.nome > b.nome) { return -1; }
            if(a.nome < b.nome) { return 1; }
            return 0
          }
        break;
        case 'idade':
          if(orderValue.value == 'ASC') {
            if(a.idade < b.idade) { return -1; }
            if(a.idade > b.idade) { return 1; }
            return 0
          } else {
            if(a.idade > b.idade) { return -1; }
            if(a.idade < b.idade) { return 1; }
            return 0
          }
        break;
        case 'cidade':
          if(orderValue.value == 'ASC') {
            if(a.cidade < b.cidade) { return -1; }
            if(a.cidade > b.cidade) { return 1; }
            return 0
          } else {
            if(a.cidade > b.cidade) { return -1; }
            if(a.cidade < b.cidade) { return 1; }
            return 0
          }
        break;
      }
    });

    resultJsonSorted = JSON.stringify(arraySorted);
    var resultTagSorted = document.getElementById('codeResultSorted');
    resultTagSorted.innerHTML = resultJsonSorted;
  });

  //exercício 4
  var executeExercice = document.getElementById('executarExercicio4');

  executeExercice.addEventListener('click', function(e) {
    e.preventDefault();

    var arrayOfNumbers = Array.from({
      length: 100
    }, () => Math.floor(Math.random() * 1000));

    var arrayImpar = [];

    arrayOfNumbers.forEach((number, index) => {
      if(index % 2 == 0) {
        arrayImpar.push(number);
      }
    });

    var arrayCompletoJson = JSON.stringify(arrayOfNumbers);
    var arrayImparJson = JSON.stringify(arrayImpar);
    var resultArrayCompleto = document.getElementById('arrayCompleto');
    var resultArrayImpar = document.getElementById('arrayImpar');
    resultArrayCompleto.innerHTML = 'Array completo: ' + arrayCompletoJson;
    resultArrayImpar.innerHTML = 'Array apenas com os índices ímpares: ' + arrayImparJson;
  });

  //exercicio 5
  var financiamentoForm = document.getElementById('financiamentoForm');
  var totalFinanciamento = document.getElementById('totalFinanciamento');
  var mensalFinanciamento = document.getElementById('mensalFinanciamento');
  var percentualFinanciamento = document.getElementById('percentualFinanciamento');

  financiamentoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var total = parseFloat(totalFinanciamento.value);
    var mensal = parseFloat(mensalFinanciamento.value);
    var percentual = percentualFinanciamento.value / 100;

    var totalPago = 0;
    var totalMeses = 0;

    do {
      total = (total + (total * percentual)) - mensal;
      totalPago = totalPago + mensal;
      totalMeses++;
    } while(total > 0);

    var resultFinanciamento = document.getElementById('financiamentoResult');
    resultFinanciamento.innerHTML = 'Total pago: ' + totalPago + '<br>Total de meses: ' + totalMeses;
  });
}