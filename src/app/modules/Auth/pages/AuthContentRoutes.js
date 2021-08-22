import { Redirect, Route, Switch } from 'react-router-dom'
import {lazy} from "react";
import { PageNotFound } from '../../../../commonPages'

const LoginPage = lazy(() =>
  import("./Login")
)
const RegisterPage = lazy(() =>
  import("./RegisterPage")
)

function AuthContentRoutes() {
  return (
    <div className="bg-primary" >
    <Switch>
      <Route path="/auth/login" component={LoginPage} exact />
      <Route path="/auth/register" component={RegisterPage} exact />

      <Redirect from="/auth" to="/auth/login" exact />
      <Route path="*" component={PageNotFound} />
    </Switch>
    </div>
  )
}

export default AuthContentRoutes
