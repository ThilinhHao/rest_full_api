import React, { Suspense, useState, useLayoutEffect } from 'react';

import RootWrapper from './wrappers/RootWrapper';

import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StyleGlobal } from 'styles';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import { persistor, store } from 'rootStore';
import { createBrowserHistory } from 'history';

import 'dayjs/locale/ja';
import locale from 'antd/locale/ja_JP';

import { getColorSite } from 'helper/colorSite';

export const history = createBrowserHistory();

const CustomRouter = ({ history, ...props }: any) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return <Router {...props} location={state.location} navigationType={state.action} navigator={history} />;
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CustomRouter history={history}>
          <Suspense fallback={null}>
            <ConfigProvider
              theme={{ token: { colorPrimary: getColorSite(), fontFamily: 'Noto Sans JP , sans-serif' } }}
              locale={locale}
            >
              <StyleGlobal />
              <RootWrapper />
            </ConfigProvider>
          </Suspense>
        </CustomRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
