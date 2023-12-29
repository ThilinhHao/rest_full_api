import { useEffect, useState, useCallback } from 'react';

import { theme } from 'antd';

import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { USER_ROLE_AGENCY } from 'constants/User';
import { firestoreFirebaseApp } from '@hooks/useFireBase/useFireBase';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';

const useHeaderAgency = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const location = useLocation();

  const firestoreFirebase = firestoreFirebaseApp;
  const [isHasNewNotify, setIsHasNewNotify] = useState<boolean>(false);

  const toAgencyProfile = () => {
    navigate('/profile');
  };

  // const onReadAllNotice = async () => {
  //   try {
  //     await apiReadAllNotifications();
  //   } catch (error) {}
  // };

  const handleClickNotice = async () => {
    // setIsHasNewNotify(false);
    if (location.pathname === '/notice') {
      window.location.reload();
    } else {
      navigate('/notice');
    }
  };

  useEffect(() => {
    if (location.pathname === '/notice') {
      // setIsHasNewNotify(false);
      // onReadAllNotice();
    }
  }, [location.pathname]);

  const getNotifies = useCallback(() => {
    if (!authInfo || !firestoreFirebase) return;
    const notifyRef = collection(firestoreFirebase, 'notifications');
    const queryNotify = query(
      notifyRef,
      where('user_role', '==', USER_ROLE_AGENCY),
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

  return {
    colorBgContainer,
    toAgencyProfile,
    handleClickNotice,
    isHasNewNotify,
  };
};

export default useHeaderAgency;
