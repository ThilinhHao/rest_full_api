export interface IMessage {
  id?: string;
  user_id_sent: number;
  user_role_sent: number;
  user_name: string;
  group_company_id: number;
  group_company_code: string;
  group_company_name: string;
  content: string;
  created_at: any;
  reads: string[];
}

export interface IChatGroup {
  id: number;
  code: string;
  companyName: string;
  ownerName: string;
  status: number;
  messages_not_readed: number;
  createdAt?: string | null;
}

export type IMessageData = {
  id?: string;
  user_id_sent: number;
  user_role_sent: number;
  user_name: string;
  group_company_id: number;
  group_company_code: string;
  group_company_name: string;
  content: string;
  created_at: any;
  reads: string[];
};
