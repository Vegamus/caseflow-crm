import { useState, useEffect } from 'react';

// UTILITIES
const generateId = () => Math.random().toString(36).substr(2, 9);
const formatCurrency = (amount) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
const formatDate = (date) => new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const formatDateTime = (date) => new Date(date).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// ICONS
const Icons = {
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>,
  Briefcase: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  DollarSign: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>,
  UserCog: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.204-.107-.397.165-.71.505-.78.929l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
  FileText: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  AlertTriangle: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>,
  Printer: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" /></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>,
  Bell: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>,
  Activity: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
  Building: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>,
  Webhook: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" /></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>,
  Globe: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
  TrendingUp: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>,
};

// STATUS CONFIG
const statusConfig = {
  case: { pending: { label: 'Pending', variant: 'amber' }, active: { label: 'Active', variant: 'blue' }, completed: { label: 'Completed', variant: 'emerald' }, cancelled: { label: 'Cancelled', variant: 'rose' } },
  service: { visa: { label: 'Visa', variant: 'indigo' }, education: { label: 'Education', variant: 'purple' }, property: { label: 'Property', variant: 'teal' }, recruitment: { label: 'Recruitment', variant: 'orange' } },
  invoice: { draft: { label: 'Draft', variant: 'default' }, sent: { label: 'Sent', variant: 'blue' }, paid: { label: 'Paid', variant: 'emerald' }, overdue: { label: 'Overdue', variant: 'rose' } },
  priority: { high: { label: 'High', variant: 'rose' }, medium: { label: 'Medium', variant: 'amber' }, low: { label: 'Low', variant: 'default' } },
  email: { sent: { label: 'Sent', variant: 'emerald' }, failed: { label: 'Failed', variant: 'rose' }, pending: { label: 'Pending', variant: 'amber' } },
  user: { active: { label: 'Active', variant: 'emerald' }, inactive: { label: 'Inactive', variant: 'default' } },
  gdpr: { consented: { label: 'Consented', variant: 'emerald' }, pending: { label: 'Pending', variant: 'amber' }, withdrawn: { label: 'Withdrawn', variant: 'rose' } },
};

// UI COMPONENTS
const Card = ({ children, className = '' }) => <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 ${className}`}>{children}</div>;

const Button = ({ children, variant = 'primary', size = 'default', onClick, type = 'button', className = '' }) => {
  const variants = { primary: 'bg-indigo-600 text-white hover:bg-indigo-700', secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50', success: 'bg-emerald-600 text-white hover:bg-emerald-700', ghost: 'text-slate-600 hover:bg-slate-100' };
  const sizes = { small: 'px-3 py-1.5 text-sm', default: 'px-4 py-2.5', large: 'px-6 py-3 text-lg' };
  return <button type={type} onClick={onClick} className={`inline-flex items-center gap-2 font-medium rounded-xl transition-all ${variants[variant]} ${sizes[size]} ${className}`}>{children}</button>;
};

const Badge = ({ children, variant = 'default', size = 'default' }) => {
  const variants = { default: 'bg-slate-100 text-slate-700', indigo: 'bg-indigo-100 text-indigo-700', purple: 'bg-purple-100 text-purple-700', teal: 'bg-teal-100 text-teal-700', orange: 'bg-orange-100 text-orange-700', emerald: 'bg-emerald-100 text-emerald-700', amber: 'bg-amber-100 text-amber-700', rose: 'bg-rose-100 text-rose-700', blue: 'bg-blue-100 text-blue-700' };
  const sizes = { small: 'px-2 py-0.5 text-xs', default: 'px-2.5 py-1 text-xs' };
  return <span className={`inline-flex items-center font-medium rounded-lg ${variants[variant]} ${sizes[size]}`}>{children}</span>;
};

const Modal = ({ isOpen, onClose, title, children, size = 'default' }) => {
  if (!isOpen) return null;
  const sizes = { default: 'max-w-lg', large: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className={`bg-white rounded-2xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200"><h2 className="text-xl font-semibold text-slate-900">{title}</h2><button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"><span className="w-5 h-5"><Icons.X /></span></button></div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">{children}</div>
      </div>
    </div>
  );
};

const FormInput = ({ label, type = 'text', value, onChange, placeholder, required, options, rows, helpText }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">{label}{required && <span className="text-rose-500 ml-1">*</span>}</label>
    {type === 'select' ? (
      <select value={value} onChange={onChange} required={required} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="">Select...</option>
        {options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    ) : type === 'textarea' ? (
      <textarea value={value} onChange={onChange} placeholder={placeholder} required={required} rows={rows || 3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
    ) : (
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    )}
    {helpText && <p className="text-xs text-slate-500">{helpText}</p>}
  </div>
);

const Tabs = ({ tabs, activeTab, onChange }) => (
  <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
    {tabs.map(tab => (
      <button key={tab.id} onClick={() => onChange(tab.id)} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>{tab.label}</button>
    ))}
  </div>
);

const StatCard = ({ icon: Icon, label, value, color = 'text-slate-900', trend }) => (
  <Card className="p-6">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center"><span className={`w-6 h-6 ${color}`}><Icon /></span></div>
      <div><p className="text-sm text-slate-500">{label}</p><p className={`text-2xl font-bold ${color}`}>{value}</p>{trend && <p className="text-xs text-emerald-600 flex items-center gap-1"><Icons.TrendingUp className="w-3 h-3" />{trend}</p>}</div>
    </div>
  </Card>
);

const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4"><span className="w-8 h-8 text-slate-400"><Icon /></span></div>
    <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
    <p className="text-slate-500 mb-4 max-w-sm">{description}</p>
    {action}
  </div>
);

// INITIAL DATA
const initialClients = [
  { id: 'c1', fullName: 'James Wilson', email: 'james.wilson@email.com', phone: '+44 7700 900123', nationality: 'British', dateOfBirth: '1985-03-15', address: '123 High Street, London, SW1A 1AA', assignedStaff: 'Sarah Mitchell', gdprConsent: true, gdprConsentDate: '2024-01-15', createdAt: '2024-01-15T10:00:00Z', source: 'Website', notes: 'VIP client, requires priority handling' },
  { id: 'c2', fullName: 'Maria Santos', email: 'maria.santos@email.com', phone: '+44 7700 900456', nationality: 'Portuguese', dateOfBirth: '1990-07-22', address: '45 Oak Lane, Manchester, M1 2AB', assignedStaff: 'John Davies', gdprConsent: true, gdprConsentDate: '2024-02-01', createdAt: '2024-02-01T14:30:00Z', source: 'Referral', notes: '' },
  { id: 'c3', fullName: 'Ahmed Hassan', email: 'ahmed.hassan@email.com', phone: '+44 7700 900789', nationality: 'Egyptian', dateOfBirth: '1988-11-08', address: '78 Park Road, Birmingham, B1 1CD', assignedStaff: 'Sarah Mitchell', gdprConsent: true, gdprConsentDate: '2024-02-15', createdAt: '2024-02-15T09:15:00Z', source: 'Jotform', notes: 'Urgent case' },
];

const initialCases = [
  { id: 'case1', clientId: 'c1', serviceType: 'visa', status: 'active', notes: 'Tier 2 Skilled Worker Visa Application', createdAt: '2024-01-20T10:00:00Z', deadline: '2024-04-20', assignedStaff: 'Sarah Mitchell' },
  { id: 'case2', clientId: 'c2', serviceType: 'education', status: 'pending', notes: 'University Admission Support - Masters Program', createdAt: '2024-02-05T11:00:00Z', deadline: '2024-06-01', assignedStaff: 'John Davies' },
  { id: 'case3', clientId: 'c3', serviceType: 'property', status: 'active', notes: 'Property Investment Consultation', createdAt: '2024-02-20T14:00:00Z', deadline: '2024-03-30', assignedStaff: 'Sarah Mitchell' },
  { id: 'case4', clientId: 'c1', serviceType: 'recruitment', status: 'completed', notes: 'Job Placement - Senior Developer Role', createdAt: '2024-01-10T09:00:00Z', deadline: '2024-02-28', assignedStaff: 'John Davies' },
];

const initialTimeline = [
  { id: 't1', caseId: 'case1', action: 'Case Created', description: 'Tier 2 visa application initiated', user: 'Sarah Mitchell', timestamp: '2024-01-20T10:00:00Z' },
  { id: 't2', caseId: 'case1', action: 'Document Uploaded', description: 'Passport scan uploaded', user: 'James Wilson', timestamp: '2024-01-22T14:30:00Z' },
  { id: 't3', caseId: 'case1', action: 'Status Update', description: 'Application submitted to UKVI', user: 'Sarah Mitchell', timestamp: '2024-02-01T09:00:00Z' },
];

const initialInvoices = [
  { id: 'inv1', invoiceNumber: 'INV-2024-001', clientId: 'c1', caseId: 'case1', items: [{ description: 'Tier 2 Visa Application Service', quantity: 1, unitPrice: 2500 }], subtotal: 2500, vatRate: 20, vat: 500, total: 3000, status: 'paid', createdAt: '2024-01-20T10:00:00Z', dueDate: '2024-02-20' },
  { id: 'inv2', invoiceNumber: 'INV-2024-002', clientId: 'c2', caseId: 'case2', items: [{ description: 'University Admission Support', quantity: 1, unitPrice: 1500 }], subtotal: 1500, vatRate: 20, vat: 300, total: 1800, status: 'sent', createdAt: '2024-02-05T11:00:00Z', dueDate: '2024-03-05' },
  { id: 'inv3', invoiceNumber: 'INV-2024-003', clientId: 'c3', caseId: 'case3', items: [{ description: 'Property Investment Consultation', quantity: 1, unitPrice: 3500 }], subtotal: 3500, vatRate: 20, vat: 700, total: 4200, status: 'overdue', createdAt: '2024-02-20T14:00:00Z', dueDate: '2024-03-01' },
];

const initialPayments = [
  { id: 'pay1', invoiceId: 'inv1', amount: 3000, method: 'Bank Transfer', reference: 'TRF-001234', date: '2024-02-15T10:00:00Z' },
];

const initialTasks = [
  { id: 'task1', caseId: 'case1', description: 'Follow up on UKVI response', assignedStaff: 'Sarah Mitchell', dueDate: '2024-03-15', priority: 'high', status: 'pending' },
  { id: 'task2', caseId: 'case2', description: 'Collect university transcripts', assignedStaff: 'John Davies', dueDate: '2024-03-20', priority: 'medium', status: 'pending' },
  { id: 'task3', caseId: 'case3', description: 'Schedule property viewing', assignedStaff: 'Sarah Mitchell', dueDate: '2024-03-10', priority: 'low', status: 'completed' },
];

const initialUsers = [
  { id: 'u1', name: 'Sarah Mitchell', email: 'sarah@caseflow.com', role: 'admin', department: 'Immigration', status: 'active', createdAt: '2023-06-01T00:00:00Z' },
  { id: 'u2', name: 'John Davies', email: 'john@caseflow.com', role: 'staff', department: 'Education', status: 'active', createdAt: '2023-08-15T00:00:00Z' },
];

const initialEmails = [];

const initialEmailTemplates = [
  { id: 'et1', name: 'Welcome Email', subject: 'Welcome to CaseFlow, {{client_name}}!', body: 'Dear {{client_name}},\n\nWelcome to CaseFlow! We are delighted to have you as our client.\n\nYour assigned consultant is {{assigned_staff}}.\n\nBest regards,\nCaseFlow Team' },
  { id: 'et2', name: 'Case Update', subject: 'Update on Your Case', body: 'Dear {{client_name}},\n\nWe wanted to provide you with an update on your case.\n\nPlease contact us if you have any questions.\n\nBest regards,\n{{assigned_staff}}' },
];

const initialSettings = {
  company: { name: 'CaseFlow Consulting', email: 'info@caseflow.com', phone: '+44 20 1234 5678', address: '100 Business Park, London, EC1A 1BB', vatNumber: 'GB123456789' },
  invoice: { prefix: 'INV', nextNumber: 4, defaultVatRate: 20, paymentTerms: 30, bankName: 'Barclays Bank', accountNumber: '12345678', sortCode: '20-00-00', footer: 'Thank you for your business.' },
  email: { fromName: 'CaseFlow', fromEmail: 'noreply@caseflow.com', smtpHost: '', smtpPort: 587, autoWelcomeEmail: true, autoInvoiceEmail: false },
  jotform: { enabled: false, apiKey: '', webhookSecret: '' },
  notifications: { emailOnNewClient: true, emailOnNewCase: true, emailOnTaskDue: true, emailOnInvoiceOverdue: true },
};

// PAGE COMPONENTS - Part 2

// DASHBOARD
const Dashboard = ({ clients, cases, invoices, tasks, payments, emails, onNavigate }) => {
  const activeClients = clients.length;
  const activeCases = cases.filter(c => c.status === 'active').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const recentCases = cases.slice(0, 5);

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1><p className="text-slate-500">Welcome back! Here's what's happening today.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Icons.Users} label="Total Clients" value={activeClients} color="text-indigo-600" />
        <StatCard icon={Icons.Briefcase} label="Active Cases" value={activeCases} color="text-purple-600" />
        <StatCard icon={Icons.CheckSquare} label="Pending Tasks" value={pendingTasks} color="text-amber-600" />
        <StatCard icon={Icons.DollarSign} label="Revenue" value={formatCurrency(totalRevenue)} color="text-emerald-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-slate-900">Recent Cases</h2><Button variant="ghost" size="small" onClick={() => onNavigate('cases')}>View All</Button></div>
          <div className="space-y-3">
            {recentCases.map(c => {
              const client = clients.find(cl => cl.id === c.clientId);
              return (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">{client?.fullName.split(' ').map(n => n[0]).join('')}</div>
                    <div><p className="font-medium text-slate-900">{client?.fullName}</p><p className="text-sm text-slate-500">{c.notes?.slice(0, 30)}...</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusConfig.service[c.serviceType]?.variant}>{statusConfig.service[c.serviceType]?.label}</Badge>
                    <Badge variant={statusConfig.case[c.status]?.variant}>{statusConfig.case[c.status]?.label}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-slate-900">Upcoming Tasks</h2><Button variant="ghost" size="small" onClick={() => onNavigate('tasks')}>View All</Button></div>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'pending').slice(0, 5).map(task => {
              const caseItem = cases.find(c => c.id === task.caseId);
              return (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <div><p className="font-medium text-slate-900">{task.description}</p><p className="text-sm text-slate-500">{caseItem?.notes?.slice(0, 25)}...</p></div>
                  <div className="text-right"><Badge variant={statusConfig.priority[task.priority]?.variant}>{task.priority}</Badge><p className="text-xs text-slate-500 mt-1">{formatDate(task.dueDate)}</p></div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

// CLIENTS MODULE
const ClientsModule = ({ clients, cases, setClients, onSelectClient, settings, setEmails, setTimeline }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({ fullName: '', email: '', phone: '', nationality: '', dateOfBirth: '', address: '', assignedStaff: '', source: 'Website', gdprConsent: false });

  const filteredClients = clients.filter(c => c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const handleAddClient = (e) => {
    e.preventDefault();
    const client = { ...newClient, id: generateId(), createdAt: new Date().toISOString(), gdprConsentDate: newClient.gdprConsent ? new Date().toISOString() : null };
    setClients(prev => [...prev, client]);
    if (settings.email.autoWelcomeEmail) {
      setEmails(prev => [...prev, { id: generateId(), to: client.email, toName: client.fullName, subject: `Welcome to CaseFlow, ${client.fullName}!`, body: `Dear ${client.fullName},\n\nWelcome to CaseFlow!`, status: 'sent', sentAt: new Date().toISOString(), clientId: client.id }]);
    }
    setShowAddModal(false);
    setNewClient({ fullName: '', email: '', phone: '', nationality: '', dateOfBirth: '', address: '', assignedStaff: '', source: 'Website', gdprConsent: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold text-slate-900 mb-2">Clients</h1><p className="text-slate-500">{clients.length} total clients</p></div><Button onClick={() => setShowAddModal(true)}><span className="w-5 h-5"><Icons.Plus /></span>Add Client</Button></div>
      <Card className="p-4"><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"><Icons.Search /></span><input type="text" placeholder="Search clients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div></Card>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-slate-50 border-b border-slate-200"><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Client</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Cases</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">GDPR</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Assigned To</th><th className="px-6 py-4"></th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map(client => {
                const clientCases = cases.filter(c => c.clientId === client.id);
                return (
                  <tr key={client.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => onSelectClient(client)}>
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">{client.fullName.split(' ').map(n => n[0]).join('')}</div><div><p className="font-medium text-slate-900">{client.fullName}</p><p className="text-sm text-slate-500">{client.nationality}</p></div></div></td>
                    <td className="px-6 py-4"><p className="text-slate-900">{client.email}</p><p className="text-sm text-slate-500">{client.phone}</p></td>
                    <td className="px-6 py-4"><span className="font-medium text-slate-900">{clientCases.length}</span><span className="text-slate-500"> cases</span></td>
                    <td className="px-6 py-4"><Badge variant={client.gdprConsent ? 'emerald' : 'amber'}>{client.gdprConsent ? 'Consented' : 'Pending'}</Badge></td>
                    <td className="px-6 py-4"><span className="text-slate-700">{client.assignedStaff}</span></td>
                    <td className="px-6 py-4"><Button variant="ghost" size="small"><span className="w-4 h-4"><Icons.ChevronRight /></span></Button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Client" size="large">
        <form onSubmit={handleAddClient} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Full Name" value={newClient.fullName} onChange={(e) => setNewClient({...newClient, fullName: e.target.value})} required />
            <FormInput label="Email" type="email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} required />
            <FormInput label="Phone" value={newClient.phone} onChange={(e) => setNewClient({...newClient, phone: e.target.value})} />
            <FormInput label="Nationality" value={newClient.nationality} onChange={(e) => setNewClient({...newClient, nationality: e.target.value})} />
            <FormInput label="Date of Birth" type="date" value={newClient.dateOfBirth} onChange={(e) => setNewClient({...newClient, dateOfBirth: e.target.value})} />
            <FormInput label="Assigned Staff" type="select" value={newClient.assignedStaff} onChange={(e) => setNewClient({...newClient, assignedStaff: e.target.value})} options={[{value:'Sarah Mitchell',label:'Sarah Mitchell'},{value:'John Davies',label:'John Davies'}]} />
          </div>
          <FormInput label="Address" type="textarea" value={newClient.address} onChange={(e) => setNewClient({...newClient, address: e.target.value})} rows={2} />
          <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200"><input type="checkbox" checked={newClient.gdprConsent} onChange={(e) => setNewClient({...newClient, gdprConsent: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-indigo-600" /><div><p className="font-medium text-slate-900">GDPR Consent</p><p className="text-sm text-slate-500">Client has consented to data processing</p></div></label>
          <div className="flex justify-end gap-3 pt-4 border-t"><Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button><Button type="submit">Add Client</Button></div>
        </form>
      </Modal>
    </div>
  );
};

// CASES MODULE  
const CasesModule = ({ cases, clients }) => {
  const [filterService, setFilterService] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const filteredCases = cases.filter(c => (!filterService || c.serviceType === filterService) && (!filterStatus || c.status === filterStatus));

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-slate-900 mb-2">Cases</h1><p className="text-slate-500">{cases.length} total cases</p></div>
      <Card className="p-4">
        <div className="flex gap-4">
          <select value={filterService} onChange={(e) => setFilterService(e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="">All Services</option><option value="visa">Visa</option><option value="education">Education</option><option value="property">Property</option><option value="recruitment">Recruitment</option></select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="">All Statuses</option><option value="pending">Pending</option><option value="active">Active</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-slate-50 border-b border-slate-200"><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Case</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Client</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Service</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Deadline</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Assigned</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map(c => {
                const client = clients.find(cl => cl.id === c.clientId);
                return (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4"><p className="font-medium text-slate-900">{c.notes}</p><p className="text-xs text-slate-500">{formatDate(c.createdAt)}</p></td>
                    <td className="px-6 py-4"><p className="font-medium text-slate-900">{client?.fullName}</p></td>
                    <td className="px-6 py-4"><Badge variant={statusConfig.service[c.serviceType]?.variant}>{statusConfig.service[c.serviceType]?.label}</Badge></td>
                    <td className="px-6 py-4"><Badge variant={statusConfig.case[c.status]?.variant}>{statusConfig.case[c.status]?.label}</Badge></td>
                    <td className="px-6 py-4"><span className="text-slate-700">{formatDate(c.deadline)}</span></td>
                    <td className="px-6 py-4"><span className="text-slate-700">{c.assignedStaff}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// CLIENT DETAIL
const ClientDetail = ({ client, cases, timeline, invoices, payments, tasks, onBack, setCases, setTimeline, setTasks, setInvoices, clients, settings }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCase, setShowAddCase] = useState(false);
  const [newCase, setNewCase] = useState({ serviceType: 'visa', notes: '', deadline: '', assignedStaff: client.assignedStaff });
  
  const clientCases = cases.filter(c => c.clientId === client.id);
  const clientTimeline = timeline.filter(t => clientCases.some(c => c.id === t.caseId));
  const clientInvoices = invoices.filter(i => i.clientId === client.id);
  const clientTasks = tasks.filter(t => clientCases.some(c => c.id === t.caseId));

  const handleAddCase = (e) => {
    e.preventDefault();
    const caseItem = { ...newCase, id: generateId(), clientId: client.id, status: 'pending', createdAt: new Date().toISOString() };
    setCases(prev => [...prev, caseItem]);
    setTimeline(prev => [...prev, { id: generateId(), caseId: caseItem.id, action: 'Case Created', description: newCase.notes, user: newCase.assignedStaff, timestamp: new Date().toISOString() }]);
    setShowAddCase(false);
    setNewCase({ serviceType: 'visa', notes: '', deadline: '', assignedStaff: client.assignedStaff });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Button variant="ghost" onClick={onBack}><span className="w-5 h-5"><Icons.ArrowLeft /></span>Back</Button><div><h1 className="text-3xl font-bold text-slate-900">{client.fullName}</h1><p className="text-slate-500">{client.email}</p></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Client Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3"><span className="w-5 h-5 text-slate-400"><Icons.Mail /></span><div><p className="text-sm text-slate-500">Email</p><p className="text-slate-900">{client.email}</p></div></div>
            <div className="flex items-center gap-3"><span className="w-5 h-5 text-slate-400"><Icons.Phone /></span><div><p className="text-sm text-slate-500">Phone</p><p className="text-slate-900">{client.phone}</p></div></div>
            <div className="flex items-center gap-3"><span className="w-5 h-5 text-slate-400"><Icons.Globe /></span><div><p className="text-sm text-slate-500">Nationality</p><p className="text-slate-900">{client.nationality}</p></div></div>
            <div className="flex items-center gap-3"><span className="w-5 h-5 text-slate-400"><Icons.User /></span><div><p className="text-sm text-slate-500">Assigned To</p><p className="text-slate-900">{client.assignedStaff}</p></div></div>
            <div className="pt-4 border-t"><p className="text-sm text-slate-500 mb-2">GDPR Status</p><Badge variant={client.gdprConsent ? 'emerald' : 'amber'}>{client.gdprConsent ? 'Consented' : 'Pending'}</Badge>{client.gdprConsentDate && <p className="text-xs text-slate-500 mt-1">Since {formatDate(client.gdprConsentDate)}</p>}</div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-6">
          <Tabs tabs={[{ id: 'overview', label: 'Overview' }, { id: 'cases', label: `Cases (${clientCases.length})` }, { id: 'timeline', label: 'Timeline' }, { id: 'invoices', label: 'Invoices' }]} activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={Icons.Briefcase} label="Total Cases" value={clientCases.length} color="text-indigo-600" />
              <StatCard icon={Icons.CheckSquare} label="Pending Tasks" value={clientTasks.filter(t => t.status === 'pending').length} color="text-amber-600" />
            </div>
          )}
          {activeTab === 'cases' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-slate-900">Cases</h3><Button size="small" onClick={() => setShowAddCase(true)}><span className="w-4 h-4"><Icons.Plus /></span>New Case</Button></div>
              <div className="space-y-3">
                {clientCases.map(c => (
                  <div key={c.id} className="p-4 rounded-xl bg-slate-50">
                    <div className="flex items-center justify-between"><p className="font-medium text-slate-900">{c.notes}</p><div className="flex gap-2"><Badge variant={statusConfig.service[c.serviceType]?.variant}>{statusConfig.service[c.serviceType]?.label}</Badge><Badge variant={statusConfig.case[c.status]?.variant}>{statusConfig.case[c.status]?.label}</Badge></div></div>
                    <p className="text-sm text-slate-500 mt-1">Deadline: {formatDate(c.deadline)} • {c.assignedStaff}</p>
                  </div>
                ))}
                {clientCases.length === 0 && <EmptyState icon={Icons.Briefcase} title="No cases yet" description="Create a new case for this client" />}
              </div>
            </Card>
          )}
          {activeTab === 'timeline' && (
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Activity Timeline</h3>
              <div className="space-y-4">
                {clientTimeline.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(event => (
                  <div key={event.id} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                    <div><p className="font-medium text-slate-900">{event.action}</p><p className="text-sm text-slate-500">{event.description}</p><p className="text-xs text-slate-400">{formatDateTime(event.timestamp)} by {event.user}</p></div>
                  </div>
                ))}
                {clientTimeline.length === 0 && <EmptyState icon={Icons.Clock} title="No activity yet" description="Timeline events will appear here" />}
              </div>
            </Card>
          )}
          {activeTab === 'invoices' && (
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Invoices</h3>
              <div className="space-y-3">
                {clientInvoices.map(inv => (
                  <div key={inv.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                    <div><p className="font-medium text-slate-900">{inv.invoiceNumber}</p><p className="text-sm text-slate-500">{formatDate(inv.createdAt)}</p></div>
                    <div className="flex items-center gap-4"><span className="font-semibold text-slate-900">{formatCurrency(inv.total)}</span><Badge variant={statusConfig.invoice[inv.status]?.variant}>{statusConfig.invoice[inv.status]?.label}</Badge></div>
                  </div>
                ))}
                {clientInvoices.length === 0 && <EmptyState icon={Icons.FileText} title="No invoices yet" description="Invoices will appear here" />}
              </div>
            </Card>
          )}
        </div>
      </div>
      <Modal isOpen={showAddCase} onClose={() => setShowAddCase(false)} title="Create New Case">
        <form onSubmit={handleAddCase} className="space-y-4">
          <FormInput label="Service Type" type="select" value={newCase.serviceType} onChange={(e) => setNewCase({...newCase, serviceType: e.target.value})} options={[{value:'visa',label:'Visa'},{value:'education',label:'Education'},{value:'property',label:'Property'},{value:'recruitment',label:'Recruitment'}]} />
          <FormInput label="Case Notes" type="textarea" value={newCase.notes} onChange={(e) => setNewCase({...newCase, notes: e.target.value})} required rows={3} />
          <FormInput label="Deadline" type="date" value={newCase.deadline} onChange={(e) => setNewCase({...newCase, deadline: e.target.value})} required />
          <FormInput label="Assigned Staff" type="select" value={newCase.assignedStaff} onChange={(e) => setNewCase({...newCase, assignedStaff: e.target.value})} options={[{value:'Sarah Mitchell',label:'Sarah Mitchell'},{value:'John Davies',label:'John Davies'}]} />
          <div className="flex justify-end gap-3 pt-4 border-t"><Button variant="secondary" onClick={() => setShowAddCase(false)}>Cancel</Button><Button type="submit">Create Case</Button></div>
        </form>
      </Modal>
    </div>
  );
};

const FinanceModule = ({ invoices, payments, clients, cases, setInvoices }) => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [filterStatus, setFilterStatus] = useState('');
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(null);
  
  const totalInvoiced = invoices.reduce((sum, i) => sum + i.total, 0);
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const outstanding = totalInvoiced - totalPaid;
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.total, 0);

  const filteredInvoices = invoices.filter(i => !filterStatus || i.status === filterStatus);

  const updateInvoiceStatus = (invoiceId, status) => {
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status } : inv));
    setShowInvoiceDetail(null);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-slate-900 mb-2">Finance</h1><p className="text-slate-500">Manage invoices and payments</p></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Icons.FileText} label="Total Invoiced" value={formatCurrency(totalInvoiced)} color="text-slate-700" />
        <StatCard icon={Icons.Check} label="Total Paid" value={formatCurrency(totalPaid)} color="text-emerald-600" />
        <StatCard icon={Icons.Clock} label="Outstanding" value={formatCurrency(outstanding)} color="text-amber-600" />
        <StatCard icon={Icons.AlertTriangle} label="Overdue" value={formatCurrency(overdueAmount)} color="text-rose-600" />
      </div>
      <Tabs tabs={[{ id: 'invoices', label: 'Invoices' }, { id: 'payments', label: 'Payments' }]} activeTab={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'invoices' && (
        <>
          <Card className="p-4"><div className="flex gap-4"><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="">All Statuses</option><option value="draft">Draft</option><option value="sent">Sent</option><option value="overdue">Overdue</option><option value="paid">Paid</option></select></div></Card>
          <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-slate-50 border-b border-slate-200"><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Invoice</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Client</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Description</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Due Date</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th><th className="px-6 py-4"></th></tr></thead><tbody className="divide-y divide-slate-100">{filteredInvoices.map(invoice => { const client = clients.find(c => c.id === invoice.clientId); return (<tr key={invoice.id} className="hover:bg-slate-50"><td className="px-6 py-4"><p className="font-semibold text-slate-900">{invoice.invoiceNumber}</p><p className="text-xs text-slate-500">{formatDate(invoice.createdAt)}</p></td><td className="px-6 py-4"><p className="font-medium text-slate-900">{client?.fullName}</p></td><td className="px-6 py-4"><p className="text-slate-700 truncate max-w-xs">{invoice.items[0]?.description}</p></td><td className="px-6 py-4"><span className="font-semibold text-slate-900">{formatCurrency(invoice.total)}</span></td><td className="px-6 py-4"><span className={invoice.status === 'overdue' ? 'text-rose-600 font-medium' : 'text-slate-700'}>{formatDate(invoice.dueDate)}</span></td><td className="px-6 py-4"><Badge variant={statusConfig.invoice[invoice.status]?.variant}>{statusConfig.invoice[invoice.status]?.label}</Badge></td><td className="px-6 py-4"><Button variant="ghost" size="small" onClick={() => setShowInvoiceDetail(invoice)}><span className="w-4 h-4"><Icons.Eye /></span></Button></td></tr>); })}</tbody></table></div></Card>
        </>
      )}
      
      {activeTab === 'payments' && (
        <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-slate-50 border-b border-slate-200"><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Date</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Invoice</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Client</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Method</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Reference</th></tr></thead><tbody className="divide-y divide-slate-100">{payments.map(payment => { const invoice = invoices.find(i => i.id === payment.invoiceId); const client = clients.find(c => c.id === invoice?.clientId); return (<tr key={payment.id} className="hover:bg-slate-50"><td className="px-6 py-4"><span className="text-slate-700">{formatDate(payment.date)}</span></td><td className="px-6 py-4"><span className="font-medium text-slate-900">{invoice?.invoiceNumber}</span></td><td className="px-6 py-4"><span className="text-slate-700">{client?.fullName}</span></td><td className="px-6 py-4"><span className="font-semibold text-emerald-600">{formatCurrency(payment.amount)}</span></td><td className="px-6 py-4"><span className="text-slate-700">{payment.method}</span></td><td className="px-6 py-4"><span className="text-slate-500 font-mono text-sm">{payment.reference}</span></td></tr>); })}</tbody></table></div></Card>
      )}

      <Modal isOpen={!!showInvoiceDetail} onClose={() => setShowInvoiceDetail(null)} title={`Invoice ${showInvoiceDetail?.invoiceNumber}`} size="large">
        {showInvoiceDetail && (() => { const client = clients.find(c => c.id === showInvoiceDetail.clientId); const caseItem = cases.find(c => c.id === showInvoiceDetail.caseId); return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div><p className="text-sm text-slate-500 mb-1">Client</p><p className="font-semibold text-slate-900">{client?.fullName}</p><p className="text-sm text-slate-500">{client?.email}</p></div>
              <div><p className="text-sm text-slate-500 mb-1">Case</p><p className="font-medium text-slate-900">{caseItem?.notes}</p><Badge variant={statusConfig.service[caseItem?.serviceType]?.variant}>{statusConfig.service[caseItem?.serviceType]?.label}</Badge></div>
            </div>
            <Card className="overflow-hidden"><table className="w-full"><thead><tr className="bg-slate-50"><th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Description</th><th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Qty</th><th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Unit Price</th><th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Total</th></tr></thead><tbody>{showInvoiceDetail.items.map((item, i) => (<tr key={i} className="border-t border-slate-100"><td className="px-4 py-3 text-slate-900">{item.description}</td><td className="px-4 py-3 text-right text-slate-700">{item.quantity}</td><td className="px-4 py-3 text-right text-slate-700">{formatCurrency(item.unitPrice)}</td><td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrency(item.quantity * item.unitPrice)}</td></tr>))}<tr className="border-t border-slate-200 bg-slate-50"><td colSpan="3" className="px-4 py-2 text-right text-slate-600">Subtotal</td><td className="px-4 py-2 text-right font-medium text-slate-900">{formatCurrency(showInvoiceDetail.subtotal)}</td></tr><tr className="bg-slate-50"><td colSpan="3" className="px-4 py-2 text-right text-slate-600">VAT ({showInvoiceDetail.vatRate}%)</td><td className="px-4 py-2 text-right font-medium text-slate-900">{formatCurrency(showInvoiceDetail.vat)}</td></tr><tr className="bg-slate-100"><td colSpan="3" className="px-4 py-3 text-right font-semibold text-slate-900">Total</td><td className="px-4 py-3 text-right font-bold text-lg text-slate-900">{formatCurrency(showInvoiceDetail.total)}</td></tr></tbody></table></Card>
            <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Badge variant={statusConfig.invoice[showInvoiceDetail.status]?.variant} size="default">{statusConfig.invoice[showInvoiceDetail.status]?.label}</Badge><span className="text-sm text-slate-500">Due: {formatDate(showInvoiceDetail.dueDate)}</span></div><div className="flex gap-2">{showInvoiceDetail.status === 'draft' && <Button variant="primary" onClick={() => updateInvoiceStatus(showInvoiceDetail.id, 'sent')}><span className="w-4 h-4"><Icons.Send /></span>Send Invoice</Button>}{showInvoiceDetail.status === 'sent' && <Button variant="success" onClick={() => updateInvoiceStatus(showInvoiceDetail.id, 'paid')}><span className="w-4 h-4"><Icons.Check /></span>Mark as Paid</Button>}{showInvoiceDetail.status === 'overdue' && <Button variant="success" onClick={() => updateInvoiceStatus(showInvoiceDetail.id, 'paid')}><span className="w-4 h-4"><Icons.Check /></span>Mark as Paid</Button>}<Button variant="secondary"><span className="w-4 h-4"><Icons.Printer /></span>Print</Button><Button variant="secondary"><span className="w-4 h-4"><Icons.Download /></span>Download</Button></div></div>
          </div>
        ); })()}
      </Modal>
    </div>
  );
};

// ============================================
// TASKS MODULE
// ============================================
const TasksModule = ({ tasks, cases, clients, setTasks }) => {
  const [filterStatus, setFilterStatus] = useState('');
  const toggleTaskStatus = (taskId) => { setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t)); };
  const filteredTasks = tasks.filter(t => !filterStatus || t.status === filterStatus).sort((a, b) => { if (a.status !== b.status) return a.status === 'pending' ? -1 : 1; return new Date(a.dueDate) - new Date(b.dueDate); });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold text-slate-900 mb-2">Tasks</h1><p className="text-slate-500">{tasks.filter(t => t.status === 'pending').length} pending • {tasks.filter(t => t.status === 'completed').length} completed</p></div></div>
      <Card className="p-4"><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="">All Tasks</option><option value="pending">Pending</option><option value="completed">Completed</option></select></Card>
      <Card className="overflow-hidden"><div className="divide-y divide-slate-100">{filteredTasks.map(task => { const caseItem = cases.find(c => c.id === task.caseId); const client = caseItem ? clients.find(c => c.id === caseItem.clientId) : null; const isOverdue = task.status === 'pending' && new Date(task.dueDate) < new Date(); return (<div key={task.id} className={`px-6 py-4 flex items-center gap-4 ${task.status === 'completed' ? 'bg-slate-50' : ''}`}><button onClick={() => toggleTaskStatus(task.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-500'}`}>{task.status === 'completed' && <span className="w-4 h-4"><Icons.Check /></span>}</button><div className="flex-1"><p className={`font-medium ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{task.description}</p><div className="flex items-center gap-2 mt-1"><span className="text-sm text-slate-500">{client?.fullName}</span><span className="text-slate-300">•</span><Badge variant={statusConfig.service[caseItem?.serviceType]?.variant} size="small">{caseItem?.notes?.slice(0, 25)}...</Badge></div></div><div className="flex items-center gap-4"><Badge variant={statusConfig.priority[task.priority]?.variant}>{task.priority}</Badge><span className="text-sm text-slate-500">{task.assignedStaff}</span><span className={`text-sm font-medium ${isOverdue ? 'text-rose-600' : 'text-slate-700'}`}>{formatDate(task.dueDate)}</span></div></div>); })}</div></Card>
    </div>
  );
};

// ============================================
// EMAILS MODULE
// ============================================
const EmailsModule = ({ emails, clients, emailTemplates, setEmails }) => {
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) { setEmailSubject(template.subject); setEmailBody(template.body); }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const client = clients.find(c => c.id === selectedClient);
    if (!client) return;
    const processedSubject = emailSubject.replace(/\{\{client_name\}\}/g, client.fullName).replace(/\{\{assigned_staff\}\}/g, client.assignedStaff);
    const processedBody = emailBody.replace(/\{\{client_name\}\}/g, client.fullName).replace(/\{\{assigned_staff\}\}/g, client.assignedStaff);
    setEmails(prev => [...prev, { id: generateId(), to: client.email, toName: client.fullName, subject: processedSubject, body: processedBody, status: 'sent', sentAt: new Date().toISOString(), templateId: selectedTemplate, clientId: client.id }]);
    setShowComposeModal(false);
    setSelectedTemplate(''); setSelectedClient(''); setEmailSubject(''); setEmailBody('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold text-slate-900 mb-2">Emails</h1><p className="text-slate-500">{emails.length} emails sent</p></div><Button onClick={() => setShowComposeModal(true)}><span className="w-5 h-5"><Icons.Send /></span>Compose Email</Button></div>
      <Card className="overflow-hidden"><div className="divide-y divide-slate-100">{emails.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt)).map(email => (<div key={email.id} className="px-6 py-4 hover:bg-slate-50"><div className="flex items-start justify-between"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"><span className="w-5 h-5 text-emerald-600"><Icons.Mail /></span></div><div><p className="font-medium text-slate-900">{email.toName}</p><p className="text-sm text-slate-500">{email.to}</p></div></div><div className="text-right"><Badge variant={statusConfig.email[email.status]?.variant}>{email.status}</Badge><p className="text-xs text-slate-400 mt-1">{formatDateTime(email.sentAt)}</p></div></div><div className="mt-3 pl-14"><p className="font-medium text-slate-700">{email.subject}</p><p className="text-sm text-slate-500 mt-1 line-clamp-2">{email.body}</p></div></div>))}{emails.length === 0 && <EmptyState icon={Icons.Mail} title="No emails sent yet" description="Compose your first email to a client" action={<Button onClick={() => setShowComposeModal(true)}><span className="w-5 h-5"><Icons.Send /></span>Compose Email</Button>} />}</div></Card>

      <Modal isOpen={showComposeModal} onClose={() => setShowComposeModal(false)} title="Compose Email" size="large">
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div className="grid grid-cols-2 gap-4"><FormInput label="Client" type="select" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} required options={clients.map(c => ({ value: c.id, label: `${c.fullName} (${c.email})` }))} /><FormInput label="Template (Optional)" type="select" value={selectedTemplate} onChange={(e) => handleTemplateChange(e.target.value)} options={emailTemplates.map(t => ({ value: t.id, label: t.name }))} /></div>
          <FormInput label="Subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} required placeholder="Email subject..." />
          <FormInput label="Body" type="textarea" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} required rows={8} placeholder="Email content..." />
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4"><p className="text-sm text-amber-700"><strong>Variables:</strong> Use {'{{client_name}}'}, {'{{assigned_staff}}'} to personalize</p></div>
          <div className="flex justify-end gap-3 pt-4 border-t"><Button variant="secondary" onClick={() => setShowComposeModal(false)}>Cancel</Button><Button type="submit"><span className="w-4 h-4"><Icons.Send /></span>Send Email</Button></div>
        </form>
      </Modal>
    </div>
  );
};

// ============================================
// ADMIN MODULE
// ============================================
const AdminModule = ({ users, setUsers, settings }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'staff', department: '', status: 'active' });

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers(prev => [...prev, { ...newUser, id: generateId(), createdAt: new Date().toISOString() }]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'staff', department: '', status: 'active' });
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-slate-900 mb-2">Admin</h1><p className="text-slate-500">Manage users and system settings</p></div>
      <Tabs tabs={[{ id: 'users', label: 'Users' }, { id: 'activity', label: 'Activity Log' }, { id: 'audit', label: 'Audit Trail' }]} activeTab={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'users' && (
        <>
          <div className="flex justify-end"><Button onClick={() => setShowAddUser(true)}><span className="w-5 h-5"><Icons.Plus /></span>Add User</Button></div>
          <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-slate-50 border-b border-slate-200"><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">User</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Email</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Role</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Department</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th><th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Joined</th></tr></thead><tbody className="divide-y divide-slate-100">{users.map(user => (<tr key={user.id} className="hover:bg-slate-50"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">{user.name.split(' ').map(n => n[0]).join('')}</div><span className="font-medium text-slate-900">{user.name}</span></div></td><td className="px-6 py-4"><span className="text-slate-700">{user.email}</span></td><td className="px-6 py-4"><Badge variant={user.role === 'admin' ? 'purple' : 'default'}>{user.role}</Badge></td><td className="px-6 py-4"><span className="text-slate-700">{user.department}</span></td><td className="px-6 py-4"><Badge variant={statusConfig.user[user.status]?.variant}>{statusConfig.user[user.status]?.label}</Badge></td><td className="px-6 py-4"><span className="text-slate-500">{formatDate(user.createdAt)}</span></td></tr>))}</tbody></table></div></Card>
        </>
      )}

      {activeTab === 'activity' && <Card className="p-8"><EmptyState icon={Icons.Activity} title="Activity Log" description="Recent system activity will appear here" /></Card>}
      {activeTab === 'audit' && <Card className="p-8"><EmptyState icon={Icons.Shield} title="Audit Trail" description="Compliance audit records will appear here" /></Card>}

      <Modal isOpen={showAddUser} onClose={() => setShowAddUser(false)} title="Add New User">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4"><FormInput label="Full Name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} required /><FormInput label="Email" type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} required /><FormInput label="Role" type="select" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} options={[{value:'admin',label:'Admin'},{value:'staff',label:'Staff'},{value:'viewer',label:'Viewer'}]} /><FormInput label="Department" type="select" value={newUser.department} onChange={(e) => setNewUser({...newUser, department: e.target.value})} options={[{value:'Immigration',label:'Immigration'},{value:'Education',label:'Education'},{value:'Property',label:'Property'},{value:'Recruitment',label:'Recruitment'}]} /></div>
          <div className="flex justify-end gap-3 pt-4 border-t"><Button variant="secondary" onClick={() => setShowAddUser(false)}>Cancel</Button><Button type="submit">Add User</Button></div>
        </form>
      </Modal>
    </div>
  );
};

// ============================================
// SETTINGS MODULE
// ============================================
const SettingsModule = ({ settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState('company');
  const [toast, setToast] = useState(null);

  const updateSettings = (section, field, value) => {
    setSettings(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const saveSettings = () => {
    setToast({ message: 'Settings saved successfully', type: 'success' });
  };

  const webhookUrl = `https://api.caseflow.com/webhooks/jotform/${settings.jotform.webhookSecret || 'your-secret-key'}`;

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1><p className="text-slate-500">Configure your CRM preferences</p></div>
      <Tabs tabs={[{ id: 'company', label: 'Company' }, { id: 'invoice', label: 'Invoice' }, { id: 'email', label: 'Email' }, { id: 'jotform', label: 'Jotform Integration' }, { id: 'notifications', label: 'Notifications' }]} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'company' && (
        <Card className="p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><span className="w-5 h-5 text-indigo-600"><Icons.Building /></span>Company Information</h2>
          <div className="grid grid-cols-2 gap-4"><FormInput label="Company Name" value={settings.company.name} onChange={(e) => updateSettings('company', 'name', e.target.value)} /><FormInput label="Email" type="email" value={settings.company.email} onChange={(e) => updateSettings('company', 'email', e.target.value)} /><FormInput label="Phone" value={settings.company.phone} onChange={(e) => updateSettings('company', 'phone', e.target.value)} /><FormInput label="VAT Number" value={settings.company.vatNumber} onChange={(e) => updateSettings('company', 'vatNumber', e.target.value)} /></div>
          <FormInput label="Address" type="textarea" value={settings.company.address} onChange={(e) => updateSettings('company', 'address', e.target.value)} rows={2} />
          <div className="flex justify-end"><Button onClick={saveSettings}>Save Changes</Button></div>
        </Card>
      )}

      {activeTab === 'invoice' && (
        <Card className="p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><span className="w-5 h-5 text-indigo-600"><Icons.FileText /></span>Invoice Settings</h2>
          <div className="grid grid-cols-2 gap-4"><FormInput label="Invoice Prefix" value={settings.invoice.prefix} onChange={(e) => updateSettings('invoice', 'prefix', e.target.value)} /><FormInput label="Next Invoice Number" type="number" value={settings.invoice.nextNumber} onChange={(e) => updateSettings('invoice', 'nextNumber', parseInt(e.target.value))} /><FormInput label="Default VAT Rate (%)" type="number" value={settings.invoice.defaultVatRate} onChange={(e) => updateSettings('invoice', 'defaultVatRate', parseFloat(e.target.value))} /><FormInput label="Payment Terms (days)" type="number" value={settings.invoice.paymentTerms} onChange={(e) => updateSettings('invoice', 'paymentTerms', parseInt(e.target.value))} /></div>
          <h3 className="font-medium text-slate-900 pt-4 border-t">Bank Details</h3>
          <div className="grid grid-cols-3 gap-4"><FormInput label="Bank Name" value={settings.invoice.bankName} onChange={(e) => updateSettings('invoice', 'bankName', e.target.value)} /><FormInput label="Account Number" value={settings.invoice.accountNumber} onChange={(e) => updateSettings('invoice', 'accountNumber', e.target.value)} /><FormInput label="Sort Code" value={settings.invoice.sortCode} onChange={(e) => updateSettings('invoice', 'sortCode', e.target.value)} /></div>
          <FormInput label="Invoice Footer" type="textarea" value={settings.invoice.footer} onChange={(e) => updateSettings('invoice', 'footer', e.target.value)} rows={2} />
          <div className="flex justify-end"><Button onClick={saveSettings}>Save Changes</Button></div>
        </Card>
      )}

      {activeTab === 'email' && (
        <Card className="p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><span className="w-5 h-5 text-indigo-600"><Icons.Mail /></span>Email Configuration</h2>
          <div className="grid grid-cols-2 gap-4"><FormInput label="From Name" value={settings.email.fromName} onChange={(e) => updateSettings('email', 'fromName', e.target.value)} /><FormInput label="From Email" type="email" value={settings.email.fromEmail} onChange={(e) => updateSettings('email', 'fromEmail', e.target.value)} /><FormInput label="SMTP Host" value={settings.email.smtpHost} onChange={(e) => updateSettings('email', 'smtpHost', e.target.value)} placeholder="smtp.example.com" /><FormInput label="SMTP Port" type="number" value={settings.email.smtpPort} onChange={(e) => updateSettings('email', 'smtpPort', parseInt(e.target.value))} /></div>
          <h3 className="font-medium text-slate-900 pt-4 border-t">Automated Emails</h3>
          <div className="space-y-3">{[{ key: 'autoWelcomeEmail', label: 'Send welcome email to new clients', desc: 'Automatically send a welcome email when a new client is created' }, { key: 'autoInvoiceEmail', label: 'Send invoice notifications', desc: 'Automatically email clients when an invoice is created' }].map(item => (<label key={item.key} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer transition-colors"><input type="checkbox" checked={settings.email[item.key]} onChange={(e) => updateSettings('email', item.key, e.target.checked)} className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /><div><p className="font-medium text-slate-900">{item.label}</p><p className="text-sm text-slate-500">{item.desc}</p></div></label>))}</div>
          <div className="flex justify-end"><Button onClick={saveSettings}>Save Changes</Button></div>
        </Card>
      )}

      {activeTab === 'jotform' && (
        <Card className="p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><span className="w-5 h-5 text-indigo-600"><Icons.Webhook /></span>Jotform Integration</h2>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4"><p className="text-sm text-indigo-700"><strong>How it works:</strong> Connect Jotform to automatically create clients from form submissions. Configure a webhook in Jotform to send data to your CaseFlow endpoint.</p></div>
          <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200"><input type="checkbox" checked={settings.jotform.enabled} onChange={(e) => updateSettings('jotform', 'enabled', e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /><div><p className="font-medium text-slate-900">Enable Jotform Integration</p><p className="text-sm text-slate-500">Allow automatic client creation from Jotform submissions</p></div></label>
          {settings.jotform.enabled && (<>
            <div className="grid grid-cols-2 gap-4"><FormInput label="Jotform API Key" value={settings.jotform.apiKey} onChange={(e) => updateSettings('jotform', 'apiKey', e.target.value)} placeholder="Enter your Jotform API key" helpText="Find this in your Jotform account settings" /><FormInput label="Webhook Secret" value={settings.jotform.webhookSecret} onChange={(e) => updateSettings('jotform', 'webhookSecret', e.target.value)} placeholder="Generate a secure secret" helpText="Used to verify incoming webhooks" /></div>
            <div className="space-y-2"><label className="block text-sm font-medium text-slate-700">Webhook URL</label><div className="flex gap-2"><input type="text" value={webhookUrl} readOnly className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono text-sm" /><Button variant="secondary" onClick={() => navigator.clipboard.writeText(webhookUrl)}><span className="w-4 h-4"><Icons.Copy /></span>Copy</Button></div><p className="text-xs text-slate-500">Add this URL to your Jotform webhook settings</p></div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4"><h4 className="font-medium text-amber-900 mb-2">Setup Instructions</h4><ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside"><li>Go to your Jotform form settings</li><li>Navigate to Integrations → Webhooks</li><li>Add the webhook URL above</li><li>Map form fields to client data (name, email, phone, etc.)</li><li>Test the integration with a sample submission</li></ol></div>
          </>)}
          <div className="flex justify-end"><Button onClick={saveSettings}>Save Changes</Button></div>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card className="p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><span className="w-5 h-5 text-indigo-600"><Icons.Bell /></span>Notification Preferences</h2>
          <div className="space-y-3">{[{ key: 'emailOnNewClient', label: 'New client notifications', desc: 'Receive email when a new client is added' }, { key: 'emailOnNewCase', label: 'New case notifications', desc: 'Receive email when a new case is created' }, { key: 'emailOnTaskDue', label: 'Task due reminders', desc: 'Receive reminders for upcoming task deadlines' }, { key: 'emailOnInvoiceOverdue', label: 'Overdue invoice alerts', desc: 'Receive alerts when invoices become overdue' }].map(item => (<label key={item.key} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer transition-colors"><input type="checkbox" checked={settings.notifications[item.key]} onChange={(e) => updateSettings('notifications', item.key, e.target.checked)} className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /><div><p className="font-medium text-slate-900">{item.label}</p><p className="text-sm text-slate-500">{item.desc}</p></div></label>))}</div>
          <div className="flex justify-end"><Button onClick={saveSettings}>Save Changes</Button></div>
        </Card>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, 4000); return () => clearTimeout(timer); }, [onClose]);
  const types = { success: 'bg-emerald-500', error: 'bg-rose-500', warning: 'bg-amber-500', info: 'bg-indigo-500' };
  return <div className={`fixed bottom-4 right-4 z-50 px-6 py-4 rounded-xl text-white shadow-lg flex items-center gap-3 ${types[type]}`}><span className="w-5 h-5">{type === 'success' ? <Icons.Check /> : <Icons.AlertTriangle />}</span><span className="font-medium">{message}</span><button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><span className="w-4 h-4"><Icons.X /></span></button></div>;
};

// ============================================
// MAIN APP
// ============================================
export default function CaseFlowCRM() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [clients, setClients] = useState(initialClients);
  const [cases, setCases] = useState(initialCases);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [payments, setPayments] = useState(initialPayments);
  const [tasks, setTasks] = useState(initialTasks);
  const [users, setUsers] = useState(initialUsers);
  const [emails, setEmails] = useState(initialEmails);
  const [settings, setSettings] = useState(initialSettings);
  const [selectedClient, setSelectedClient] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Home },
    { id: 'clients', label: 'Clients', icon: Icons.Users },
    { id: 'cases', label: 'Cases', icon: Icons.Briefcase },
    { id: 'tasks', label: 'Tasks', icon: Icons.CheckSquare },
    { id: 'finance', label: 'Finance', icon: Icons.DollarSign },
    { id: 'emails', label: 'Emails', icon: Icons.Mail },
    { id: 'admin', label: 'Admin', icon: Icons.UserCog },
    { id: 'settings', label: 'Settings', icon: Icons.Settings },
  ];

  const handleSelectClient = (client) => { setSelectedClient(client); setActiveModule('client-detail'); };
  const handleBackToClients = () => { setSelectedClient(null); setActiveModule('clients'); };

  return (
    <div className="min-h-screen bg-slate-50 flex" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');`}</style>
      
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 fixed h-full z-40`}>
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg"><span className="text-white font-bold text-lg">C</span></div>
            {!sidebarCollapsed && <div><h1 className="font-bold text-slate-900 text-lg">CaseFlow</h1><p className="text-xs text-slate-500">Compliance CRM</p></div>}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">{navItems.map(item => (<button key={item.id} onClick={() => { setActiveModule(item.id); setSelectedClient(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeModule === item.id || (item.id === 'clients' && activeModule === 'client-detail') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}><span className="w-5 h-5"><item.icon /></span>{!sidebarCollapsed && <span>{item.label}</span>}</button>))}</nav>
        <div className="p-4 border-t border-slate-200"><button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"><span className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}><Icons.ChevronRight /></span>{!sidebarCollapsed && <span className="text-sm">Collapse</span>}</button></div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md"><span className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"><Icons.Search /></span><input type="text" placeholder="Search clients, cases, invoices..." className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-slate-100 border-0 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" /></div>
            <div className="flex items-center gap-4"><button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"><span className="w-5 h-5"><Icons.Bell /></span><span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span></button><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer">SM</div></div>
          </div>
        </header>
        <div className="p-8">
          {activeModule === 'dashboard' && <Dashboard clients={clients} cases={cases} invoices={invoices} tasks={tasks} payments={payments} emails={emails} onNavigate={setActiveModule} />}
          {activeModule === 'clients' && <ClientsModule clients={clients} cases={cases} setClients={setClients} onSelectClient={handleSelectClient} settings={settings} setEmails={setEmails} setTimeline={setTimeline} />}
          {activeModule === 'client-detail' && selectedClient && <ClientDetail client={selectedClient} cases={cases} timeline={timeline} invoices={invoices} payments={payments} tasks={tasks} onBack={handleBackToClients} setCases={setCases} setTimeline={setTimeline} setTasks={setTasks} setInvoices={setInvoices} clients={clients} settings={settings} />}
          {activeModule === 'cases' && <CasesModule cases={cases} clients={clients} />}
          {activeModule === 'tasks' && <TasksModule tasks={tasks} cases={cases} clients={clients} setTasks={setTasks} />}
          {activeModule === 'finance' && <FinanceModule invoices={invoices} payments={payments} clients={clients} cases={cases} setInvoices={setInvoices} />}
          {activeModule === 'emails' && <EmailsModule emails={emails} clients={clients} emailTemplates={initialEmailTemplates} setEmails={setEmails} />}
          {activeModule === 'admin' && <AdminModule users={users} setUsers={setUsers} settings={settings} />}
          {activeModule === 'settings' && <SettingsModule settings={settings} setSettings={setSettings} />}
        </div>
      </main>
    </div>
  );
}
