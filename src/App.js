// ** Router Import
// import Router from './router/Router'

// const App = props => <Router />

// export default App


import Router from "./router/Router";
import { I18nProvider } from "./@core/i18n";

const App = (props) => (
  <I18nProvider>
    <Router />
  </I18nProvider>
);

export default App;
