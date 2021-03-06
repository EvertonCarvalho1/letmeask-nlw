import { FormEvent, useState} from 'react';
import { shade } from 'polished';
import Switch from 'react-switch';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

import illustrationImg from '../../assets/images/illustration.svg';
import LogoImg from '../../assets/images/logo.svg';
import LogoDarkImg from '../../assets/images/logoDark.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';

import { database } from '../../services/firebase';

import { PageAuth } from "./styles";
import dark from '../../styles/themes/dark';
import light from '../../styles/themes/light';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    const { theme, setCurrentTheme } = useTheme();

    async function handleCreateRoom() {

        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get();
        console.log(roomRef, roomCode)

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    function toggleTheme() {
        setCurrentTheme(theme.title === 'light' ? dark : light);
    }

    return (
        <>
            <PageAuth>

                <aside>
                    <Switch
                        className='switch-styles'
                        onChange={toggleTheme}
                        checked={theme.title === 'dark'}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={10}
                        width={40}
                        handleDiameter={20}
                        offColor={shade(0.15, theme.colors.body.color1)}
                        onColor={theme.colors.body.color2}
                    />

                    <img src={illustrationImg} alt="Ilustra????o simbolizando perguntas e respostas" />
                    <strong>Crie salas de Q&amp;A ao-vivo</strong>
                    <p>Tire as d??vidas da sua audi??ncia em tempo-real</p>
                </aside>

                <main>
                    <div className='main-content'>


                        <img src={theme.title === 'light' ?  LogoImg : LogoDarkImg} alt='Letmeask' />

                        <button onClick={handleCreateRoom} className='create-room'>
                            <img src={googleIconImg} alt="Logo do Google" />
                            Crie sua sala com o Google
                        </button>
                        <div className='separator'>ou entre em uma sala</div>
                        <form onSubmit={handleJoinRoom}>
                            <input
                                type="text"
                                placeholder='Digite o c??digo da sala'
                                onChange={(event) => setRoomCode(event.target.value)}
                            />
                            <Button type="submit">
                                Entrar na sala
                            </Button>
                        </form>
                    </div>
                </main>
            </PageAuth>

        </>
    )
}