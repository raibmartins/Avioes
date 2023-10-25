let planes = [];
let widthCanvas = 600;
let heightCanvas = 600;

// Iniciando table
const dynamicTable = new DynamicTable(
  "data-table",
  ["selected", "id", "x", "y", "raio", "angulo", "direcao", "velocidade"],
  ["Selecionado", "Id", "X", "Y", "Raio", "Angulo", "Direção", "Velocidade"]
);

function setup() {
    const canvas = createCanvas(widthCanvas, heightCanvas);
    canvas.parent("sketch-holder");
  
    var imagePath = "/assets/grafico.png";
    backgroundImage = loadImage(imagePath);
  
    angleMode(DEGREES);
  
    dynamicTable.load(planes);
    selectModoInsercao();
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
  
    for (i = 0; i < planes.length; i++) {
      planes[i].render();
    }
}
  
document.getElementById("inserir").addEventListener("submit", (event) => {
  try {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    console.log(data)
    planes.push(
      new Aviao(
        0,
        parseFloat(data.x),
        parseFloat(data.y),
        parseFloat(data.raio),
        parseFloat(data.angulo),
        parseFloat(data.direcao),
        parseFloat(data.velocidade)
      )
    );
    dynamicTable.load(planes);

  } catch (err) {
    console.log(err)
  }
});

document.getElementById("remover").addEventListener('submit', (event) => {
  event.preventDefault();
  planes = [];
  dynamicTable.load(planes);
});

function onChangeSelecionarAviao(idx) {
  planes[idx].selected = !planes[idx].selected;
}