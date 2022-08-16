import React, { useState, useEffect } from 'react';
import Question from './Question'

export default function Quiz(){

    useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&encode=url3986")
    .then(response => response.json())
    .then(data => setQuiz(data.results))
    },[])

    const [quiz, setQuiz] = useState([])
    const [count, setCount] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    let submittedAnswers = []
    
    function collectActiveAnswers(answer){
        submittedAnswers.push(answer)
        submittedAnswers.map((item,index) => {
            if(item.active === false){
                if(index === 0){
                    submittedAnswers.shift()
                }else{
                    console.log(item)
                    submittedAnswers.splice(index, 1)
                }
            }
        })
    }

    function submit(){
        let counter = 0
        console.log(submittedAnswers)
        submittedAnswers.map(item => {
            if(item.correct === 'true'){
                return counter ++
            }
        })
        setCount(counter)
        setSubmitted(!submitted)
    }

    return(
        <div className='quiz'>
            {quiz.map(item => {
                let answers = [item.correct_answer, ...item.incorrect_answers]
                
                return(
                    <Question 
                        question = {decodeURIComponent(item.question)}
                        answers = {answers}
                        collectAnswers = {collectActiveAnswers}
                        submitted = {submitted}
                    />
                )
            })}
            <div className='submit-info'>
                <button onClick={submit}>Submit Answers</button>
                <span style={{display: submitted ? "block" : "none"}}>You got {count}/5 questions correct!</span>
            </div>
        </div>
    )    
}