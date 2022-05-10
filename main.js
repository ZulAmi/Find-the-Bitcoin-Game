const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const Bitcoin = 'B';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

class Field {
    field = [[]];

    constructor() {
        //this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter;

        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }
        this.generateField();
    }

    generateField() {
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                const prob = Math.random();
                this.field[y][x] = prob > 0.1 ? fieldCharacter : hole;
            }

        }
        const BitcoinLocation = {
            x: Math.floor(Math.random() * row),
            y: Math.floor(Math.random() * col)
        }

    }

    runGame() {
        let playGame = true;
        while (playGame) {
            this.print();
            this.askQuestion();
            if (!this.inTheField()) {
                playGame = false;
                console.log('Game over. Transfer 1 Bitcoin to this address');
                break;
            } else if (this.isHole()) {
                playGame = false;
                console.log('Sorry, you fell down a hole!');
                break;
            }
            this.field[this.locationX][this.locationY] = pathCharacter;
        }
    }

    inTheField() {
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }


    isHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }


    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt("FIND THE MISSING BITCOIN!!");
        switch (answer) {
            case 'w':
                this.locationX -= 1;
                break;
            case 's':
                this.locationX += 1;
                break;
            case 'a':
                this.locationY -= 1;
                break;
            case 'd':
                this.locationY += 1;
                break;
            default:
                console.log('Enter w, a, s or d.');
                this.askQuestion();
                break;
        }

    }

    fieldArea() {
        return (
            this.locationX == 0 && this.locationY == 0 && this.locationY < this.field.length &&
            this.locationX < this.field[0].length

        )

    }
} // end of field class



const myField = new Field();
myField.runGame();