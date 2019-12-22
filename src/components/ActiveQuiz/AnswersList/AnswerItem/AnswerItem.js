import React from 'react'
import classes from './AnswerItem.module.css'

const AnswerItem = props => {

    const cls = [classes.AnswerItem]

    if (props.status) {
        cls.push(classes[props.status])
    }
 return (
     <li 
     className = {cls.join(' ')}
     onClick={() => props.onClick(props.answer.id)}
     >
         { props.answer.text}
     </li>
 )
}

export default AnswerItem