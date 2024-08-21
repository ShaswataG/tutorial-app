export default function Login() {
    return (
        <>
            <h1>Login</h1>
            <form>
                <label for="fullname">Full Name</label>
                <input id="fullname" type="text" placeholder="Enter your full name"/>
                <label for="mailid">Email Id.</label>
                <input id="mailid" type="email" placeholder="abc@example.com"/>
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Password"/>
                <label for="confirm-password">Confirm Password</label>
                <input id="confirm-password" type="password" placeholder="Confirm Password"/>
                
            </form>
        </>
    )
}