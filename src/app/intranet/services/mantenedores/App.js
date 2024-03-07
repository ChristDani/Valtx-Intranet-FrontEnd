import Routes from './routes';
import UserState from './context/User/UserState';
import ProyectoState from './context/Proyecto/ProyectoState';

import tokenAuth from './config/token';

const user = JSON.parse(localStorage.getItem('user'));

if (user?.token) {
  tokenAuth(user.token);
}

function App() {
  //console.log('en el index app');
  return (
    <div className='App'>
      <UserState>
        <ProyectoState>
          <Routes />
        </ProyectoState>
      </UserState>
    </div>
  );
}

export default App;
