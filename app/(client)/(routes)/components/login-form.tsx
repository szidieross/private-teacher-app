import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<{ username: string }>('/api/login', {
                username,
                password
            });
            console.log(response.data);
            // Itt tárolhatod a session azonosítót a localStorage vagy sessionStorage segítségével
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
