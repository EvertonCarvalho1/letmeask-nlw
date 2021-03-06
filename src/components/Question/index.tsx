import { ReactNode, useMemo } from 'react';
import classNames from 'classnames';

import { Container } from './styles';

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

    const getFirstLetters = useMemo(() => {
        let myStr = author.name;
        let matches = myStr.match(/\b(\w)/g);
        return matches?.join('').toLocaleUpperCase();  
    }, [author.name]);

    return (
        <Container
            className={classNames(
                'question',
                { answered: isAnswered },
                { highlighted: isHighLighted && !isAnswered },
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={getFirstLetters} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </Container>
    )
}