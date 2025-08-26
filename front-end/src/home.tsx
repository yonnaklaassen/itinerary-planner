import { useUser } from './contexts/user-context';
import './home.css'

function Home() {
    const { user } = useUser();

    return (
        <div className="home">
            <header className="home-header">
                {user ? <p>Hello {user.name} 👋</p> : <p>Log in to unlock all features!</p>}
            </header>
        </div>
    );
}

export default Home;