import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import ClientsList from './pages/Clients/ClientsList';
import ClientForm from './pages/Clients/ClientsForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/home" component={Home}/>
        <PrivateRoute path="/clientes" exact component={ClientsList} />
        <PrivateRoute path="/clientes/new" component={ClientForm} />
        <PrivateRoute path="/clientes/:id" component={ClientForm} />
      </Switch>
    </Router>
  );
}

export default App;
