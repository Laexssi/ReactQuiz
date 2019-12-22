import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
<ul className={classes.AnswersList}>
    { props.answers.map( (answer, index) => {
        console.log(answer)
        return (
            <AnswerItem 
            answer = {answer} 
            key = {index}
            onClick={props.onClick}
            status = {props.status ? props.status[answer.id] : null}
            />
        )
    })}
</ul>
)

export default AnswersList