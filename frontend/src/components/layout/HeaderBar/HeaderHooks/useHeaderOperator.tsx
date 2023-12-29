import React, { useCallback, useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storeSetAuth } from '@store/auth-reducer';
import { CONST_COMMON } from 'constants/language';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { MenuProps, theme } from 'antd';
import { IFootstepsHistory } from '@pages/OperatorSite/FootstepsHistory/useFootstepsHistory';
import { getEmailFirebase, getPasswordFirebase } from 'helper/firebase';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestoreFirebaseApp, firestoreFirebaseAuthApp } from '@hooks/useFireBase/useFireBase';
import { apiOperatorFootstepsHistory, getCompanyCountChatMessagesNotRead } from 'api/operator';

const useHeaderOperator = ({ onHandleLogout }: any) => {
  const [listNoticeCurrent, setListNoticeCurrent] = useState<string[]>([]);
  const timeComponentRender = useRef<Date>(new Date());

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={onHandleLogout}>{CONST_COMMON.PROFILE_POPUP.LOGOUT}</div>,
    },
  ];

  const firestoreFirebase = firestoreFirebaseApp;
  const firestoreFirebaseAuth = firestoreFirebaseAuthApp;
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const [messagesNotRead, setMessagesNotRead] = useState<number>(0);
  const [messagesMysqlNotRead, setMessagesMysqlNotRead] = useState<number>(0);

  const [messagesNotReadShow, setMessagesNotReadShow] = useState<number>(0);

  const getListHistory = async () => {
    try {
      const response = await apiOperatorFootstepsHistory({
        date: dayjs().format('YYYY-MM'),
        page: 1,
        per_page: 5,
      });
      if (responseSuccess(response)) {
        setListNoticeCurrent(
          response?.data?.data[0].slice(0, 5).map((element: IFootstepsHistory) => element.description)
        );
      }
    } catch (errors) {}
  };

  useEffect(() => {
    getListHistory();
  }, []);

  // count total mesasge mysql not read
  const getTotalMessageNotRead = async () => {
    const response = await getCompanyCountChatMessagesNotRead();
    if (responseSuccess(response)) {
      setMessagesMysqlNotRead(response.data.count);
    }
  };

  const handleClickChat = () => {
    getTotalMessageNotRead();
    navigate('/chat');
  };

  // get messages not read
  const getMessages = useCallback(() => {
    if (!authInfo || !firestoreFirebaseAuth?.currentUser || !firestoreFirebase) return;

    const messagesRef = collection(firestoreFirebase, 'messages');
    const queryGetListMessage = query(messagesRef);

    onSnapshot(queryGetListMessage, (messagesSnapshot: any) => {
      let countMessage = 0;
      messagesSnapshot.docs.forEach((doc: any) => {
        const messageData = doc.data();
        if (!messageData.reads?.includes(`${authInfo.user.user_role}.${authInfo.user.id}`)) {
          countMessage++;
        }
      });

      setMessagesNotRead(messagesMysqlNotRead + countMessage);
    });
  }, [authInfo, firestoreFirebase, messagesMysqlNotRead, firestoreFirebaseAuth?.currentUser]);

  // get new notice
  const getNotice = useCallback(() => {
    if (!authInfo || !firestoreFirebaseAuth?.currentUser || !firestoreFirebase) return;

    const noticeRef = collection(firestoreFirebase, 'notice');
    const queryGetNotice = query(noticeRef, orderBy('created_at', 'desc'), limit(1));

    return onSnapshot(queryGetNotice, (noticeSnapshot: any) => {
      noticeSnapshot.docs.forEach((doc: any) => {
        const noticeData = doc.data();
        const noticeCreatedAt = new Date(noticeData?.created_at?.seconds * 1000);

        if (
          noticeData?.description &&
          noticeData?.created_at &&
          noticeCreatedAt.getTime() >= timeComponentRender.current.getTime()
        ) {
          getListHistory();
        }
      });
    });
  }, [authInfo, firestoreFirebase, firestoreFirebaseAuth?.currentUser]);

  useEffect(() => {
    getMessages();

    return () => {
      getMessages();
    };
  }, [getMessages]);

  useEffect(() => {
    const unsubscribe = getNotice();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getNotice]);

  // refesh token
  useEffect(() => {
    if (!firestoreFirebaseAuth?.currentUser && authInfo?.user) {
      firestoreFirebaseAuth?.signOut();
      const emailUser = getEmailFirebase(authInfo.user?.email, authInfo.user?.user_role);
      const passwordUser = getPasswordFirebase(authInfo.user?.email, authInfo.user?.user_role);
      if (emailUser && passwordUser) {
        firestoreFirebaseAuth?.signInWithEmailAndPassword(emailUser, passwordUser);
      }
    }
  }, [firestoreFirebaseAuth, authInfo]);

  useEffect(() => {
    dispatch(
      storeSetAuth({
        ...authInfo,
        messagesNotRead,
      })
    );
    // eslint-disable-next-line
  }, [messagesNotRead, dispatch]);

  useEffect(() => {
    setMessagesNotReadShow(authInfo?.messagesNotRead);
    // eslint-disable-next-line
  }, [authInfo?.messagesNotRead]);

  useEffect(() => {
    getTotalMessageNotRead();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (listNoticeCurrent.length !== 0) {
        let temp: any[] = [...listNoticeCurrent];
        if (temp && temp.length > 0) {
          temp.push(temp.shift());
        }
        setListNoticeCurrent(temp || []);
      }
    }, 13000);
    return () => {
      clearInterval(intervalId);
    };
  }, [listNoticeCurrent]);

  return {
    handleClickChat,
    messagesNotReadShow,
    colorBgContainer,
    items,
    onHandleLogout,
    listNoticeCurrent,
  };
};

export default useHeaderOperator;
