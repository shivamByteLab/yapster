'use client';

import React from 'react';
import Image from 'next/image';
import { Bell, ChevronLeft, ChevronRight, ContactRound, Database, HelpCircle, KeyRound, Lock, MessageCircle } from 'lucide-react';
import { useHide } from '@/context/useHideProvider';
import { useAuthContext } from '@/context/useAuthContext';

const Settings: React.FC = () => {
  const settingsOptions = [
    { id: 1, label: 'Privacy', icon: <KeyRound/> },
    { id: 2, label: 'Security', icon: <Lock/> },
    { id: 3, label: 'Chats', icon: <MessageCircle/> },
    { id: 4, label: 'Notifications', icon: <Bell/> },
    { id: 5, label: 'Storage and Data', icon: <Database/> },
    { id: 6, label: 'Help', icon: <HelpCircle/> },
    { id: 7, label: 'Invite a Friend', icon: <ContactRound />},
  ];
  const {setShowSetting} = useHide()
 const {authUser} = useAuthContext()
  return (
    <div className="bg-inherit min-h-screen w-full overflow-hidden">
      {/* Header */}
      <div className="bg-[#075E54] text-white p-4 flex items-center gap-4">
        <ChevronLeft onClick={()=>setShowSetting(false)} className="cursor-pointer" />
        <span className="text-lg font-medium">Settings</span>
      </div>

      {/* Profile Section */}
      <div className="w-full py-4 px-6 flex items-center gap-4 shadow-sm">
        <div className="rounded-full w-14 h-14 ">
          <Image
            src={authUser.user.avatar}
            alt="Profile Picture"
            width={36}
            height={30}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-400">John Doe</h2>
          <p className="text-sm text-gray-500 truncate">Hey there! I am using WhatsApp.</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="mt-6">
        <ul className=" divide-y divide-gray-200 shadow-sm">
          {settingsOptions.map((option) => (
            <li
              key={option.id}
              className="flex items-center justify-between py-4 px-6 hover:bg-gray-500 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 relative">
                  <div className="object-contain rounded-full">{option.icon&&option.icon}</div>
                </div>
                <span className=" font-medium text-sm">{option.label}</span>
              </div>
              <ChevronRight className="text-gray-400" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
