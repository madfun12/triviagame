import React, { useEffect, useState } from 'react';

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

    let allAnswers = props.answers.map((answer, index) => {
        return{
            answer: answer,
            correct: index === 0 ? "true" : "false",
            active: false,
            id: index
        }})

    let shuffledAnswers = shuffle(allAnswers)

    const [answers, setAnswers] = useState(shuffledAnswers)

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
                const activeStyle = {
                    backgroundColor: answer.active ? "rgb(181, 147, 255)": "transparent"
                }
                const submittedStyle = {
                    backgroundColor: answer.correct === 'true' ? "rgba(0, 201, 94, 0.3)" : "rgba(255, 0, 0, 0.25)"
                }
                return <button id={answer.id} style={props.submitted ? submittedStyle : activeStyle}onClick={selectAnswer}>{decodeURIComponent(answer.answer)}</button>
            })}
        </div>
        )}