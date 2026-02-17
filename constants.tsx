
import React from 'react';
import { Mail, HardDrive, Share2, Trash2, Inbox, Send, FileText, AlertCircle, Star, ShieldCheck } from 'lucide-react';
import { ViewMode, MailFolder, ManagedUser } from './types';

export const NAVIGATION_ITEMS = [
  { id: ViewMode.MAIL, label: 'Mail', icon: <Mail size={20} /> },
  { id: ViewMode.DRIVE, label: 'Drive', icon: <HardDrive size={20} /> },
  { id: ViewMode.SHARED, label: 'Shared', icon: <Share2 size={20} /> },
  { id: ViewMode.TRASH, label: 'Trash', icon: <Trash2 size={20} /> },
];

export const MAIL_FOLDERS = [
  { id: MailFolder.INBOX, label: 'Inbox', icon: <Inbox size={18} /> },
  { id: MailFolder.SENT, label: 'Sent', icon: <Send size={18} /> },
  { id: MailFolder.DRAFTS, label: 'Drafts', icon: <FileText size={18} /> },
  { id: MailFolder.SPAM, label: 'Spam', icon: <AlertCircle size={18} /> },
  { id: MailFolder.TRASH, label: 'Trash', icon: <Trash2 size={18} /> },
];

export const MOCK_EMAILS = [
  {
    id: '1',
    sender: 'Alex Rivera',
    recipient: 'me@deepmail.com',
    subject: 'Project Proposal: Q4 Scaling',
    content: 'Hi Team,\n\nI have attached the updated Q4 scaling proposal for your review. We need to finalize this by Friday.\n\nBest regards,\nAlex',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    folder: MailFolder.INBOX,
    attachments: [
      { id: 'att-1', name: 'Q4_Proposal.pdf', size: '2.4 MB', type: 'application/pdf', url: '#' }
    ],
    starred: true,
    threadId: 'thread-1'
  },
  {
    id: '2',
    sender: 'GitHub',
    recipient: 'me@deepmail.com',
    subject: '[Security Alert] Unusual login activity detected',
    content: 'A login to your account was detected from a new location: San Francisco, CA.\n\nIf this was you, you can safely ignore this email.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: true,
    folder: MailFolder.INBOX,
    attachments: [],
    starred: false,
    threadId: 'thread-2'
  },
  {
    id: '3',
    sender: 'DeepMail Support',
    recipient: 'me@deepmail.com',
    subject: 'Welcome to DeepMail!',
    content: 'Welcome! Explore your new unified workspace where your emails and files live together.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
    folder: MailFolder.INBOX,
    attachments: [],
    starred: false,
    threadId: 'thread-3'
  }
];

export const MOCK_FILES = [
  {
    id: 'f1',
    name: 'Business Strategy 2024',
    type: 'file',
    extension: 'pdf',
    size: '4.5 MB',
    owner: 'Me',
    modified: new Date(Date.now() - 1000 * 60 * 60 * 5),
    starred: true,
    shared: false,
    tags: ['Work', 'Important']
  },
  {
    id: 'f2',
    name: 'Vacation Photos',
    type: 'folder',
    size: '128 MB',
    owner: 'Me',
    modified: new Date(Date.now() - 1000 * 60 * 60 * 48),
    starred: false,
    shared: true,
    tags: ['Personal']
  },
  {
    id: 'f3',
    name: 'Logo_Final_v2',
    type: 'file',
    extension: 'png',
    size: '1.2 MB',
    owner: 'Me',
    modified: new Date(Date.now() - 1000 * 60 * 60 * 12),
    starred: false,
    shared: false,
    tags: ['Design']
  }
];

export const MOCK_MANAGED_USERS: ManagedUser[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    status: 'active',
    storageUsed: '12.4 GB',
    joinedDate: new Date('2023-01-15'),
    lastActive: new Date(),
    role: 'editor'
  },
  {
    id: 'u2',
    name: 'Sarah Connor',
    email: 's.connor@sky.net',
    status: 'active',
    storageUsed: '45.2 GB',
    joinedDate: new Date('2023-05-20'),
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
    role: 'manager'
  },
  {
    id: 'u3',
    name: 'Marcus Wright',
    email: 'm.wright@resistance.org',
    status: 'suspended',
    storageUsed: '2.1 GB',
    joinedDate: new Date('2024-02-10'),
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    role: 'viewer'
  },
  {
    id: 'u4',
    name: 'Administrator',
    email: 'admin@deepmail.com',
    status: 'active',
    storageUsed: '0.5 GB',
    joinedDate: new Date('2022-12-01'),
    lastActive: new Date(),
    role: 'admin'
  }
];
