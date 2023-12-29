import { useEffect, useState, useCallback } from 'react';

import { theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { USER_ROLE_COMPANY } from 'constants/User';
import { getEmailFirebase, getPasswordFirebase } from 'helper/firebase';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import { firestoreFirebaseApp, firestoreFirebaseAuthApp } from '@hooks/useFireBase/useFireBase';
import { apiListCompanyB2BPaired, getCompanyCountChatMessagesNotRead } from 'api/company';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { storeSetCompanyIdLeague } from '@store/auth-reducer';
import { storeSetListCompanyB2BPaired } from '@store/company-reducer';

const useHeaderCompany = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const firestoreFirebase = firestoreFirebaseApp;
  const firestoreFirebaseAuth = firestoreFirebaseAuthApp;
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const listCompanyB2BPaired = useAppSelector((state) => state.company.listCompanyB2BPaired);

  const [messagesNotRead, setMessagesNotRead] = useState<number>(0);
  const [messagesMysqlNotRead, setMessagesMysqlNotRead] = useState<number>(0);
  const [isHasNewNotify, setIsHasNewNotify] = useState<boolean>(false);

  const getListCompanyB2BPaired = async () => {
    const response = await apiListCompanyB2BPaired();
    if (responseSuccess(response)) {
      dispatch(storeSetListCompanyB2BPaired(response.data));
    }
  };

  const handleClickChat = () => {
    setMessagesMysqlNotRead(0);
    setMessagesNotRead(0);
    navigate('/chat');
  };

  // const onReadAllNotice = async () => {
  //   try {
  //     await apiReadAllNotifications();
  //   } catch (error) {}
  // };

  const handleClickNotice = () => {
    if (location.pathname === '/setting-page/listNotice') {
      window.location.reload();
    } else {
      navigate('/setting-page/listNotice');
    }
  };

  useEffect(() => {
    if (location.pathname === '/setting-page/listNotice') {
      // setIsHasNewNotify(false);
      // onReadAllNotice();
    }
  }, [location.pathname]);

  // count total mesasge mysql not read
  const getTotalMessageNotRead = async () => {
    const response = await getCompanyCountChatMessagesNotRead();
    if (responseSuccess(response)) {
      setMessagesMysqlNotRead(response.data.count);
    }
  };

  // get messages not read
  const getMessages = useCallback(() => {
    if (!authInfo || !firestoreFirebaseAuth?.currentUser || !firestoreFirebase) return;

    const messagesRef = collection(firestoreFirebase, 'messages');
    const queryGetListMessage = query(messagesRef, where('group_company_id', '==', Number(authInfo?.company?.id)));
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
  }, [authInfo, firestoreFirebase, firestoreFirebaseAuth?.currentUser, messagesMysqlNotRead]);

  useEffect(() => {
    getMessages();

    return () => {
      getMessages();
    };
  }, [getMessages]);

  const getNotifies = useCallback(() => {
    if (!authInfo || !firestoreFirebase) return;

    const notifyRef = collection(firestoreFirebase, 'notifications');
    const queryNotify = query(
      notifyRef,
      where('user_role', '==', USER_ROLE_COMPANY),
      where('user_id', '==', Number(authInfo?.user?.id)),
      limit(1)
    );
    onSnapshot(queryNotify, (messagesSnapshot: any) => {
      if (messagesSnapshot.docs.length > 0) {
        const notify = messagesSnapshot.docs[0].data();
        if (notify.count > 0) {
          setIsHasNewNotify(true);
        } else {
          setIsHasNewNotify(false);
        }
      } else {
        setIsHasNewNotify(false);
      }
    });
  }, [authInfo, firestoreFirebase]);

  // get new noti
  useEffect(() => {
    getNotifies();

    return () => {
      getNotifies();
    };
  }, [getNotifies]);

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
    getTotalMessageNotRead();
    getListCompanyB2BPaired();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeCompanyLeague = (e: number) => {
    setTimeout(() => {
      dispatch(storeSetCompanyIdLeague(Number(e)));
      if (location.pathname === '/') {
        window.location.reload();
      } else {
        navigate('/');
      }
    }, 400);
  };

  return {
    handleClickChat,
    navigate,
    authInfo,
    messagesNotRead,
    colorBgContainer,
    isHasNewNotify,
    handleClickNotice,
    listCompanyB2BPaired,
    dispatch,
    companyIdLeague,
    changeCompanyLeague,
  };
};

export default useHeaderCompany;
