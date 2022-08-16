import React, { useState } from 'react';

export default function Question(props){

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex !== 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    let shuffledAnswers = shuffle(props.answers)

    const [answers, setAnswers] = useState(shuffledAnswers.map((answer, index) => {
        return{
            answer: answer,
            correct: index === 0 ? "true" : "false",
            active: false,
            id: index
        }
    }))

    function selectAnswer(event){
        answers.map((answer,index) => {

            if(parseInt(event.target.id) === answer.id){
                setAnswers(oldAnswers => {
                    oldAnswers[index].active = !answer.active
                    props.collectAnswers(oldAnswers[index])
                    return([...oldAnswers])
                })
            }else{
                answer.active = false
            }
        })
    }
        

    return(
        <div className="question">
            <h3>{decodeURIComponent(props.question)}</h3>
            {answers.map(answer => {
                return <button id={answer.id} style={{backgroundColor: answer.active ? "rgb(181, 147, 255)": "transparent"}}onClick={selectAnswer}>{decodeURIComponent(answer.answer)}</button>
            })}
        </div>
        )}