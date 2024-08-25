import TickMark from '../../assets/TickMark.svg';
import CrossMark from '../../assets/CrossMark.svg';

export default function Validations(props) {
    return (
        <section className="password-validation">
            <ul>
                <li><img src={props.length ? TickMark : CrossMark}/> <span>Contains atleast 10 characters</span></li>
                <li><img src={props.hasDigit ? TickMark : CrossMark}/> <span>Contains digit</span></li>
                <li><img src={props.hasUpperCase ? TickMark : CrossMark}/> <span>Contains Uppercase Letters</span></li>
                <li><img src={props.hasLowerCase ? TickMark : CrossMark}/> <span>Contains Lowercase Letters</span></li>
                <li><img src={props.hasSpecialChar ? TickMark : CrossMark}/> <span>Contains Special Characters</span></li>
                <li><img src={props.passwordMatch ? TickMark : CrossMark}/> <span>Passwords match</span></li>
            </ul>
        </section>
    )
}