let avioes = [];
let widthCanvas = 600;
let heightCanvas = 600;
var TOTAL = 0;

const dynamicTable = new DynamicTable(
  "data-table",
  ["selected", "id", "x", "y", "raio", "angulo", "direcao", "velocidade"],
  ["", "Id", "X", "Y", "Raio", "Angulo", "Direção", "Velocidade"]
);

function setup() {
    const canvas = createCanvas(widthCanvas, heightCanvas);
    canvas.parent("sketch-holder");
  
    var imagePath = "/assets/grafico.png";
    backgroundImage = loadImage(imagePath);
  
    angleMode(DEGREES);
  
    dynamicTable.load(avioes);
    selectModoInsercao();
    disabilitaAcoes();
}

function selectModoInsercao() {
  let selected = document.getElementById('select').value
  switch (parseInt(selected)) {
    case 1:
      document.getElementById('y').disabled = false;
      document.getElementById('x').disabled = false;
      document.getElementById('raio').disabled = true;
      document.getElementById('angulo').disabled = true;

      document.getElementById('raio').value = 0;
      document.getElementById('angulo').value = 0;
      break;
    case 2:
      console.log(document.getElementById('y'))
      document.getElementById('y').disabled = true;
      document.getElementById('x').disabled = true;
      document.getElementById('raio').disabled = false;
      document.getElementById('angulo').disabled = false;

      document.getElementById('y').value = 0;
      document.getElementById('x').value = 0;
  }
}

function draw() {
    background(backgroundImage);
  
    for (i = 0; i < avioes.length; i++) {
      avioes[i].render();
    }
}
  
document.getElementById("inserir").addEventListener("submit", (event) => {
  try {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    avioes.push(
      new Aviao(
        TOTAL,
        parseFloat(data.x) || 0,
        parseFloat(data.y) || 0,
        parseFloat(data.raio)  || 0,
        parseFloat(data.angulo) || 0,
        parseFloat(data.direcao),
        parseFloat(data.velocidade)
      )
    );
    TOTAL++;
    dynamicTable.load(avioes);

  } catch (err) {
    console.log(err)
  }
});

document.getElementById("remover").addEventListener('submit', (event) => {
  event.preventDefault();
  avioes = [];
  dynamicTable.load(avioes);
  TOTAL = 0;
  disabilitaAcoes();
});

function onChangeSelecionarAviao(idx) {
  avioes[idx].selected = !avioes[idx].selected;
  disabilitaAcoes();
}

function disabilitaAcoes() {
  let totalSelecionados = avioes.filter(plane => plane.selected).length;
  if (totalSelecionados > 0) {
    document.getElementById('btnTranslandar').disabled = false;
    document.getElementById('btnEscalonar').disabled = false;
    document.getElementById('btnRotacionar').disabled = false;
  } else {
    document.getElementById('btnRotacionar').disabled = true;
    document.getElementById('btnTranslandar').disabled = true;
    document.getElementById('btnEscalonar').disabled = true;
  }
}

document.getElementById('rotacionar').addEventListener('submit', (event) => {
  event.preventDefault();
  
  avioes.forEach(plane => {
    if (plane.selected) {
      let angulo = document.getElementById('anguloRotacionar').value;
      let x = document.getElementById('xRotacionar').value;
      let y = document.getElementById('yRotacionar').value;
      if (angulo != null && x != null && y != null) {
        plane.rotacionar(parseFloat(x),parseFloat(y),parseFloat(angulo));
      }
    }
  });
  dynamicTable.load(avioes);
});

document.getElementById('translandar').addEventListener('submit', (event) => {
  event.preventDefault();
  
  avioes.forEach(plane => {
    if (plane.selected) {
      let x = document.getElementById('xTrans').value;
      let y = document.getElementById('yTrans').value;
      if (x != null && y != null) {
        plane.translandar(parseFloat(x),parseFloat(y));
      }
    }
  });
  dynamicTable.load(avioes);
});

document.getElementById('escalonar').addEventListener('submit', (event) => {
  event.preventDefault();
  
  avioes.forEach(plane => {
    if (plane.selected) {
      let x = document.getElementById('xEsc').value;
      let y = document.getElementById('yEsc').value;
      if (x != null && y != null) {
        plane.escalonar(parseFloat(x),parseFloat(y));
      }
    }
  });
  dynamicTable.load(avioes);
});