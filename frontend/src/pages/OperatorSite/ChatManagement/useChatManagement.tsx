import { useCallback, useEffect, useRef, useState } from 'react';

import firebase from 'firebase/compat/app';
import textHelpers from 'helper/text';
import CONST_SIDE_BAR from '@components/layout/SideBar/constants';

import {
  getCompanyChatMessages,
  getListChatGroup,
  getTotalCompanyChatMessages,
  readAllCompanyChatMessages,
} from 'api/operator';
import {
  ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_CHAT,
  EStatusCompany,
  FILE_UPLOAD_MAX_COUNT,
  FILE_UPLOAD_MAX_SIZE_MB,
  FOLDER_UPLOAD,
} from 'constants/constants';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { handleLogout } from 'helper/storage';
import { IUploadedFile } from '@components/common/Modal/ModalUpload';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { USER_ROLE_COMPANY } from 'constants/User';
import { UploadChangeParam } from 'antd/es/upload';
import { message, UploadFile } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { apiSaveFile, apiUploadFile } from 'api';
import { MIN_NUMBER_MESSAGE_IN_PAGE } from 'constants/company';
import { IChatGroup, IMessage, IMessageData } from './interface';
import { CONST_CHAT_MANAGEMENT, LANGUAGE_COMPANY } from 'constants/language';
import { firestoreFirebaseApp, firestoreFirebaseAuthApp } from '@hooks/useFireBase/useFireBase';
import { addDoc, collection, query, orderBy, onSnapshot, where, writeBatch, getDocs } from 'firebase/firestore';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';
import { _getDateTimeByTimeZone } from 'helper/date';
import { storeSetAuth } from '@store/auth-reducer';
import { useDispatch } from 'react-redux';

const useChatManagement = () => {
  const firestoreFirebase = firestoreFirebaseApp;
  const firestoreFirebaseAuth = firestoreFirebaseAuthApp;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const { id } = useParams();

  const BREADS: IBread[] = [
    {
      name: CONST_SIDE_BAR.MENU.INQUIRY,
      path: '/chat',
    },
  ];

  const [content, setContent] = useState<string>('');
  const [listAllChatGroup, setListAllChatGroup] = useState<IChatGroup[]>([]);
  const [listGroupChat, setListGroupChat] = useState<IChatGroup[]>([]);
  const [listGroupChatMysql, setListGroupChatMysql] = useState<IChatGroup[]>([]);
  const [listMessage, setListMessage] = useState<IMessage[]>([]);
  const [listMessageMysql, setListMessageMysql] = useState<IMessage[]>([]);
  const [countMsgFB, setCountMsgFB] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [totalMesssage, setTotalMessage] = useState<number>(0);
  const [totalMessageMysql, setTotalMessageMysql] = useState<number>(0);
  const [activeChatGroup, setActiveChatGroup] = useState<IChatGroup>();
  const [isLoadingSendMessage, setIsLoadingSendMessage] = useState<boolean>(false);
  const [allMessageNotRead, setAllMessageNotRead] = useState<number>(authInfo?.messagesNotRead);

  const [isLoadingAllListChatGroup, setIsLoadingAllListChatGroup] = useState<boolean>(true);
  const [isLoadingListChatGroupMysql, setIsLoadingListChatGroupMysql] = useState<boolean>(true);
  const boxChatRef = useRef<null | HTMLDivElement>(null);

  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [isLoadingSaveFile, setIsLoadingSaveFile] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>('');

  const scrollToView = useCallback(() => boxChatRef.current?.scrollIntoView({ behavior: 'smooth' }), [boxChatRef]);

  const onSearch = useCallback(
    (searchText: string) => {
      const listSearch = [...listAllChatGroup].map((element: IChatGroup) => element.code + element.companyName);
      const dataSearch: IChatGroup[] = listAllChatGroup.filter(
        (_, index) =>
          listSearch?.[index]
            .replaceAll(/\s/g, '')
            .toLowerCase()
            .includes(searchText.toLowerCase()?.replaceAll(/\s/g, '')) ||
          textHelpers.searchTextInLongText({
            text: searchText,
            longText: listSearch[index],
          }) ||
          searchText === ''
      );
      setListGroupChat(dataSearch);
    },
    [listAllChatGroup]
  );

  // get list chat group
  const getAllChatGroups = useCallback(async () => {
    const response = await getListChatGroup();
    if (responseSuccess(response)) {
      setListGroupChatMysql(response.data);
      setIsLoadingListChatGroupMysql(false);
    }
  }, []);

  // load more message mysql
  const getChatMessagesMysql = useCallback(async () => {
    const params = {
      group_company_id: Number(id),
      page,
    };
    const response = await getCompanyChatMessages(params);
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
  }, [page, id]);

  // count total mesasge mysql and firebase
  const getTotalMessage = useCallback(async () => {
    let totalMsgMysql = 0;
    let totalMsgFirebase = 0;
    const response = await getTotalCompanyChatMessages(Number(id));
    if (responseSuccess(response)) {
      totalMsgMysql = response.data.count;
    }
    if (!firestoreFirebase) return;

    const messagesRef = collection(firestoreFirebase, 'messages');
    const queryGetListMessage = query(messagesRef, where('group_company_id', '==', Number(id)));
    const querySnapshot = await getDocs(queryGetListMessage);
    if (querySnapshot) {
      totalMsgFirebase = querySnapshot.size;
    }
    if (totalMsgFirebase < MIN_NUMBER_MESSAGE_IN_PAGE) {
      setPage(1);
    }
    setTotalMessageMysql(totalMsgMysql);
    setTotalMessage(totalMsgMysql + totalMsgFirebase);
  }, [id, firestoreFirebase]);

  // renew list chat group
  const extractChatGroups = useCallback(
    (messages: IMessageData[], authInfo: any) => {
      const listChatGroups: IChatGroup[] = [];
      const listTemp: IChatGroup[] = [...listGroupChatMysql];
      messages.forEach((message: IMessageData) => {
        const chatGroup = listChatGroups.find((ele: IChatGroup) => ele.id === message.group_company_id);
        const groupTemp = listTemp.find((ele: IChatGroup) => ele?.id === message.group_company_id);
        const messagesNotReaded = groupTemp ? groupTemp.messages_not_readed : 0;

        if (!chatGroup) {
          listChatGroups.push({
            id: message.group_company_id,
            code: message.group_company_code,
            companyName: message.group_company_name,
            ownerName: message.user_name,
            status: groupTemp?.status || EStatusCompany.STATUS_USING,
            messages_not_readed: message.reads?.includes(`${authInfo.user.user_role}.${authInfo.user.id}`)
              ? messagesNotReaded
              : messagesNotReaded + 1,
          });
          if (groupTemp) {
            listTemp.splice(listTemp.indexOf(groupTemp), 1);
          }
        } else {
          if (message.user_role_sent === USER_ROLE_COMPANY) {
            chatGroup.ownerName = message.user_name;
          }
          if (!message.reads?.includes(`${authInfo.user.user_role}.${authInfo.user.id}`)) {
            chatGroup.messages_not_readed++;
          }
        }
      });
      return [...listChatGroups, ...listTemp];
    },
    [listGroupChatMysql]
  );
  // listen new message
  const getChatGroups = useCallback(() => {
    if (!firestoreFirebase) return;
    const queryGetChatGroups = query(collection(firestoreFirebase, 'messages'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(queryGetChatGroups, (querySnapshot: any) => {
      const messages = querySnapshot.docs.map((doc: any) => doc.data()) as IMessageData[];
      const listChatGroups = extractChatGroups(messages, authInfo);
      const activeGroup = listChatGroups.find((ele: IChatGroup) => ele?.id === Number(id));
      setListAllChatGroup(listChatGroups);
      setActiveChatGroup(activeGroup);
      if (!isLoadingListChatGroupMysql) {
        setIsLoadingAllListChatGroup(false);
      }
    });

    return unsubscribe;
  }, [id, authInfo, firestoreFirebase, extractChatGroups, isLoadingListChatGroupMysql]);

  const hanldeChangeActiveChatGroup = useCallback(
    async (group: IChatGroup) => {
      setListMessageMysql([]);
      setPage(0);
      setActiveChatGroup(group);
      navigate(`/chat/${group.id}`);
      if (!group) return;
      const listTemp = [...listGroupChat];
      const groupTemp = listTemp.find((ele: IChatGroup) => ele?.id === group.id);
      if (groupTemp) {
        listTemp[listTemp.indexOf(groupTemp)].messages_not_readed = 0;
      }
      setListGroupChat(listTemp);
      await readAllCompanyChatMessages(group.id);
      getAllChatGroups();
    },
    [listGroupChat, navigate, getAllChatGroups]
  );

  // send message
  const sendMessage = useCallback(
    async (contentSend?: string) => {
      if (!firestoreFirebase || !firestoreFirebaseAuth) return;

      const contentMain = contentSend || content;
      if (!contentMain.trim() || isLoadingSendMessage) {
        return;
      }

      if (!activeChatGroup || !authInfo) {
        return;
      }
      // refresh token when sendmessage
      if (firestoreFirebaseAuth.currentUser) {
        setIsLoadingSendMessage(true);
        firestoreFirebaseAuth.currentUser
          .getIdTokenResult(true)
          // when token refreshed
          .then(async () => {
            const { user } = authInfo;
            const { id: userId, user_role: userRole, full_name: userName } = user;
            const { id: groupId, code: groupCode, companyName } = activeChatGroup;
            // add message to firestore
            try {
              await addDoc(collection(firestoreFirebase, 'messages'), {
                user_id_sent: userId,
                user_role_sent: userRole,
                user_name: userName,
                group_company_id: groupId,
                group_company_code: groupCode,
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
    [activeChatGroup, authInfo, content, firestoreFirebase, firestoreFirebaseAuth, isLoadingSendMessage, scrollToView]
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
      setUploadedFiles((prev) => [...prev, uploadedFile].splice(0, FILE_UPLOAD_MAX_COUNT));
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

  useEffect(() => {
    getAllChatGroups();
    // eslint-disable-next-line
  }, []);

  // for listen new message to renew list chat groups
  useEffect(() => {
    const unsubscribe = getChatGroups();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getChatGroups, listGroupChatMysql]);

  const renewListMessage = useCallback(
    (listMessages: IMessage[]) => {
      setListMessage([...listMessages, ...listMessageMysql]);
      setTotalMessage(totalMessageMysql + listMessages.length);
    },
    [listMessageMysql, totalMessageMysql]
  );

  // listen new message of box chat
  const getMessages = useCallback(() => {
    if (!activeChatGroup || !id || !authInfo || !firestoreFirebaseAuth?.currentUser || !firestoreFirebase) return;

    const messagesRef = collection(firestoreFirebase, 'messages');
    const queryGetListMessage = query(
      messagesRef,
      where('group_company_id', '==', Number(id)),
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
  }, [authInfo, firestoreFirebase, id, activeChatGroup, renewListMessage, firestoreFirebaseAuth?.currentUser]);

  useEffect(() => {
    const unsubscribe = getMessages();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getMessages]);

  useEffect(() => {
    if (listGroupChatMysql.length) {
      const msgNotRead =
        listAllChatGroup.reduce((sum, groupChat) => sum + Number(groupChat.messages_not_readed), 0) || 0;
      setAllMessageNotRead(msgNotRead);
      onSearch(searchInput);
    }
  }, [listAllChatGroup, listGroupChatMysql, searchInput, onSearch]);

  useEffect(() => {
    dispatch(
      storeSetAuth({
        ...authInfo,
        messagesNotRead: allMessageNotRead,
      })
    );
    // eslint-disable-next-line
  }, [allMessageNotRead]);

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
    if (id) {
      getTotalMessage();
    }
    // eslint-disable-next-line
  }, [id]);

  return {
    firestoreFirebase,
    sendMessage,
    listMessage,
    setListMessage,
    content,
    setContent,
    BREADS,
    listGroupChat,
    isLoadingAllListChatGroup,
    activeChatGroup,
    hanldeChangeActiveChatGroup,
    onSearch,
    boxChatRef,
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
    searchInput,
    setSearchInput,
  };
};

export default useChatManagement;
