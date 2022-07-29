import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';

import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

import illustrationImg from '../../assets/images/illustration.svg';
import LogoImg from '../../assets/images/logo.svg';
import LogoDarkImg from '../../assets/images/logoDark.svg';

import { Button } from '../../components/Button';

import { PageAuth } from './styles';

export function NewRoom() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            //este if não deixa o user criar uma sala sem nome
            //o retrun para o codigo.
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <PageAuth>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className='main-content'>
                    <img src={theme.title === 'light' ? LogoImg : LogoDarkImg} alt='Letmeask' />
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder='Nome da sala'
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </PageAuth>
    )
}