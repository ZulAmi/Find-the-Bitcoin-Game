const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const Bitcoin = 'B';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
const percentage = 0.1;
const bitcoinpercentage = 0.01;

class Field {
    field = [[]];

    constructor() {
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter;

        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }
        this.generateField();
    }

    generateField() {
        for (let y = 0; y < col; y++) {
            for (let x = 0; x < row; x++) {
                const rand = Math.random();
                this.field[y][x] = rand > percentage ? fieldCharacter : hole;
                // this.field[y][x] = rand > bitcoinpercentage ;

            }

        }


    }

    runGame() {
        let playGame = true;
        while (playGame) {
            this.print();
            this.askQuestion();
            if (!this.inTheField()) {
                playGame = false;
                console.log('You left the field! Transfer 1 Bitcoin to continue!');
                break;
            }
            else if (this.isHole()) {
                playGame = false;
                console.log('You fell down a hole! Transfer 1 Bitcoin to continue!');
                break;
            }
            else if (this.isBitcoin()) {
                playGame = false;
                console.log('You won a bitcoin! We will transfer 1 Bitcoin to your wallet address!');
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

    isBitcoin() {
        return this.field[this.locationY][this.locationX] === Bitcoin;
    }


    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt('Find the Bitcoin and win').toUpperCase();
        switch (answer) {
            case 'W':
                this.locationX -= 1;
                break;
            case 'S':
                this.locationX += 1;
                break;
            case 'A':
                this.locationY -= 1;
                break;
            case 'D':
                this.locationY += 1;
                break;
            default:
                console.log('Enter W, A, S or D.');
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