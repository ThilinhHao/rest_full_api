import React from 'react';
import App from './App';
import 'styles/index.scss';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Helmet } from 'react-helmet';
import images from '@assets/images-base';
import { getFullHostName } from 'helper';
import configs from 'config';
const rootElement: any = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <>
    <Helmet>
      <link
        rel="icon"
        href={
          getFullHostName() === configs.APP_FRONTEND_COMPANY ? images.sideBar.moaiCompany : images.sideBar.moaiOperator
        }
      />
    </Helmet>
    <App />
  </>
);

// ReactDOM.render(
// <React.StrictMode>
// <App />,
// </React.StrictMode>,
//   document.getElementById('root')
// );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.unregister();
