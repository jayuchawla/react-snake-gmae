import React, {Component} from 'react';
import { render } from '@testing-library/react';
import Snake from './Components/Snake/Snake';
import Food from './Components/Food/Food';

const getRandomFoodCoordinates = () => {
  let min = 1;
  let max = 99;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y];
}

class App extends Component {

  state = {
    food:getRandomFoodCoordinates(),
    speed: 200,
    direction:'RIGHT',
    snakeDots: [
      [0,0],
      [2,0]
    ]
  }

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkBoundary();
    this.eatFood();
    this.checkcollapse();
    this.changecolors();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch(e.keyCode){
      case 38:
        this.setState({direction:'UP'});
        break;
      case 40:
        this.setState({direction:'DOWN'});
        break;
      case 37:
        this.setState({direction:'LEFT'});
        break;
      case 39:
        this.setState({direction:'RIGHT'});
    }
    console.log(this.state.direction);
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch(this.state.direction){
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({snakeDots:dots});
  }

    changecolors = () => {
      var d = document.getElementById("gA");
      var colors = ['linear-gradient(pink, yellow)','linear-gradient(blue, green)','linear-gradient(orange, red)'];
      var currentIndex = 0;
      setInterval(function () {
        d.style.background= colors[currentIndex] ;
        if (!colors[currentIndex]) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
      }, 2000);
    }

    checkBoundary = () => {
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      if(head[0] >= 100 || head[0] <0 || head[1] >= 100 || head[1] <0){
        this.gameOver();
      }
    }

    checkcollapse = () => {
      let snake = [...this.state.snakeDots];
      let head = snake[snake.length-1];
      snake.pop();
      snake.forEach(dot => {
        if(head[0] === dot[0] && head[1] === dot[1]){
          this.gameOver();
        }
      });
    }
    
    gameOver = () => {
      alert(`Game Over. Score: ${this.state.snakeDots.length}`);
      this.setState({
        food:getRandomFoodCoordinates(),
        speed: 200,
        direction:'RIGHT',
        snakeDots: [
          [0,0],
          [2,0]
        ]        
      })
    }
    
    eatFood = () => {
      let foodpos = this.state.food;
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      let dots = [...this.state.snakeDots];
      let speed_1 = this.state.speed;
      if(head[0] === foodpos[0] && head[1] === foodpos[1]){
        dots.unshift([]);
        this.setState({food:getRandomFoodCoordinates(),snakeDots:dots});
        if(this.state.speed>10){
          this.setState({speed:(this.state.speed - 10)});
        }
        console.log(this.state.speed);
      }
    }

    render(){
    return (
      <div className="gameArea" id="gA">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot = {this.state.food} />
      </div>
    );
  }
}

export default App;
