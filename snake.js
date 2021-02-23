const canvas= document.getElementById('snake');
const context = canvas.getContext("2d");

let dir, food, head, flag=false;
let stop= setInterval(animation,222);

let counters= {
	score: 0,
	foodCount: 0, 
}

function updatescore (){
	document.getElementById('score').innerText="your score is " + counters.score;
}

function instructions(){
    document.getElementById('instructions').innerText = 'ArrowLeft: move a cobra para a esquerda\nArrowUp: move a cobra para cima\nArrowRight: move a cobra para a direita mais depressa\nArrowDown: move a cobra para baixo';
}

function foodSpawner(){
	food={
		x: Math.floor(Math.random()*40),
		y: Math.floor(Math.random()*25),
	}
}

function init(){
	dir='right';
	head=[
		{x: 40, y:40},
		{x: 70, y:40},
		{x: 100, y:40},	
	]
	counters.score= 0;
	flag= false;
	foodSpawner();
}

document.addEventListener('keydown', event =>{
    let key = event.keyCode;

    switch(key){
        case 37: //seta esquerda
            if(dir != 'right'){
                dir = 'left';
            }

            break;

        case 38: //seta cima
            if(dir != 'down'){
                dir = 'up';
            }
            break;

        case 39: //seta direita
            if(dir != 'left'){
                dir = 'right';
            }
            break;

        case 40: //seta baixo
            if(dir != 'up'){
                dir = 'down';
            }
            break;


        case 32: //barra de espaco
            init();
            break;

        default:
            break;
    }
});

function grow (){
	let lastPos= head[head.length-1];
	if (dir=='right') {
		head.push({x: lastPos.x+30,y: lastPos.y})
	}
	else if (dir=='left') {
		head.push({x: lastPos.x-30,y: lastPos.y})
	} else if (dir=='up') {
		head.push({x: lastPos.x,y: lastPos.y-30})
	} else if (dir=='down') {
		head.push({x: lastPos.x,y: lastPos.y+30})
	}
}

function stopTime(flag){
	if (flag) {
	    context.clearRect(0,0, 900,555);
        context.font = "50px Arial"; //define o tamanho e font do texto
        context.fillStyle = 'white'; //cor do texto
        context.textAlign = "center"; //alinhamento do texto
        context.fillText("GAME OVER", 400, 200);
        context.fillText("press space to restart", canvas.width/2, canvas.height/2);
        context.fillText("Score: " + counters.score , 400, 300);

        clearInterval(stop);
        stop=0;
        if (stop==0) {
        	document.addEventListener('keydown', event =>{
    			let key = event.keyCode;
    			if (key==32) {
    				stop= setInterval(animation,222);
    				init();
    			}
    		})	
        }
	}
}

function animation(){
	context.clearRect(0,0, 900,555);
	context.fillStyle='lightgreen'
	head.shift()
	grow();
	let lastPos= head[head.length-1];
	if (lastPos.x==food.x*30 && lastPos.y==food.y*30) {
		counters.foodCount++;
		counters.score+=5*head.lenghth*counters.foodCount;
		updatescore();
		foodSpawner();
		grow();
	}
	for(let i = 0; i < head.length; i++){
        ball = head[i];

        //caso a cobra chegue a um limite, ela recomecara no limite contrario
        if(ball.x > 780){
            ball.x = 0;
        }else if(ball.y > 480){
            ball.y = 0;
        }else if(ball.x < 0){
            ball.x = 780;
        }else if(ball.y < 0){
            ball.y = 480;
        }

        //verificar se a cobra colide consigo mesma
        if(ball.x == lastPos.x && ball.y == lastPos.y && i < head.length-2){
            flag = true;
            stopTime(flag);
        }

        context.fillRect(ball.x, ball.y, 29, 29);

    }
    context.fillStyle = 'red';
    context.fillRect(food.x *30, food.y *30 , 29, 29);
}




updatescore();
instructions();
init();