class Aviao {
  constructor(id, x, y, raio, angulo, direcao, velocidade) {
    this.selected = false;
    this.id = id;
    this.x = x;
    this.y = y;
    this.direcao = direcao;
    this.velocidade = velocidade;
    this.raio = raio;
    this.angulo = angulo;
    this.cartesianX = 0;
    this.cartesianY = 0;
    this.rotation = 0;
    this.setCoordenadas();
    this.imageAviao = loadImage("../assets/aviao.png");
  }

  render() {
    push();
    rectMode(CENTER);
    translate(this.cartesianX, this.cartesianY);
    rotate(-this.direcao);
    noFill();
    noStroke();
    image(this.imageAviao, -20, -20);
    rect(0, 0, 40, 40);
    pop();
  }

  setCanvasCartesianPoint(x, y) {
    var midWidth = width / 2;
    var midHeight = height / 2;
    var cartesianX = midWidth + x;
    var cartesianY = midHeight - y;

    this.cartesianX = cartesianX;
    this.cartesianY = cartesianY;
  }

  setCoordenadas() {
    switch (true) {
      case this.x !== 0 || this.y !== 0:
        this.setCanvasCartesianPoint(this.x, this.y);
        this.setRaioAnguloByCoordenadaCartesian(this.x, this.y);
        break;

      case this.raio !== 0 || this.angulo !== 0:
        this.setXYByCoordenadaPolar(this.raio, this.angulo);
        break;

      default:
        this.setCanvasCartesianPoint(this.x, this.y);
        break;
    }
  }

  //calculos cartesiano x polar
  setRaioAnguloByCoordenadaCartesian(x, y) {
    this.raio = parseFloat(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) || 0

    let theta = parseFloat((Math.atan2(y, x) * 180) / Math.PI) || 0;
    if (theta < 0) theta = 360 + theta;

    this.angulo = theta;
  }

  setXYByCoordenadaPolar(raio, angulo) {
    let x = raio * cos(angulo);
    let y = raio * sin(angulo);

    this.x = parseFloat(x.toFixed(4));
    this.y = parseFloat(y.toFixed(4));

    this.setCanvasCartesianPoint(this.x, this.y);
  }

  //Funções de tranformações
  rotacionar(x, y, angulo) {
    angulo = (Math.PI * 2 * angulo) / 360;
    const newX = (this.x - x) * Math.cos(angulo) - (this.y - y) * Math.sin(angulo) + x;
    const newY = (this.x - x) * Math.sin(angulo) + (this.y - y) * Math.cos(angulo) + y;

    this.x = newX;
    this.y = newY;

    this.setCoordenadas();
  }

  translandar(x, y) {
    this.x += x;
    this.y += y;

    this.setCoordenadas();
  }

  escalonar(x, y) {
    this.x *= x;
    this.y *= y;

    this.setCoordenadas();
  }

  distanciaParaOAeroporto(distancia) {
    let distanciaAeroporto = dist(this.x, this.y, 0, 0);
    if (distanciaAeroporto <= distancia) {
      return `Calculo Distancia Aeroporto: ID:${this.id}, X: ${this.x}, Y:${
        this.y
      }, Distancia: ${distanciaAeroporto.toFixed(4)} \n`;
    }
    return "";
  }

  distanciaParaOutroAviao(aviaoParaComparar, distancia) {
    let distanciaEntreAvioes = dist(
      this.x,
      this.y,
      aviaoParaComparar.x,
      aviaoParaComparar.y
    );
    if (distanciaEntreAvioes <= distancia) {
      return `Distancia entre o Avião: ${
        this.id
      } para o Avião: ${aviaoParaComparar.id} é: ${distanciaEntreAvioes.toFixed(
        4
      )} \n`;
    }
    return "";
  }
}
