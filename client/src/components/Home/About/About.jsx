import Button from './Button';
import { useNavigate } from 'react-router-dom';
import aboutImage from '../../../assets/aboutImage.png';

export default function About() {
    const navigate = useNavigate();
    return (
        <>
            <section className="about">
                <section>
                    <h1>Learniverse</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus est, volutpat quis ex ac, gravida ultricies mi. Donec cursus mauris ac ante sagittis, eget facilisis eros blandit. Phasellus dui velit, ornare sed imperdiet vitae, consectetur ut metus. Proin mollis urna vel nisl finibus, quis eleifend magna venenatis.</p>
                    <Button handleClick={() => navigate('/register')} />
                </section>
                <section>
                    <img src={aboutImage} />
                </section>
            </section>
        </>
    )
}