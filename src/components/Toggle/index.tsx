
import { useTheme } from '../../hooks/useTheme';
import moonImg from '../../assets/images/moon.svg'
import sunImg from '../../assets/images/sun.svg'
import { Button } from './styles';

export function Toggle() {
    const { theme } = useTheme();

    return (
        <Button>
            <img src={theme.title === 'light' ? moonImg : sunImg} alt="Toogle Sun and Moon" />
        </Button>
    )
};