import { ReactNode } from 'react';

import '../styles/question.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode; // ReactNode qualquer coisa que é aceitava dentro de um return do React (html)
}

export function Question({
    content,
    author,
    children
}: QuestionProps) {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}