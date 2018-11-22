function runGame()
{
    if (!game.isRunning) {
        game.isRunning = true;
        game.start();
    }
}

function translate(el)
{
    switch(el) {
        case "yellow":
            return "Jaune";
            break;
        case "blue":
            return "Bleu";
            break;
        case "brown":
        return "Marron";
            break;
        case "green":
            return "Vert";
            break;
        default:
            return el;

    }
}

let startButton = document.getElementById('start'),
    gameBoard = document.getElementById('game'),
    garbageDisplay = document.getElementById('garbage-display'),
    bins = document.getElementsByClassName('bin'),
    scoreBoard = document.getElementById('score');


let game = {
    isRunning : false,
    garbage : null,
    score : 0,
    correction: [],

    start: function()
    {
        game.garbage = garbage.init();

        game.displayGarbage();
        animator.playStartAnimations();

        for (let i = 0; i < bins.length; i++)
        {
            bins[i].addEventListener('click', function(){
                // Only fires if container still has child nodes
                if (garbageDisplay.hasChildNodes())
                {
                    let currentItem = garbage.getCurrentItem(garbageDisplay.firstChild);


                    if (this.id === currentItem.reponse) {
                        game.score++;
                        game.correction.push(
                            {
                                "nom": currentItem.nom,
                                "reponse" : currentItem.reponse,
                                "userChoice" : this.id,
                                "result" : "Bonne réponse!"
                            }
                        );
                    } else {
                        game.correction.push(
                            {
                                "nom": currentItem.nom,
                                "reponse" : currentItem.reponse,
                                "userChoice" : this.id,
                                "result" : "Mauvaise réponse!"
                            }
                        )
                    }


                    animator.hide(garbageDisplay.firstChild);

                 // Fires when container has no more child nodes, display score
                } else {
                   score.display(game.correction);
                }
            });
        }
    },

    displayGarbage: function()
    {
        for (let i = 0; i < this.garbage.length; i++)
        {
            let div = document.createElement('div'),
                img = document.createElement('img'),
                h2 = document.createElement('h2');

            div.classList.add('dechet-container');
            div.style.position = "relative";
            div.id = this.garbage[i].reponse;
            img.src = this.garbage[i].lienImage;
            h2.innerHTML = this.garbage[i].nom;

            div.appendChild(img);
            div.appendChild(h2);

            garbageDisplay.appendChild(div);

        }
    }
};

let garbage = {

    garbageArray : [],
    list: [
        {
            "nom" : "Bouteille de lait",
            "lienImage" : "img/lait.jpg",
            "reponse" : "yellow"
        },
        {
           "nom": "Bouteille d'eau",
            "lienImage": "img/eau.jpg",
            "reponse" : "yellow"
        },
        {
            "nom": "Flacon de gel douche",
            "lienImage": "img/geldouche.jpg",
            "reponse" : "yellow",
        },
        {
            "nom": "Boîte de conserve en fer",
            "lienImage": "img/conservemetal.jpg",
            "reponse" : "yellow"
        },
        {
            "nom" : "Bouteille d'huile",
            "lienImage": "img/huile.jpg",
            "reponse" : "green"
        },
        {
            "nom": "Pot de confiture",
            "lienImage": "img/confiture.jpg",
            "reponse" : "green",
        },
        {
            "nom": "Bouteille de vin",
            "lienImage": "img/vin.jpg",
            "reponse" : "green",
        },
        {
            "nom" : "Bocal de soupe",
            "lienImage" : "img/soupe.jpg",
            "reponse" : "green",
        },
        {
            "nom" : "Programme télé",
            "lienImage" : "img/programmetele.jpg",
            "reponse" : "blue",
        },
        {
            "nom" : "Journal",
            "lienImage": "img/journal.jpg",
            "reponse" : "blue",
        },
        {
            "nom" : "Catalogue la Redoute",
            "lienImage" : "img/redoute.jpg",
            "reponse" : "blue",
        },
        {
            "nom": "Magazine de jeux vidéos",
            "lienImage" : "img/jeuxvide.png",
            "reponse" : "blue",
        },
        {
            "nom" : "Pot de yaourt",
            "lienImage" : "img/yaourt.jpg",
            "reponse": "brown",
        },
        {
            "nom" : "Couche-culotte",
            "lienImage" : "img/coucheculotte",
            "reponse" : "brown",
        },
        {
            "nom" : "Peau de banane",
            "lienImage" : "img/banane.jpg",
            "reponse" : "brown",
        },
        {
            "nom" : "Peau d'orange",
            "lienImage" : "img/orange.jpg",
            "reponse" : "brown",
        }
    ],

    init: function()
    {

        for (let i = 0; i < 9; i++)
        {
            let rand = Math.floor(Math.random() * 10);
            this.garbageArray.push(this.list[rand]);
        }

        return this.garbageArray;
    },

    getCurrentItem : function(el)
    {
        let html = el.firstChild.nextSibling.innerHTML;

        for (let i = 0; i < this.list.length; i++)
        {
            if (this.list[i].nom === html) {
                return this.list[i];
            }
        }
    }
};

let score = {

    display: function(arrayOfObjects)
    {
        let h1 = document.createElement('h1');
        h1.innerHTML = "Score";
        scoreBoard.appendChild(h1);

        let p = document.createElement('p');
        p.id = "total";
        p.innerHTML = `Total: ${game.score} / 10`;
        scoreBoard.appendChild(p);

        let scoreContainer = document.createElement('div');
        scoreContainer.classList.add('correction-container');

        for (let object of arrayOfObjects)
        {
            console.log(object);

            let classCorrection = document.createElement('div'),
                pNom = document.createElement('p'),
                pResult = document.createElement('p'),
                pReponse = document.createElement('p'),
                pUserChoice = document.createElement('p');



                classCorrection.classList.add('correction');
                pNom.innerHTML = `Déchet: ${object.nom}`;
                pResult.innerHTML = `C'est une ${object.result}`;
                pReponse.innerHTML = `La bonne réponse était: ${translate(object.reponse)}`;
                pUserChoice.innerHTML = `Vous avez répondu: ${translate(object.userChoice)}`;


                classCorrection.appendChild(pNom);
                classCorrection.appendChild(pResult);
                classCorrection.appendChild(pReponse);
                classCorrection.appendChild(pUserChoice);


                scoreContainer.appendChild(classCorrection);
        }


        animator.switchScreens();
        scoreBoard.appendChild(scoreContainer);
        document.body.style.overflowY = "scroll";
    }

}

let animator = {

    playStartAnimations: function()
    {
        startButton.classList.add('startButtonToLeft');
        garbageDisplay.classList.add('garbageContainerToTop');
    },

    hide(el)
    {
        el.classList.add('hideGarbage');
        startButton.removeEventListener('click', runGame);
        setTimeout(function() {
            el.remove();
            startButton.addEventListener('click', runGame);
        }, 400);
    },

    switchScreens: function()
    {
        gameBoard.classList.add('gameBoardToLeft');
        scoreBoard.classList.add('scoreBoardToLeft');
    }
};



startButton.addEventListener('click', runGame);
