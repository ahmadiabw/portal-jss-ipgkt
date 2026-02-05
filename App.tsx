/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Menu, X, 
  Target, Compass, ExternalLink,
  Sun, Moon, Key
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import Carousel from './components/Carousel';
import NewsSection from './components/NewsSection';
import { StaffMember } from './types';

const THEMES = {
  light: {
    bgPrimary: '#FFFFFF',    
    bgSecondary: '#F8FAFC',  
    textPrimary: '#0F172A',  
    textSecondary: '#64748B',
    accentRed: '#EE2A24',    
    accentBlue: '#003366',   
    border: 'rgba(15, 23, 42, 0.08)',
    navBg: '#FFFFFF'
  },
  dark: {
    bgPrimary: '#001a33',    
    bgSecondary: '#000d1a',  
    textPrimary: '#FFFFFF',  
    textSecondary: '#94A3B8',
    accentRed: '#EE2A24',    
    accentBlue: '#3B82F6',   
    border: 'rgba(255, 255, 255, 0.1)',
    navBg: '#000d1a'
  }
};

const LOGO_URL = "https://github.com/ahmadiabw/portal-jss/blob/main/aset/logo%20IPGKT.png?raw=true";

const JSS_STAFF: StaffMember[] = [
  { id: '1', name: 'Dr. Ahmadi bin Abd Wahab', position: 'Ketua Jabatan', field: 'Geografi & Sejarah', image: 'https://lh3.googleusercontent.com/pw/AP1GczP8_57pZa4Aw3DUQLEi-J8LVHxInZQMZ0RlmhgCEK0ookYOwHpAh62qgsgZmpOfUVaIl-Lgt7L6MC1XWPjgYdjAA_mP3AeMcMskaFULhiBChcDVCIzfuZ2DLCEgwdVCxq5v6d2dCItsmLGQGJaN9w_0=w800-h800-s-no-gm?authuser=0', description: 'PhD dalam Sains Bumi, pakar dalam bidang Geografi dan Sejarah Pendidikan.' },
  { id: '2', name: 'En. Mhd Yusof bin Zakaria', position: 'Pensyarah Kanan', field: 'Unit Sejarah', image: 'https://lh3.googleusercontent.com/pw/AP1GczMsNRQfR-qOWvxmAMFaoErY0s_qgX1cpxTDum1jLt2ijAG9oPJieoE7_w8kWoGMQNyeP2E9g3pf-LzwxPQ9W20a73CLuE8RzbJIw9X1NjEZ08mU1Z07Bjcmq5IrdTfqURGA92F6OwPieNUfdvDAPibD=w800-h800-s-no-gm?authuser=0', description: 'Pakar pengurusan disiplin dan kurikulum sejarah.' },
  { id: '3', name: 'Dr. Jusman bin Aman Setia', position: 'Ketua Unit Sejarah', field: 'Unit Sejarah', image: 'https://lh3.googleusercontent.com/pw/AP1GczN-BCh1CRAv_Sw2JuAuWtGzDXoa8pCMW_0iwOei-aSr-AQ5zKmMmsjaKhsCFoZCkNMFhpAys0AnYI_W1WuaJ71jnuj35jO3f1uiG3dqlLPb0j7zWER8keE32Pzj3bjbrtUpnLu3tMQYtnGVcRJeB24G=w800-h800-s-no-gm?authuser=0', description: 'Ketua Unit Sejarah dengan kepakaran dalam penyelidikan sejarah Malaysia.' },
  { id: '4', name: 'Pn. Aggenes Tona Antonius', position: 'Pensyarah', field: 'Unit Sejarah', image: 'https://lh3.googleusercontent.com/pw/AP1GczP1wcAHouAjo0gADvUazhLCk1y_BWKXQhPRBa2RGjrKJ8dNQ1SDcomrI9Ka2_xx_3Fc0-xM4zmKH_OfNd6lELpLVvGJmuiLFUHuvhBltVEp6lGgyhmoDix9OEowkGks-TsAWNcY0pwj8WAIvtT31KkX=w800-h800-s-no-gm?authuser=0', description: 'Pakar Psikologi Pendidikan dan Pedagogi Sejarah.' },
  { id: '5', name: 'Dr. Muliyati binti Timbang', position: 'Ketua Unit Muzik & Seni', field: 'Unit Muzik & PSV', image: 'https://lh3.googleusercontent.com/pw/AP1GczNR2Hs5o19E2CBwWUMZUk0cXvaTTE98bjNoIDot_6TsCTlEx1mcaCgpEE-mkHK1lZU_mVmT42f95FvUw6zdUdQMmHWaqM5L9GO94fYqVsTNJn52d8iYGEQoyQcS0d3-dvsaCkA9XQmqmWZX1hG0rLDs=w800-h800-s-no-gm?authuser=0', description: 'Kepakaran dalam Pengurusan Pendidikan, Seni dan Muzik.' },
];

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const theme = isDarkMode ? THEMES.dark : THEMES.light;

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.style.backgroundColor = theme.bgPrimary;
  }, [isDarkMode, theme]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative min-h-screen transition-colors duration-500 selection:bg-[#EE2A24] selection:text-white"
      style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary }}
    >
      <CustomCursor />
      <FluidBackground theme={isDarkMode ? 'dark' : 'light'} />
      <AIChat theme={isDarkMode ? 'dark' : 'light'} />
      
      {/* Mini Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-[#003366] w-full" />
        <header 
          className="py-4 px-6 md:px-12 flex items-center justify-between backdrop-blur-xl border-b shadow-sm transition-all"
          style={{ backgroundColor: theme.navBg + 'F2', borderColor: theme.border }}
        >
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 rounded bg-[#003366] flex items-center justify-center">
               <span className="text-white font-black text-[10px]">JSS</span>
            </div>
            <span className="font-heading font-black text-xs md:text-sm tracking-tighter">IPGKT</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center font-heading font-bold text-[10px] uppercase tracking-[0.2em]">
              {['Profil', 'Kakitangan', 'Berita', 'Program'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-4 py-2 hover:text-[#EE2A24] transition-all"
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2 border-l pl-4" style={{ borderColor: theme.border }}>
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-slate-100 transition-all border"
                style={{ borderColor: theme.border }}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2 border rounded-lg" style={{ borderColor: theme.border }}>
               {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 border rounded-lg bg-[#003366] text-white">
               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 border-b shadow-2xl p-6 flex flex-col gap-4 lg:hidden"
              style={{ backgroundColor: theme.navBg, borderColor: theme.border }}
            >
              {['Profil', 'Kakitangan', 'Berita', 'Program'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left font-heading font-bold text-xs uppercase tracking-widest py-3 border-b border-dashed last:border-0"
                  style={{ borderColor: theme.border }}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="pt-24">
        <section className="relative py-16 px-6 flex flex-col items-center text-center">
          <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="p-6 bg-white rounded-3xl shadow-2xl mb-8 border border-slate-100">
            <img src={LOGO_URL} alt="Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
          </motion.div>
          <GradientText text="PORTAL RASMI" as="h1" className="text-3xl md:text-5xl" theme={isDarkMode ? 'dark' : 'light'} />
          <h2 className="text-lg md:text-2xl font-heading font-bold uppercase mt-4 tracking-[0.3em] opacity-80">JABATAN SAINS SOSIAL</h2>
          <div className="h-1 w-20 bg-[#EE2A24] mt-6" />
        </section>

        <Carousel theme={isDarkMode ? 'dark' : 'light'} />

        <div className="w-full py-6 border-y overflow-hidden bg-[#000d1a] border-white/5">
          <motion.div className="flex whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
             {[0, 1].map((i) => (
               <div key={i} className="flex gap-20 px-10 items-center">
                 {[...Array(4)].map((_, j) => (
                   <span key={j} className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-white/90">
                     UNIT SEJARAH • UNIT MUZIK • UNIT SENI VISUAL • KECEMERLANGAN AKADEMIK IPGKT •
                   </span>
                 ))}
               </div>
             ))}
          </motion.div>
        </div>

        <section id="profil" className="py-24 px-6" style={{ backgroundColor: theme.bgSecondary }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 uppercase">HALA <br/><GradientText text="STRATEGIK" theme={isDarkMode ? 'dark' : 'light'} /></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-3xl border shadow-sm" style={{ borderColor: theme.border, backgroundColor: isDarkMode ? '#001a33' : '#FFFFFF' }}>
                <Target className="text-[#EE2A24] w-12 h-12 mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4 uppercase text-[#EE2A24]">VISI</h3>
                <p className="text-lg leading-relaxed font-medium italic opacity-80">"Melahirkan guru yang kompeten dan berjiwa pendidik melalui program pendidikan guru yang dinamik."</p>
              </div>
              <div className="p-10 rounded-3xl border shadow-sm" style={{ borderColor: theme.border, backgroundColor: isDarkMode ? '#001a33' : '#FFFFFF' }}>
                <Compass className="text-[#003366] w-12 h-12 mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4 uppercase text-[#003366]">MISI</h3>
                <p className="text-lg leading-relaxed font-medium opacity-80">"Memupuk komitmen guru pelatih dalam penyediaan guru yang berketrampilan melalui pengurusan yang berintegriti."</p>
              </div>
            </div>
          </div>
        </section>

        <section id="kakitangan" className="py-24 px-6" style={{ backgroundColor: theme.bgPrimary }}>
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tighter">WARGA <GradientText text="AKADEMIK" theme={isDarkMode ? 'dark' : 'light'} /></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px border rounded-3xl overflow-hidden" style={{ borderColor: theme.border, backgroundColor: theme.border }}>
              {JSS_STAFF.map((staff) => (
                <ArtistCard 
                  key={staff.id} 
                  artist={{...staff, genre: staff.position, day: staff.field}} 
                  theme={isDarkMode ? 'dark' : 'light'}
                  onClick={() => setSelectedStaff(staff)} 
                />
              ))}
            </div>
          </div>
        </section>

        <NewsSection theme={isDarkMode ? 'dark' : 'light'} />

        <section id="program" className="py-24 px-6 text-center border-t" style={{ backgroundColor: theme.bgPrimary, borderColor: theme.border }}>
          <GraduationCap className="w-16 h-16 mx-auto mb-8 text-[#003366]" />
          <h2 className="text-4xl font-heading font-bold mb-6">Program Akademik 2026</h2>
          <p className="max-w-2xl mx-auto opacity-60 mb-12">Tawaran pengambilan PISMP Sejarah 2026 kini dibuka.</p>
          <motion.a 
            href="https://pismp.moe.gov.my/" 
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-5 bg-[#EE2A24] text-white rounded-full font-bold uppercase tracking-widest shadow-2xl"
          >
            Mohon Sekarang <ExternalLink size={20} />
          </motion.a>
        </section>
      </main>

      <footer className="py-20 px-6 border-t" style={{ borderColor: theme.border, backgroundColor: theme.bgSecondary }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 opacity-40 text-[10px] font-bold uppercase tracking-widest">
           <span>&copy; 2026 JABATAN SAINS SOSIAL IPGKT</span>
           <span>KEMENTERIAN PENDIDIKAN MALAYSIA</span>
        </div>
      </footer>

      <AnimatePresence>
        {selectedStaff && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStaff(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl overflow-hidden rounded-[40px] flex flex-col md:flex-row shadow-2xl" style={{ backgroundColor: theme.bgPrimary }}>
              <button onClick={() => setSelectedStaff(null)} className="absolute top-8 right-8 z-20 p-2 rounded-full bg-red-500 text-white"><X size={20} /></button>
              <div className="md:w-1/2 h-80 md:h-auto"><img src={selectedStaff.image} className="w-full h-full object-cover" /></div>
              <div className="md:w-1/2 p-12">
                <span className="text-[#EE2A24] font-mono font-bold text-xs uppercase tracking-[0.3em] mb-4 block">{selectedStaff.field}</span>
                <h3 className="text-3xl font-heading font-bold uppercase mt-4 mb-2">{selectedStaff.name}</h3>
                <p className="opacity-40 mb-8 border-b pb-4 uppercase tracking-widest text-[10px]" style={{ borderColor: theme.border }}>{selectedStaff.position}</p>
                <p className="text-lg leading-relaxed opacity-80">{selectedStaff.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;