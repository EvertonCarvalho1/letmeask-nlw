import { ReactNode } from 'react';
import classNames from 'classnames';

import '../styles/question.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode; // ReactNode qualquer coisa que é aceitava dentro de um return do React (html)
    isAnswered?: boolean;
    isHighLighted?: boolean;
}

export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighLighted = false
}: QuestionProps) {
    return (
        <div
            className={classNames(
                'question',
                { answered: isAnswered },
                { highlighted: isHighLighted },
            )}
        >
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