let planes = [];
let PLANE_ID = 1;
let widthCanvas = 750;
let heightCanvas = 750;
const RELATORIO = document.getElementById("resultados-colisao");
const table = new DynamicTable(
  "data-table",
  ["selected", "id", "x", "y", "raio", "angulo", "direcao", "velocidade"],
  [" ", "Avião", "X", "Y", "Raio", "Ângulo", "Direção", "Velocidade"]
);

toastr.options = {
  closeButton: true,
  debug: false,
  positionClass: "toast-bottom-right",
  newestOnTop: true,
  progressBar: false,
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "1000",
};

function setup() {
  const canvas = createCanvas(widthCanvas, heightCanvas);
  canvas.parent("sketch-holder");

  const imagePath = "/assets/grafico.png";
  backgroundImage = loadImage(imagePath);

  angleMode(DEGREES);

  table.load(planes);
  disabledButtonsTranforms();
}

function draw() {

  background(backgroundImage);

  for (i = 0; i < planes.length; i++) {
    planes[i].render();
  }

}

function selectionPlane(idx) {

  planes.forEach(plane => {
    if (plane.id === idx) {
      plane.selected = !plane.selected;
    }
  })

  disabledButtonsTranforms();
}


function disabledButtonsTranforms() {
  const buttonTranslate = $('#btnTranslandar').prop('disabled', true),
    buttonScale = $('#btnEscalonar').prop('disabled', true),
    buttonRotate = $('#btnRotacionar').prop('disabled', true);

  let xTrans = $('#xTrans');

  let totalSelecionados = planes.filter(plane => plane.selected).length;

  if (totalSelecionados > 0) {
    buttonTranslate.prop('disabled', false);
    buttonScale.prop('disabled', false);
    buttonRotate.prop('disabled', false);
  } else {
    xTrans.val(0);
  }
}

//Dados
$('#select').on('change', function () {
  const selected = $('#select').val(),
    x = $('#x'),
    y = $('#y'),
    raio = $('#raio'),
    angulo = $('#angulo');

  switch (selected) {
    case '1':
      x.prop('disabled', false);
      y.prop('disabled', false);
      raio.prop('disabled', true);
      angulo.prop('disabled', true);

      raio.val(0);
      angulo.val(0);
      break;
    case '2':
      y.prop('disabled', true);
      x.prop('disabled', true);
      raio.prop('disabled', false);
      angulo.prop('disabled', false);

      y.val(0);
      x.val(0);
      break;
    case "3":
      y.prop('disabled', true);
      x.prop('disabled', true);
      raio.prop('disabled', true);
      angulo.prop('disabled', true);
  }
});


$("#inserir").submit(function (event) {

  try {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());

    if (PLANE_ID <= 10) {
      planes.push(
        new Aviao(
          PLANE_ID,
          parseFloat(data.x) || 0,
          parseFloat(data.y) || 0,
          parseFloat(data.raio) || 0,
          parseFloat(data.angulo) || 0,
          parseFloat(data.direcao) || 0,
          parseFloat(data.velocidade) || 0,
          false,
        )
      );
      PLANE_ID++;
    }

    table.load(planes);

    toastr.success("Avião inserido com sucesso!");

  } catch (err) { toastr.error("Erro ao inserir avião!"); }
});


$("#btnRemover").click(function (event) {

  event.preventDefault();
  planes = [];
  PLANE_ID = 0;
  table.load(planes);

});


$('#rotacionar').submit(function (event) {
  event.preventDefault();

  try {
    planes.forEach(plane => {

      if (plane.selected) {
        let angulo = $('#anguloRotacionar').val();
        let x = $('#xRotacionar').val();
        let y = $('#yRotacionar').val();

        if (!isNaN(angulo) && !isNaN(x) && !isNaN(y)) {
          plane.rotacionar(
            parseFloat(x),
            parseFloat(y),
            parseFloat(angulo)
          );
        }
      }
    });

    table.load(planes);
    toastr.success("Rotação realizada com sucesso!");

  } catch (error) { toastr.error("Erro ao aplicar rotação!"); }
});


$('#translandar').submit(function (event) {
  event.preventDefault();
  try {
    planes.forEach(plane => {

      if (plane.selected) {
        let x = $('#xTrans').val();
        let y = $('#yTrans').val();

        console.log(x, y);

        if (!isNaN(x) && !isNaN(y)) {
          plane.translandar(
            parseFloat(x),
            parseFloat(y)
          );
        }
      }

    });

    table.load(planes);
    toastr.success("Translação realizada com sucesso!");

  } catch (error) { toastr.error("Erro ao aplicar translação!"); }
});

$('#escalonar').submit(function (event) {
  event.preventDefault();

  try {
    planes.forEach(plane => {

      if (plane.selected) {
        let x = $('#xEsc').val();
        let y = $('#yEsc').val();

        if (!isNaN(x) && !isNaN(y)) {
          plane.escalonar(
            parseFloat(x),
            parseFloat(y)
          );
        }
      }

    });

    table.load(planes);
    toastr.success("Escalonamento realizado com sucesso!");

  } catch (error) { toastr.error("Erro ao aplicar escalonamento!"); }
});


$('#rastreamento-aeroporto').submit((event) => {
  try {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    let resultCalculoDistancia = "";
    RELATORIO.innerText = "";

    for (let index = 0; index < planes.length; index++) {
      resultCalculoDistancia += planes[index].distanciaParaOAeroporto(
        parseFloat(data.distanciaMinima)
      );
    }

    resultCalculoDistancia ? (RELATORIO.append(resultCalculoDistancia)) : (RELATORIO.innerText = `Sem aviões próximos ao Aeroporto, Distancia Informada: ${data.distanciaMinima}`);

    toastr.success("Calculado distancia entre aviões e aeroporto");
  } catch (err) {
    toastr.error("Erro ao calcular distancia entre aviões e aeroporto");
  }
});

$('#rastreamento-proximos').submit((event) => {
  try {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target).entries());
    
    RELATORIO.innerText = "";
    
    let resultCalculoDistancia = "";

    for (i = 0; i < planes.length; i++) {
      for (k = i + 1; k < planes.length; k++) {
        resultCalculoDistancia += planes[i].distanciaParaOutroAviao(planes[k], parseFloat(data.distanciaMinima));
      }
    }

    resultCalculoDistancia
      ? (RELATORIO.append(resultCalculoDistancia))
      : (RELATORIO.innerText = `Sem aviões próximos uns aos outros, Distancia Informada: ${data.distanciaMinima}`);

    toastr.success("Calculado distancia entre aviões");
  } catch (err) {
    toastr.error("Erro ao calcular distancia entre aviões");
  }
});

$('#rastreamento-colisao').submit((event) => {
  try {
    event.preventDefault();

    RELATORIO.innerText = "";

    const data = Object.fromEntries(new FormData(event.target).entries());
    let resultCalculoDistancia = calculaRotaColisao(parseFloat(data.tempoMinimo));

    RELATORIO.append(resultCalculoDistancia);

    toastr.success("Calculado rotas de colisão");
  } catch (err) {
    toastr.error("Erro ao calcular rotas de colisão");
  }
});