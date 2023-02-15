const road = document.querySelector('.road');
const container = document.querySelectorAll('.container');
const car = document.querySelector('.car');
const info = document.querySelector('.info');
const score = document.querySelector('.score');



const roadStyles = window.getComputedStyle(road);
const roadWidth = parseInt(roadStyles.getPropertyValue('width'));
const roadheight = parseInt(roadStyles.getPropertyValue('height'));
console.log(roadheight)

const carStyles = window.getComputedStyle(car);
const carWidth = parseInt(carStyles.getPropertyValue('width'));
const carTop = parseInt(carStyles.getPropertyValue('top'));
const carLeft = parseInt(carStyles.getPropertyValue('left'));

let startGame = false;
let matchScore = 0;
let positionLines = 0;
let positionCars = 0;
let goRight = 0;
let goLeft = carLeft;
let goTop = carTop;
let goDown = 0;

const carMovement = {
    rightMovement() {
        goLeft += 5;
        car.style.left = goLeft + 'px';
    },

    leftMovement() {
        goLeft -= 5;
        car.style.left = goLeft + 'px';
    },

    upMovement() {
        goTop -= 5;  
        car.style.top = goTop + 'px';
        console.log(car.style.top);
    },
}


const isCollide = (a, b) => {

    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    // let carRect = car.getBoundingClientRect();
    // console.log(carRect.top)
    
    return (
       aRect.top < bRect.bottom &
       aRect.bottom > bRect.top &
       aRect.right > bRect.left &
       aRect.left < bRect.right
    )

}

const endGame = () => {
    startGame = false;
    score.innerHTML = `Game Over<br>
                       Score: ${matchScore}`;
    // info.classList.remove('hide');
    // road.innerHTML = '';
}

const randomColor = () => {
    let hex = Math.floor(Math.random() * 255).toString(16);
    return (
        parseInt(hex, 16)
    )
}


let otherCarsMovement = () => {
    let car = document.querySelector('.car');
    let otherCars = document.querySelectorAll('.otherCar');
    
    otherCars.forEach((otherCar) => {
        positionCars += 2;

        if(isCollide(car, otherCar)) {
            console.log("Hit");
            endGame();
        }

        if(positionCars >= 2000) {
            positionCars = 0;
            otherCar.style.left = Math.floor(Math.random() * 250);
        }      
        otherCar.style.transform = `translateY(${positionCars}px)`;       
    })

    if(startGame) {
        window.requestAnimationFrame(otherCarsMovement);
    }
}



const createOtherCars = () => {
    for(let i = 1; i < 4; i++) {
        const otherCar = document.createElement('div');
        otherCar.classList.add('otherCar');
        car.after(otherCar);

        otherCar.style.left = Math.floor(Math.random() * 250);
        otherCar.style.top = i * (-300);
        otherCar.style.backgroundColor = randomColor();
    }

    // otherCar.style.left = Math.floor(Math.random() * 250);
    // // otherCar.style.top = (Math.floor(Math.random() * (0.01 * roadheight)));
    // otherCar.style.top = (Math.floor(Math.random()));
    window.requestAnimationFrame(otherCarsMovement);
}



let linesMovement = () => {
    let roadLines = document.querySelectorAll('.roadLine')
    roadLines.forEach((roadLine) => {
        positionLines += 0.5;

        if(positionLines >= 2 * roadheight) {
            positionLines = 0
        }      
        roadLine.style.transform = `translateY(${positionLines}px)`;     
    })

    if(startGame) {
        window.requestAnimationFrame(linesMovement);
        matchScore++;
        score.innerHTML = `Score: ${matchScore}`       
    }
}

const createLines = () => {
    let k = -2500;

    for(let i = 0; i < 15; i++) {
        const roadLine = document.createElement('div');
        roadLine.classList.add('roadLine');
        roadLine.style.top += k + "px";
        road.appendChild(roadLine);
        k += 250;
    }

    window.requestAnimationFrame(linesMovement);
}


info.addEventListener('click', () => {

    // const car = document.createElement('div');
    // car.classList.add('car');
    // road.appendChild(car);       
    startGame = true;
    info.classList.add('hide');
    createLines();
    createOtherCars();
    
})

document.addEventListener('keydown', (e) => {

    switch(e.key) {
        case "ArrowRight":
            // console.log(Math.abs(roadWidth) * -1);
            // console.log(Math.abs(carWidth) * -1);
            if(goLeft < (roadWidth - carWidth) && startGame) {
                carMovement.rightMovement();
            }
            break;

        case "ArrowLeft":
            if(goLeft > 0 && startGame) {
            carMovement.leftMovement();
            }
            break;

        case "ArrowUp":
            if(goTop > 0.1 * roadheight && startGame) {
                carMovement.upMovement();  
            }
            break;
    } 
})
