import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './App.css';
import Header from './components/header';
import Hangman from './components/image';
import Word from './components/word';
import Guess from './components/guess';
import InvalidLetters from './components/invalidLetters';
import Message from './components/message';
const randomWords = require('random-words');

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      position:0,
      word: null,
      letterObjs: [],
      invalidLetters: [],
      letter: null,
      message: 'Hangman is the classic childrens guessing game. In this version the computer comes up with a random word and you have to guess the word. You are given 10 chances to guess the letters correctly. If incorrect, a head, torso, arm, leg, hand, or foot will be drawn. The word will only include uppercase letters. Good Luck!',
      correct: 0
    }
  }

  // Set both the random word and the object containing the letter's styling in local state
  componentDidMount = async () => {
    let wordArr = [];
    const randomWord = randomWords();
    this.setState({word: randomWord});
    
    for(let i = 0; i < randomWord.length; i++) {
      let wordObj = {letter: randomWord[i].toUpperCase(), style: {display: "inline-block", borderBottom: "2px solid black", color:"transparent", width:"50px"}}
      wordArr.push(wordObj);
    }

    this.setState({letterObjs: wordArr});
  }

  validateGuess = () => {
    // Upon each guess, validate the input as a capital letter and remove the current guess
    if(document.getElementById('letter-input').value.match(/[A-Z]/g)) {
      document.getElementById('letter-input').value = '';
      let styledObjs = [];
      let change = false;
      let currCorrect = this.state.correct;
      let currPosition = this.state.position;

      // Find if the letter entered by the user is in the word and if so change the styling of the letter obj
      for(let i = 0; i < this.state.letterObjs.length; i++) {
        let newObj = {};
        newObj.letter = this.state.letterObjs[i].letter;
        newObj.style = {};

        if(this.state.letter === this.state.letterObjs[i].letter) {
          change = true;
          currCorrect++;
          for(const property in this.state.letterObjs[i].style) {
            if(property === 'color') {
              newObj.style.color = 'green';
            } else if(property === 'borderBottom') {
              newObj.style.borderBottom = '2px solid green';
            } else {
              newObj.style[property] = this.state.letterObjs[i].style[property]
            }
          }
        } else {
          newObj.style = this.state.letterObjs[i].style
        }
        styledObjs.push(newObj)
      }

      // If the user entered a correct letter change the message as well as set the letterObjs array
      // to the new styled array of objects and add to the count of current correct
      if(change) {
        if(currCorrect === this.state.letterObjs.length) {
          this.setState({
            letterObjs: styledObjs,
            message: 'Congrats! You Won! Refresh to play again!',
            correct: currCorrect
          });
        } else {
          this.setState({
            letterObjs: styledObjs,
            message: 'Nice Choice! Keep Going.',
            correct: currCorrect
          });
        }
      } else {
        // If the users letter was invalid append it to the list of invalid letters, add to position to
        // render a new stick man image, and change the message
        if(this.state.invalidLetters.length < 9) {
          currPosition++;
          this.setState({
            position: currPosition,
            invalidLetters:[...this.state.invalidLetters, this.state.letter],
            message: 'Invalid Choice! Try Again.'
          });
        } else if(this.state.invalidLetters.length === 9) {
          currPosition++;
          this.setState({
            position: currPosition,
            invalidLetters:[...this.state.invalidLetters, this.state.letter],
            message: 'You Lost! The word was: ' + this.state.word.toUpperCase() + '. Refresh to play again!'
          });
        }
      }
      this.setState({letter: null});
    } else {
      document.getElementById('letter-input').value = '';
      this.setState({letter: null});
      alert('Please Enter a valid input');
    }
  }

  render() {
    return (
      <div>
        <Container className="App">
          <Row style={{marginTop:"2%"}}>
            <Col/>
            <Header/>
            <Col/>
          </Row>
          <Row style={{marginTop:"2%"}}>
            <Col/>
            <Message msg={this.state.message}/>
            <Col/>
          </Row>
          <Row>
            <Col xs={1}/>
            <Col>
              <Hangman pos={this.state.position}/>
            </Col>
            <Col>
              <InvalidLetters invalid={this.state.invalidLetters}/>  
            </Col>
            <Col xs={1}/>
          </Row>
          <div>
            <Row>
              <Col/>
              {this.state.letterObjs.length > 0 ? <Word letterStyle={this.state.letterObjs}/> : null}
              <Col/>
            </Row>
            <Row style={{marginTop: "2%"}}>
              <Col/>
              <Guess setLetter={(x) => this.setState({letter: x})} checkLetter={() => this.validateGuess()}/>
              <Col/>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
