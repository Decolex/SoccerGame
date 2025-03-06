let bolaFutebol;
let xbolinha = 300;
let ybolinha = 200;
let diametro = 100;
let vxbolinha = 20;
let vybolinha = 20;
let raio = diametro / 2;

let raqtAltura = 250;
let raqtComprimento = 40;
let X = 30;
let Y = 200;
let X2 = 1405;
let Y2= 200;

let pontosDireita = 0;
let pontosEsquerda = 0;

let jogoFinalizado = false;
let botaoReiniciar;

//=============================================================================================================================\\

function setup() {
    createCanvas(1475,650);
    
    bolaFutebol = loadImage('bola.png');
    botaoReiniciar = createImg('seta.png'); 
    botaoReiniciar.position(width / 2 - 80, height / 2 - 80); 
    botaoReiniciar.size(180, 180);
    botaoReiniciar.hide(); // Esconde o botão no início
    botaoReiniciar.mousePressed(reiniciarJogo); // Chama a função para reiniciar o jogo
}

//=============================================================================================================================\\

 function draw() {
    background(color(50,120,50));
    desenharCampo();
    desenharPlacar();

    if(!jogoFinalizado){

        
        criarBolinha(xbolinha,ybolinha,color(255,255,255));
        mexerBolinha();
        colisaoBolinha();
        verificarGol();
        
        criarRaquete(X, Y, color(0,0,255));
        colisaoRaquete(X, Y);
        criarRaquete(X2, Y2, color(255,0,0));
        colisaoRaquete2(X2, Y2);
        
        movimentarRaquete();
        movimentarRaquete2();
    }
}

//=============================================================================================================================\\

function desenharCampo(){
    stroke(255); // Cor das linhas
    strokeWeight(4); // Espessura das linhas
    
    // Linha central
    line(width / 2, 0, width / 2, height - 50);

    // Círculo central
    noFill();
    ellipse(width / 2, height / 2, 200, 200);

    // Áreas dos gols
    line(50, 100, 50, height - 100);
    line(width - 50, 100, width - 50, height - 100);
}

//=============================================================================================================================\\

function desenharPlacar() {
    fill(0); 
    rect(0, height - 50, width, 50); 

    fill(0); 
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont('Montserrat');

    // Desenha o placar
    text(`Azul: ${pontosEsquerda}`, width / 4, height - 25);
    text(`Vermelho: ${pontosDireita}`, (3 * width) / 4, height - 25);
}

//=============================================================================================================================\\

function criarBolinha(xbolinha,ybolinha){
    
    image(bolaFutebol, xbolinha - raio, ybolinha - raio, diametro, diametro);

}

//=============================================================================================================================\\

function mexerBolinha(){
    xbolinha += vxbolinha;
    ybolinha += vybolinha;
}

//=============================================================================================================================\\

function colisaoBolinha() {

    if (xbolinha + raio > width || xbolinha - raio < 0) {
        vxbolinha *= -1;
    }
    if (ybolinha + raio > height - 50 || ybolinha - raio < 0) {
        vybolinha *= -1;
    }
}

//=============================================================================================================================\\

function criarRaquete(X,Y,cor){

    fill(cor);
    //Parametros: X,Y,raqtComprimento, raqtAltura 
    rect(X,Y,raqtComprimento,raqtAltura);   
}

//=============================================================================================================================\\

function criarRaquete2(X,Y,cor){

    fill(cor);
    //Parametros: X,Y,raqtComprimento, raqtAltura 
    rect(X2,Y2,raqtComprimento,raqtAltura);   

}

//=============================================================================================================================\\

function colisaoRaquete(X, Y) {
    if (xbolinha - raio < X + raqtComprimento && // Verifica se a bola está tocando a raquete na frente
        xbolinha + raio > X && // Verifica se a bola passou um pouco da raquete
        ybolinha + raio > Y && // Verifica se a bola está dentro da altura da raquete (abaixo do topo)
        ybolinha - raio < Y + raqtAltura // Verifica se a bola está dentro da altura da raquete (acima da base)
    ){

    // Ajusta para evitar que a bola entre na raquete    
    if (xbolinha < width / 2) {
        xbolinha = X + raqtComprimento + raio; 
    }
    else{
        xbolinha = X - raio;
    }
        // Inverte a direção da bola
        vxbolinha *= -1; 
        aumentaVeloBolinha();
    }
}

//=============================================================================================================================\\

function colisaoRaquete2(X2, Y2) {
    
    if (xbolinha - raio < X2 + raqtComprimento && 
        xbolinha + raio > X2 && 
        ybolinha + raio > Y2 && 
        ybolinha - raio < Y2 + raqtAltura 
    ){
           
    if (xbolinha < width / 2) {
        xbolinha = X2 + raqtComprimento + raio; 
    }
    else{
        xbolinha = X2 - raio;
    }
        vxbolinha *= -1; 
        aumentaVeloBolinha();
    }
}

//=============================================================================================================================\\

function movimentarRaquete(){

    // Tecla W
    if (keyIsDown(87)){ 
        Y -=10;
    }

    // Tecla S
    if (keyIsDown(83)){ 
        Y +=10;
    }
}

//=============================================================================================================================\\

function movimentarRaquete2(){
   
    // Seta para cima
    if (keyIsDown(UP_ARROW)){
        Y2 -=10;
    }

    // Seta para baixo
    if (keyIsDown(DOWN_ARROW)){
        Y2 +=10;
    }
}

//=============================================================================================================================\\

function verificarGol() {
    
    if (xbolinha - raio < 0) { 
        pontosDireita++;  
        reiniciarJogo();  
        verificarFimJogo();
    }
    
    
    if (xbolinha + raio > width) { 
        pontosEsquerda++;  
        reiniciarJogo(); 
        verificarFimJogo();
    }
}


//=============================================================================================================================\\

function verificarFimJogo() {
    if (pontosEsquerda >= 3 || pontosDireita >= 3) {
        jogoFinalizado = true;
        pontosEsquerda = 0;
        pontosDireita = 0;
        botaoReiniciar.show();
    }
}

//=============================================================================================================================\\

function reiniciarJogo() {

    // Reset posição bolas
    xbolinha = width / 2;
    ybolinha = height / 2;
    vxbolinha = 20;
    vybolinha = 20;
    X = 30;
    Y = 200;
    X2 = 1405;
    Y2= 200;


    // Aleatorizar para onde a bola vai (esquerda ou direita)
    vxbolinha = 5 * (random() > 0.5 ? 1 : -1);
    vybolinha = 5 * (random() > 0.5 ? 1 : -1);
    
    // Escondendo o botão
    botaoReiniciar.hide();
    jogoFinalizado = false;
}

//=============================================================================================================================\\

function aumentaVeloBolinha() {
    if (vxbolinha > 0) {
        vxbolinha += 0.5;
    } else {
        vxbolinha -= 0.5;
    }

    if (vybolinha > 0) {
        vybolinha += 0.5;
    } else {
        vybolinha -= 0.5;
    }
}

//=============================================================================================================================\\