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
  
    var imagePath = "/assets/desmosGraph.png";
    backgroundImage = loadImage(imagePath);
  
    angleMode(DEGREES);
  
    dynamicTable.load(planes);
}

function draw() {
    background(backgroundImage);
  
    for (i = 0; i < planes.length; i++) {
      planes[i].render();
    }
}
  

const formInserir = document.getElementById("inserir");
formInserir.addEventListener("submit", (event) => {
  try {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    console.log(data)
    planes.push(
      new Plane(
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