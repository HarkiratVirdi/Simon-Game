// const green = document.getElementById('green');
// const red = document.getElementById('red');
// const yellow = document.getElementById('yellow');
// const blue = document.getElementById('blue');
const title = document.getElementById('level-title');
const btns = document.querySelectorAll('.btn');
let arrAuto = [];
let arrMe = [];
let j = 1;


document.addEventListener('keyup', function(e)
{
    if((e.key === 'a' || e.key === 'A' && title.innerHTML === 'Press A Key to Start'))
    {
        title.innerHTML = 'Level ' + '1';
        animate();
    }
})

    btns.forEach(btn => {
        btn.addEventListener('click', function()
        {
            arrMe.push(this.id);
            console.log(arrMe);

        if(arrayEquals(arrAuto, arrMe) && checkElement(arrAuto, arrMe))
        {
            animate();
            levelUp();
        }else if((checkElement(arrAuto, arrMe) && checkEveryElement(arrAuto,arrMe)) || arrayEquals(arrAuto, arrMe)) 
        {
            console.log('keep going');
        }else{
            document.body.classList.add('game-over');
            restart();
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();

            setTimeout(() => {
                document.body.classList.remove('game-over');
            }, 1000);

        }

        })
    });

function arrayEquals(a, b) {
  return (a.length === b.length) &&
    a.every((val, index) => val === b[index]);
}

function checkElement(a, b)
{
let result = '';
    for(let l = 0; l < b.length; l++)
    {
     result= JSON.stringify(a.slice(0,l)) == JSON.stringify(b.slice(0,l));
    }
return result;
}

function checkEveryElement(a, b)
{
    for(let l = 0; l < 20; l++)
    {
       return JSON.stringify(a[l]) == JSON.stringify(b[l]);
    }
}


function randomNumberAuto()
{
    let random = Math.floor(Math.random() * 4 + 1);
    let color = '';

    if(random === 1)
    {
        color = 'green';
    }
    else if(random === 2)
    {
        color = 'red';
    }
    else if(random === 3)
    {
        color = 'yellow';
    }
    else
    {
        color = 'blue';
    }

    return color;
}

function addToarrAuto()
{
    arrAuto.push(randomNumberAuto());
    return arrAuto;
}

function slicing()
{
    for(let i = 0; i < 20; i++)
    {
        let sliced = addToarrAuto().slice(i, j);
        j++;
        return sliced;
    }
}

function animate()
{
    arrMe = [];
    let colour = slicing().slice(-1)[0];
    document.getElementById(colour).classList.add('pressed');

    playAudio(colour);

    setTimeout(function()
    {
        document.getElementById(colour).classList.remove('pressed');       
    }, 1000);
    console.log(arrAuto); 
}


function levelUp()
{
    title.innerHTML = 'Level ' + arrAuto.length;
}

function restart()
{
    arrAuto = [];
    title.innerHTML = 'Press A Key to Start';
    arrMe = [];
}


function playAudio(colour)
{ 
    if(colour == 'red')
    {
        var audio = new Audio('sounds/red.mp3');
        audio.play();
    }else if(colour == 'green')
    {
        var audio = new Audio('sounds/green.mp3');
        audio.play();
    }
    else if(colour == 'yellow')
    {
        var audio = new Audio('sounds/yellow.mp3');
        audio.play();
    }
    else
    {
        var audio = new Audio('sounds/blue.mp3');
        audio.play();
    }
}