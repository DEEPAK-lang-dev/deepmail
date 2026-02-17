
export enum ViewMode {
  MAIL = 'MAIL',
  DRIVE = 'DRIVE',
  SHARED = 'SHARED',
  TRASH = 'TRASH',
  ADMIN = 'ADMIN'
}

export enum MailFolder {
  INBOX = 'INBOX',
  SENT = 'SENT',
  DRAFTS = 'DRAFTS',
  SPAM = 'SPAM',
  TRASH = 'TRASH'
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

export interface Email {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  folder: MailFolder;
  attachments: Attachment[];
  starred: boolean;
  threadId: string;
}

export interface DriveFile {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  size: string;
  owner: string;
  modified: Date;
  starred: boolean;
  shared: boolean;
  tags: string[];
  parentId?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type UserRole = 'viewer' | 'editor' | 'manager' | 'admin';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended';
  storageUsed: string;
  joinedDate: Date;
  lastActive: Date;
  role: UserRole;
}
