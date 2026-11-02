import React, { useState } from 'react';
import { 
  Play, ThumbsUp, ThumbsDown, Share2, Bell, Search, Menu, User, 
  Video, Shield, AlertTriangle, UserX, Clock, Settings, MessageSquare, 
  Flame, Gamepad2, Music, Radio, CheckCircle, TrendingUp, Users, Eye, 
  Trash2, Globe, Heart, ShieldAlert, Sparkles, BarChart2, PlusCircle
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [channelTab, setChannelTab] = useState('home');
  const [language, setLanguage] = useState('he');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'הסרטון שלך הועלה בהצלחה!', time: 'לפני 5 דקות', unread: true },
    { id: 2, text: 'משתמש חדש נרשם לערוץ שלך', time: 'לפני שעה', unread: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [toastMessage, setToastMessage] = useState('');

  // Admin Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // App Data
  const [videos, setVideos] = useState([
    {
      id: '1',
      title: 'לייב גיימינג מטורף! טורניר פורטנייט הגדול 🏆',
      channelName: 'ProGamer IL',
      subscribers: '125K',
      isSubscribed: false,
      views: '12,450',
      time: 'משודר כעת',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
      description: 'הצטרפו אליי בלייב לטורניר הענק! שחקו איתי בצ׳אט.'
    },
    {
      id: '2',
      title: 'איך לבנות אפליקציה ב-React ב-10 דקות - מדריך מלא 🚀',
      channelName: 'CodeMaster',
      subscribers: '45K',
      isSubscribed: false,
      views: '45,210',
      time: 'לפני יומיים',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80',
      description: 'בסרטון הזה נלמד לבנות אפליקציית React מלאה מאפס.'
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'אלון', text: 'היי לכולם!', role: 'viewer', color: '#e5e7eb' },
    { id: 2, user: 'דני המודרטור', text: 'ברוכים הבאים ללייב של VidStar!', role: 'mod', color: '#3b82f6' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addNotification = (text) => {
    const newNotif = { id: Date.now(), text, time: 'עכשיו', unread: true };
    setNotifications(prev => [newNotif, ...prev]);
    setUnreadCount(prev => prev + 1);
    triggerToast(text);
  };

  const handleSubscribe = (video) => {
    setVideos(videos.map(v => {
      if (v.id === video.id) {
        const nextState = !v.isSubscribed;
        if (nextState) {
          addNotification(`נרשמת בהצלחה לערוץ ${v.channelName}!`);
        }
        return { ...v, isSubscribed: nextState };
      }
      return v;
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, {
      id: Date.now(),
      user: 'אני',
      text: newMessage,
      role: 'user',
      color: '#10b981'
    }]);
    setNewMessage('');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === '1234') {
      setIsAdminLoggedIn(true);
      triggerToast('התחברת בהצלחה ל-Admin Studio!');
    } else {
      alert('שם משתמש או סיסמה שגויים! (השתמש ב-admin / 1234)');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans dir-rtl" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 left-5 z-50 bg-red-600 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-bounce">
          <Bell className="w-5 h-5" />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-neutral-800 rounded-full text-neutral-300">
            <Menu className="w-5 h-5" />
          </button>
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-1.5 cursor-pointer select-none"
          >
            <div className="bg-red-600 p-1.5 rounded-xl text-white font-black flex items-center justify-center">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white flex items-center gap-1">
              VidStar <span className="text-xs bg-red-600/20 text-red-500 font-bold px-1.5 py-0.5 rounded">IL</span>
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <div className="flex w-full items-center bg-neutral-800 border border-neutral-700 rounded-full overflow-hidden focus-within:border-red-500">
            <input 
              type="text" 
              placeholder="חיפוש ב-VidStar..." 
              className="w-full bg-transparent px-4 py-2 text-sm text-white focus:outline-none placeholder-neutral-400"
            />
            <button className="bg-neutral-700 hover:bg-neutral-600 px-5 py-2 text-neutral-300 border-r border-neutral-700">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Create Button */}
          <button 
            onClick={() => addNotification('הסרטון שלך הועלה בהצלחה וזמין לצפייה!')}
            className="hidden sm:flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-full text-sm font-semibold text-neutral-200"
          >
            <PlusCircle className="w-4 h-4 text-red-500" />
            <span>צור</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setUnreadCount(0);
              }}
              className="p-2 hover:bg-neutral-800 rounded-full text-neutral-300 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-neutral-800 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 border-b border-neutral-700 flex justify-between items-center">
                  <span className="font-bold text-sm">התראות</span>
                  <button 
                    onClick={() => setNotifications([])} 
                    className="text-xs text-red-400 hover:underline"
                  >
                    נקה הכל
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-neutral-700">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-neutral-400">אין התראות חדשות</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-3 hover:bg-neutral-700/50 transition text-xs">
                        <p className="text-neutral-200 font-medium">{n.text}</p>
                        <span className="text-[10px] text-neutral-400 mt-1 block">{n.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User / Studio Nav */}
          <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-full border border-neutral-700">
            <button 
              onClick={() => setCurrentView('creator-studio')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${currentView === 'creator-studio' ? 'bg-red-600 text-white' : 'text-neutral-300 hover:text-white'}`}
            >
              Studio
            </button>
            <button 
              onClick={() => setCurrentView('admin-gate')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${currentView === 'admin-gate' || currentView === 'admin-panel' ? 'bg-neutral-700 text-yellow-400' : 'text-neutral-400 hover:text-white'}`}
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-neutral-900 border-l border-neutral-800 p-3 min-h-[calc(100vh-57px)] gap-1 text-sm font-medium">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`flex items-center gap-4 px-3 py-2.5 rounded-xl transition ${currentView === 'home' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'}`}
          >
            <Play className="w-5 h-5 text-red-500" />
            <span>דף הבית</span>
          </button>
          <button 
            onClick={() => setCurrentView('shorts')} 
            className={`flex items-center gap-4 px-3 py-2.5 rounded-xl transition ${currentView === 'shorts' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'}`}
          >
            <Flame className="w-5 h-5 text-orange-500" />
            <span>VidStar Shorts</span>
          </button>
          <button 
            onClick={() => setCurrentView('creator-studio')} 
            className={`flex items-center gap-4 px-3 py-2.5 rounded-xl transition ${currentView === 'creator-studio' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'}`}
          >
            <BarChart2 className="w-5 h-5 text-blue-500" />
            <span>VidStar Studio</span>
          </button>
          <hr className="border-neutral-800 my-2" />
          <div className="px-3 text-xs font-bold text-neutral-500 mb-1">קטגוריות</div>
          <button className="flex items-center gap-4 px-3 py-2 text-neutral-400 hover:bg-neutral-800/50 hover:text-white rounded-xl">
            <Gamepad2 className="w-4 h-4" /> גיימינג
          </button>
          <button className="flex items-center gap-4 px-3 py-2 text-neutral-400 hover:bg-neutral-800/50 hover:text-white rounded-xl">
            <Music className="w-4 h-4" /> מוזיקה
          </button>
          <button className="flex items-center gap-4 px-3 py-2 text-neutral-400 hover:bg-neutral-800/50 hover:text-white rounded-xl">
            <Radio className="w-4 h-4 text-red-500" /> שידור חי
          </button>
        </aside>

        {/* Dynamic View Display */}
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
          {/* HOME VIEW */}
          {currentView === 'home' && (
            <div>
              <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" /> מומלצים עבורך
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(vid => (
                  <div 
                    key={vid.id} 
                    className="bg-neutral-800/40 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition cursor-pointer group"
                    onClick={() => {
                      setSelectedVideo(vid);
                      setCurrentView('watch');
                    }}
                  >
                    <div className="relative aspect-video bg-neutral-900">
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      {vid.isLive && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Radio className="w-3 h-3 animate-pulse" /> LIVE
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex gap-3">
                      <img src={vid.avatar} alt={vid.channelName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h3 className="font-bold text-sm text-white line-clamp-2 group-hover:text-red-400 transition">{vid.title}</h3>
                        <p className="text-xs text-neutral-400 mt-1">{vid.channelName}</p>
                        <p className="text-[11px] text-neutral-500">{vid.views} צפיות • {vid.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WATCH / LIVE VIEW */}
          {currentView === 'watch' && selectedVideo && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl">
                  <img src={selectedVideo.thumbnail} alt={selectedVideo.title} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>
                </div>

                <h1 className="text-xl font-bold mt-4">{selectedVideo.title}</h1>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <img src={selectedVideo.avatar} alt={selectedVideo.channelName} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-sm">{selectedVideo.channelName}</h4>
                      <p className="text-xs text-neutral-400">{selectedVideo.subscribers} רשומים</p>
                    </div>
                    <button 
                      onClick={() => handleSubscribe(selectedVideo)}
                      className={`mr-4 px-4 py-2 rounded-full font-bold text-sm transition ${selectedVideo.isSubscribed ? 'bg-neutral-800 text-neutral-300' : 'bg-white text-black hover:bg-neutral-200'}`}
                    >
                      {selectedVideo.isSubscribed ? 'רשום כמנוי' : 'הרשם למנוי'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-neutral-800 rounded-full">
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold hover:bg-neutral-700 rounded-r-full">
                        <ThumbsUp className="w-4 h-4" /> 1.2K
                      </button>
                      <div className="w-px h-4 bg-neutral-700"></div>
                      <button className="px-3 py-2 text-xs hover:bg-neutral-700 rounded-l-full">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Chat Box */}
              <div className="bg-neutral-800/50 border border-neutral-800 rounded-2xl flex flex-col h-[500px]">
                <div className="p-3 border-b border-neutral-800 font-bold text-sm flex items-center justify-between">
                  <span>צ׳אט חי</span>
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="flex items-start justify-between group">
                      <div>
                        <span className="font-bold" style={{ color: msg.color }}>{msg.user}: </span>
                        <span className="text-neutral-200">{msg.text}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setChatMessages(chatMessages.filter(m => m.id !== msg.id));
                          triggerToast('ההודעה הוסרה על ידי מודרטור');
                        }}
                        className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-800 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="שלח הודעה בצ׳אט..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button type="submit" className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl text-xs font-bold">
                    שלח
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* CREATOR STUDIO VIEW */}
          {currentView === 'creator-studio' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                <div>
                  <h1 className="text-2xl font-black">VidStar Studio 📊</h1>
                  <p className="text-xs text-neutral-400">אנליטיקה ונתוני הערוץ בזמן אמת</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800">
                  <span className="text-xs text-neutral-400">צפיות כוללות</span>
                  <div className="text-2xl font-black mt-1">128,450</div>
                  <span className="text-[10px] text-green-400">↑ 12%+ השבוע</span>
                </div>
                <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800">
                  <span className="text-xs text-neutral-400">סאבים חדשים השבוע</span>
                  <div className="text-2xl font-black mt-1 text-red-500">+124</div>
                  <span className="text-[10px] text-neutral-500">סה״כ 45.2K מנויים</span>
                </div>
                <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800">
                  <span className="text-xs text-neutral-400">זמן צפייה (שעות)</span>
                  <div className="text-2xl font-black mt-1">3,420</div>
                  <span className="text-[10px] text-green-400">↑ 8%+ השבוע</span>
                </div>
                <div className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800">
                  <span className="text-xs text-neutral-400">צופים לא רשומים</span>
                  <div className="text-2xl font-black mt-1 text-yellow-500">68%</div>
                  <span className="text-[10px] text-neutral-400">פוטנציאל המרה גבוה</span>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN GATE / LOGIN VIEW */}
          {currentView === 'admin-gate' && !isAdminLoggedIn && (
            <div className="max-w-md mx-auto mt-12 bg-neutral-800 p-6 rounded-3xl border border-neutral-700 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black">VidStar Admin Studio</h2>
                <p className="text-xs text-neutral-400 mt-1">מערכת ניהול מוגנת ומאובטחת</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">שם משתמש מנהל</label>
                  <input 
                    type="text" 
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">סיסמה</label>
                  <input 
                    type="password" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl text-sm transition">
                  התחבר למערכת
                </button>
              </form>
            </div>
          )}

          {/* ADMIN PANEL VIEW */}
          {(currentView === 'admin-gate' && isAdminLoggedIn) && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                <h1 className="text-2xl font-black text-yellow-400">פאנל ניהול ראשי (Admin Control)</h1>
                <button 
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 px-3 py-1.5 rounded-lg"
                >
                  התנתק
                </button>
              </div>

              <div className="bg-neutral-800/40 p-5 rounded-2xl border border-neutral-800 space-y-4">
                <h3 className="font-bold text-sm">הענקת VidStar Premium לפי אימייל</h3>
                <div className="flex gap-2 max-w-md">
                  <input 
                    type="email" 
                    placeholder="user@example.com" 
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button 
                    onClick={() => triggerToast('מנוי פרימיום הוענק בהצלחה!')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    הענק פרימיום
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
