function calculaRotaColisao(tempoSeguro) {
    let xAux, yAux,xNew, yNew,d1, d2, t1, t2, tempoAbsDiferenca = 0, tan1, tan2, xColisao, yColisao;

    let hasColAux1 = false, hasColAux2 = false;

    aviso = "";

    for ( i = 0; i < planes.length; i++) {
        for ( j = i + 1; j < planes.length; j++) {
            hasColAux1 = false;
            hasColAux2 = false;
            if ((planes[i].direcao == planes[j].direcao)) {
                if (!isAnguloIgualComColisao(planes[i], planes[j])) {
                    aviso += "\nAvião " + (i + 1) + " -> " + "Avião " + (j + 1) + " Ângulo iguais e sem a existência de um ponto de colisão \n";
                    continue;
                }
            }

            tan1 = Math.tan(planes[i].direcao);
            tan2 = Math.tan(planes[j].direcao);

            xAux = (tan1 * -planes[i].x) + planes[i].y;
            yAux = (tan2 * -planes[j].x) + planes[j].y;

            if (planes[i].direcao == 90) {
                xColisao = planes[i].x;
            } else if (planes[j].direcao == 90) {
                xColisao = planes[j].x;
            } else {
                xColisao = ((yAux - xAux) / (tan1 + (-tan2)));
            }
            
            if (planes[i].direcao == 180) {
                yColisao = planes[i].y;
            } else if (planes[j].direcao == 180) {
                yColisao = planes[j].y;
            } else {
                yColisao = (tan2 * xColisao + yAux);
            }
            
            xNew = planes[i].x + (0.01 * cos(planes[i].direcao));
            yNew = planes[i].y + (0.01 * sin(planes[i].direcao));

            if (planes[i].x > xColisao && xNew < planes[i].x) {
                hasColAux1 = true;
            } else if (planes[i].x < xColisao && xNew > planes[i].x) {
                hasColAux1 = true;
            }

            if (planes[i].y > yColisao && yNew < planes[i].y) {
                hasColAux1 = true;
            } else if (planes[i].y < yColisao && yNew > planes[i].y) {
                hasColAux1 = true;
            }

            xNew = planes[j].x + (0.01 * cos(planes[j].direcao));
            yNew = planes[j].y + (0.01 * sin(planes[j].direcao));


            if (planes[j].x > xColisao && xNew < planes[j].x) {
                hasColAux2 = true;
            } else if (planes[j].x < xColisao && xNew > planes[j].x) {
                hasColAux2 = true;
            }

            if (planes[j].y > yColisao && yNew < planes[j].y) {
                hasColAux2 = true;
            } else if (planes[j].y < yColisao && yNew > planes[j].y) {
                hasColAux2 = true;
            }

            if (!hasColAux1 || !hasColAux2) {
                aviso += "\nAvião " + planes[i].id + " -> " + "Avião " + planes[j].id + " Não existe colisão \n";
                continue;
            }

            d1 = Math.hypot(xColisao - planes[i].x,  yColisao - planes[i].y);
            d2 = Math.hypot(xColisao - planes[j].x,  yColisao - planes[j].y);

            t1 = d1 / planes[i].velocidade;
            t2 = d2 / planes[j].velocidade;

            tempoAbsDiferenca = (Math.abs(t1 - t2) * 60 * 60);

            if (tempoAbsDiferenca <= tempoSeguro) {
                aviso += "Avião " + planes[i].id + " -> " + "Avião " + planes[j].id 
                        + "\nPonto de colisão: (" + xColisao.toFixed(4) + ";" + yColisao.toFixed(4) + ")"
                        + "\nDiferença de tempo: " + tempoAbsDiferenca.toFixed(4) + "s\n"
                        + "Avião " + planes[i].id + ": " + parseFloat((t1 * 60 * 60).toFixed(4)) + "s\n"
                        + "Avião " + planes[j].id + ": " + parseFloat((t2 * 60 * 60).toFixed(4)) + "s\n";
            }

        }
    }

    aviso += "\n";


    return aviso;
}

function isAnguloIgualComColisao( airplane1, airplane2) {
    return ((airplane1.direcao == 90 || airplane1.direcao == 270) && (airplane1.x == airplane2.x)) || ((airplane1.direcao == 180 || airplane1.direcao == 0) && (airplane1.y == airplane2.y));
}