import React from 'react'
import { Link } from 'react-router-dom';
import { getQuestionFormatted } from '../util/util';

export default function QuestionListItems(props) {
    return (
        <ul>
            {(props && props.questionsList && props.questions) && (
                props.questionsList.map(id => {
                    const prettyQuestion = getQuestionFormatted(id, props.questions);
                    const link = `/questions/${id}`
                    return (
                        <li key={id}>
                            <Link to={link} className="question-list">Would You Rather: {prettyQuestion}</Link>
                        </li>
                    )
                })
            )}
        </ul>
    )
}
