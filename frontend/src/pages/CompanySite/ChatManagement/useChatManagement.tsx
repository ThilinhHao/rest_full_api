import { useCallback, useEffect, useRef, useState } from 'react';

import firebase from 'firebase/compat/app';
import CONST_SIDE_BAR from '@components/layout/SideBar/constants';

import {
  ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_CHAT,
  FILE_UPLOAD_MAX_COUNT,
  FILE_UPLOAD_MAX_SIZE_MB,
  FOLDER_UPLOAD,
} from 'constants/constants';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { IMessage } from '@pages/OperatorSite/ChatManagement/interface';
import { handleLogout } from 'helper/storage';
import { IUploadedFile } from '@components/common/Modal/ModalUpload';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { UploadChangeParam } from 'antd/es/upload';
import { message, UploadFile } from 'antd';
import { MIN_NUMBER_MESSAGE_IN_PAGE } from 'constants/company';
import { apiSaveFile, apiUploadFile } from 'api';
import { CONST_CHAT_MANAGEMENT, LANGUAGE_COMPANY } from 'constants/language';
import { firestoreFirebaseApp, firestoreFirebaseAuthApp } from '@hooks/useFireBase/useFireBase';
import { addDoc, collection, query, orderBy, where, writeBatch, getDocs, onSnapshot } from 'firebase/firestore';
import { getCompanyChatMessages, getTotalCompanyChatMessages, readAllCompanyChatMessages } from 'api/company';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';
import { _getDateTimeByTimeZone } from 'helper/date';
import { useNavigate } from 'react-router-dom';
import { USER_TYPE_IP_SUPPORT, USER_TYPE_OWNER } from 'constants/User';

const useChatManagement = () => {
  const firestoreFirebase = firestoreFirebaseApp;
  const firestoreFirebaseAuth = firestoreFirebaseAuthApp;

  const navigate = useNavigate();
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const [content, setContent] = useState<string>('');
  const [listMessage, setListMessage] = useState<IMessage[]>([]);
  const [listMessageMysql, setListMessageMysql] = useState<IMessage[]>([]);
  const [countMsgFB, setCountMsgFB] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [totalMesssage, setTotalMessage] = useState<number>(0);
  const [totalMessageMysql, setTotalMessageMysql] = useState<number>(0);
  const [isLoadingSendMessage, setIsLoadingSendMessage] = useState<boolean>(false);
  const boxChatRef = useRef<null | HTMLDivElement>(null);

  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [isLoadingSaveFile, setIsLoadingSaveFile] = useState<boolean>(false);

  const BREADS: IBread[] = [
    {
      name: CONST_SIDE_BAR.MENU.INQUIRY,
      path: '/chat',
    },
  ];

  const scrollToView = useCallback(() => boxChatRef.current?.scrollIntoView({ behavior: 'smooth' }), [boxChatRef]);

  // load more message mysql
  const getChatMessagesMysql = useCallback(async () => {
    const response = await getCompanyChatMessages(page);
    if (responseSuccess(response)) {
      const listMessages: IMessage[] = [];
      response.data.data.forEach((messageData: any) => {
        listMessages.push({
          id: messageData.id,
          user_id_sent: messageData.user_id_sent,
          user_role_sent: messageData.user_role_sent,
          user_name: messageData.user_name,
          group_company_id: messageData.group_company_id,
          group_company_code: messageData.group_company_code,
          group_company_name: messageData.group_company_name,
          content: messageData.content,
          created_at: messageData.created_at,
          reads: messageData.reads,
        });
      });

      setListMessage((prev) => [...prev, ...listMessages]);
      setListMessageMysql((prev) => [...prev, ...listMessages]);
    }
  }, [page]);

  // count total mesasge mysql and firebase
  const getTotalMessage = async () => {
    let totalMsgMysql = 0;
    let totalMsgFirebase = 0;
    const response = await getTotalCompanyChatMessages();
    if (responseSuccess(response)) {
      totalMsgMysql = response.data.count;
    }
    if (!firestoreFirebase) return;

    const messagesRef = collection(firestoreFirebase, 'messages');
    const queryGetListMessage = query(messagesRef, where('group_company_id', '==', Number(authInfo?.company?.id)));
    const querySnapshot = await getDocs(queryGetListMessage);
    if (querySnapshot) {
      totalMsgFirebase = querySnapshot.size;
    }
    if (totalMsgFirebase < MIN_NUMBER_MESSAGE_IN_PAGE) {
      setPage(1);
    }
    setTotalMessageMysql(totalMsgMysql);
    setTotalMessage(totalMsgMysql + totalMsgFirebase);
  };

  // read all message mysql
  const readAllMessageMysql = async () => {
    await readAllCompanyChatMessages();
  };

  // send message
  const sendMessage = useCallback(
    async (contentSend?: string) => {
      const contentMain = contentSend || content;
      if (!contentMain.trim() || isLoadingSendMessage) {
        return;
      }
      if (!authInfo || !firestoreFirebase) return;
      // refresh token when sendmessage
      if (firestoreFirebaseAuth?.currentUser) {
        setIsLoadingSendMessage(true);
        firestoreFirebaseAuth?.currentUser
          .getIdTokenResult(true)
          // when token refreshed
          .then(async () => {
            const { user, company } = authInfo;
            const { id: userId, user_role: userRole, full_name: userName } = user || {};
            const { id: companyId, code: companyCode, name: companyName } = company || {};
            // add message to firestore
            try {
              await addDoc(collection(firestoreFirebase, 'messages'), {
                user_id_sent: userId,
                user_role_sent: userRole,
                user_name: userName,
                group_company_id: companyId,
                group_company_code: companyCode,
                group_company_name: companyName,
                content: contentMain,
                created_at: _getDateTimeByTimeZone(),
                reads: [`${userRole}.${userId}`],
              });
            } catch {
              message.error(CONST_CHAT_MANAGEMENT.ADD_MESSAGE_ERROR);
            } finally {
              setContent('');
              setIsLoadingSendMessage(false);
              scrollToView();
            }
          })
          // token can't refresh
          .catch(() => {
            handleLogout();
          });
      } else {
        handleLogout();
      }
    },
    [authInfo, content, firestoreFirebase, firestoreFirebaseAuth, isLoadingSendMessage, scrollToView]
  );

  const uploadFile = useCallback(async (info: UploadChangeParam<UploadFile>) => {
    setIsLoadingUpload(true);
    const file: any = info.file;
    if (!ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_CHAT.includes(file.type)) {
      message.error(CONST_CHAT_MANAGEMENT.ERROR_FILE_TYPE);
      setIsLoadingUpload(false);
      return false;
    }
    if (file.size / 1024 / 1024 > FILE_UPLOAD_MAX_SIZE_MB) {
      message.error(LANGUAGE_COMPANY.createStaff.uploadFile10MB);
      setIsLoadingUpload(false);
      return false;
    }
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('folder', FOLDER_UPLOAD.CHAT_MESSAGE);
    const response = await apiUploadFile(formData);
    if (responseSuccess(response)) {
      const uploadedFile: IUploadedFile = {
        name: file.name,
        url: response.data.url,
      };
      setUploadedFiles((prev) => [...prev, uploadedFile].slice(0, FILE_UPLOAD_MAX_COUNT));
    } else {
      if (response?.response?.data?.message?.file === VALIDATE_ERROR_CODE.FILE_TYPE_INVALID) {
        message.error(CONST_CHAT_MANAGEMENT.ERROR_FILE_TYPE);
      }
    }
    setIsLoadingUpload(false);
  }, []);

  const deleteFile = useCallback(
    (file: IUploadedFile) => {
      const files = [...uploadedFiles];
      files.splice(files.indexOf(file), 1);

      setUploadedFiles(files);
    },
    [uploadedFiles]
  );

  const cancelUpload = useCallback(() => {
    setUploadedFiles([]);
    setIsOpenModal(false);
  }, []);

  const sendUploadFiles = useCallback(async () => {
    setIsLoadingSaveFile(true);
    let messageSend: string = '';
    const urls: string[] = [];
    uploadedFiles.forEach((file: IUploadedFile) => {
      urls.push(file.url);
    });
    const response = await apiSaveFile(urls);
    if (responseSuccess(response)) {
      const newUrls = response.data;
      uploadedFiles.forEach((file: IUploadedFile, index: number) => {
        if (newUrls[index] !== undefined) {
          messageSend += file.name + '\t' + newUrls[index] + '\n';
        }
        urls.push(file.url);
      });
    }

    sendMessage(messageSend);
    setIsLoadingSaveFile(false);
    setIsOpenModal(false);
    setUploadedFiles([]);
  }, [uploadedFiles, sendMessage]);

  const renewListMessage = useCallback(
    (listMessages: IMessage[]) => {
      setListMessage([...listMessages, ...listMessageMysql]);
      setTotalMessage(totalMessageMysql + listMessages.length);
    },
    [listMessageMysql, totalMessageMysql]
  );

  // listen new message of box chat
  const getMessages = useCallback(() => {
    if (!authInfo || !firestoreFirebaseAuth?.currentUser || !firestoreFirebase) return;

    const messagesRef = collection(firestoreFirebase, 'messages');
    const queryGetListMessage = query(
      messagesRef,
      where('group_company_id', '==', Number(authInfo?.company?.id)),
      orderBy('created_at', 'desc')
    );

    const unsubscribe = onSnapshot(queryGetListMessage, (messagesSnapshot: any) => {
      const listMessages: IMessage[] = [];
      const batch = writeBatch(firestoreFirebase);

      messagesSnapshot.docs.forEach((doc: any) => {
        const messageData = doc.data();

        if (!messageData.reads?.includes(`${authInfo.user.user_role}.${authInfo.user.id}`)) {
          batch.update(doc.ref, {
            ...messageData,
            reads: firebase.firestore.FieldValue.arrayUnion(`${authInfo?.user.user_role}.${authInfo?.user.id}`),
          });
        }

        listMessages.push({
          id: doc.id,
          user_id_sent: messageData.user_id_sent,
          user_role_sent: messageData.user_role_sent,
          user_name: messageData.user_name,
          group_company_id: messageData.group_company_id,
          group_company_code: messageData.group_company_code,
          group_company_name: messageData.group_company_name,
          content: messageData.content,
          created_at: messageData.created_at,
          reads: messageData.reads,
        });
      });

      batch
        .commit()
        .then(() => {
          renewListMessage(listMessages);
          setCountMsgFB(listMessages.length);
        })
        .catch(() => {
          message.error(CONST_CHAT_MANAGEMENT.GET_MESSAGE_ERROR);
        });
    });

    return unsubscribe;
  }, [authInfo, firestoreFirebase, renewListMessage, firestoreFirebaseAuth?.currentUser]);

  useEffect(() => {
    const unsubscribe = getMessages();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getMessages]);

  useEffect(() => {
    scrollToView();
  }, [countMsgFB, scrollToView]);

  useEffect(() => {
    if (page) {
      getChatMessagesMysql();
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (authInfo?.user?.type !== USER_TYPE_OWNER &&  authInfo?.user?.type !== USER_TYPE_IP_SUPPORT) {
      navigate('/403');
    }
  }, [authInfo, navigate]);

  useEffect(() => {
    getTotalMessage();
    readAllMessageMysql();
    // eslint-disable-next-line
  }, []);

  return {
    navigate,
    authInfo,
    firestoreFirebase,
    setContent,
    listMessage,
    setListMessage,
    content,
    sendMessage,
    BREADS,
    boxChatRef,
    scrollToView,
    isLoadingSendMessage,
    totalMesssage,
    setPage,
    isOpenModal,
    setIsOpenModal,
    uploadFile,
    isLoadingUpload,
    uploadedFiles,
    deleteFile,
    cancelUpload,
    sendUploadFiles,
    isLoadingSaveFile,
  };
};

export default useChatManagement;
