export interface Message {
  _id: string;
  chatId?: string;
  senderId: string;
  text?: string;
  fileUrl?: string;
  fileType?: string | null;
  read?: boolean;
  readAt?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
  tempId?: string;
}
