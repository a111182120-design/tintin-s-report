import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { 
  Briefcase, 
  Camera, 
  Gamepad2, 
  Heart, 
  Instagram, 
  Mail, 
  Map, 
  MessageCircle, 
  PenSquare, 
  Phone, 
  Save, 
  Sparkles, 
  User, 
  Utensils 
} from 'lucide-react';

// --- Default Data ---
const defaultProfile = {
  name: '星野光 (Hikaru)',
  age: '24',
  gender: '女',
  personality: '充滿活力、喜歡冒險、幽默搞怪',
  health: '極佳！每天睡飽吃好吃滿 🍎',
  avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffdfbf'
};

const experiences = [
  { id: 1, title: '首席歡樂長', company: '快樂無限股份有限公司', duration: '2022 - 至今', desc: '負責讓整間公司的同事每天都笑咪咪，偶爾兼職吃掉辦公室的所有零食。' },
  { id: 2, title: '前端魔法學徒', company: '霍格華茲科技', duration: '2020 - 2022', desc: '用 React 施展網頁魔法，雖然偶爾會出 bug 爆炸，但總是能化險為夷。' },
  { id: 3, title: '校園廣播 DJ', company: '宇宙大學之聲', duration: '2018 - 2020', desc: '用溫暖的聲音陪伴大學生熬夜趕報告的每個夜晚。' },
];

const interests = [
  { id: 1, icon: Map, color: 'bg-blue-100 text-blue-600', title: '背包客旅行', desc: '迷路是旅行的意義，最喜歡沒有計畫的亂走。', image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800' },
  { id: 2, icon: Camera, color: 'bg-fuchsia-100 text-fuchsia-600', title: '底片攝影', desc: '把瞬間變成永恆，享受洗照片的開盲盒感。' },
  { id: 3, icon: Gamepad2, color: 'bg-emerald-100 text-emerald-600', title: '電玩重度成癮', desc: '主要玩任天堂大亂鬥，歡迎來找我單挑。' },
  { id: 4, icon: Utensils, color: 'bg-orange-100 text-orange-600', title: '拉麵鑑賞家', desc: '豚骨派不可逆轉，為了拉麵可以排隊兩小時。' },
];

type FilterType = 'all' | 'experience' | 'interests';

export default function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleCTA = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    // You could also open a modal or scroll to contact here
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden p-8 flex flex-col items-center">
      {/* Hidden blobs to preserve elements */}
      <div className="hidden absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-pink-300 mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="hidden absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-yellow-300 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="hidden absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-indigo-300 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {/* Confetti Effect overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: '100vh', 
                  x: '50vw',
                  scale: 0,
                  rotate: 0 
                }}
                animate={{ 
                  y: `${Math.random() * -100}vh`, 
                  x: `${(Math.random() - 0.5) * 100}vw`,
                  scale: Math.random() * 1.5 + 0.5,
                  rotate: Math.random() * 360 
                }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className={`absolute w-4 h-4 border-2 border-gb-dark ${
                  ['bg-gb-accent', 'bg-white', 'bg-gb-sec-light', 'bg-gb-sec-dark'][Math.floor(Math.random() * 4)]
                }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        
        {/* --- Hero Profile Card --- */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="geometric-card w-full bg-white relative overflow-hidden mb-12 p-8"
        >
          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-6 right-6 px-4 py-2 bg-gb-sec-light font-bold text-gb-dark hover:bg-gb-accent hover:text-white transition-colors border-2 border-gb-dark rounded-none"
          >
            {isEditing ? <Save size={20} /> : <PenSquare size={20} />}
          </motion.button>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="geometric-card-small w-40 h-40 shrink-0 bg-gb-sec-light overflow-hidden"
            >
              <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 w-full text-center md:text-left">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div 
                    key="edit"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-bold text-gb-accent uppercase tracking-tracking-widest">姓名 Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full text-3xl font-black editable-field"
                      />
                    </div>
                    
                    <div className="flex gap-8">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gb-accent uppercase tracking-widest">年齡 Age</label>
                        <input
                          type="text"
                          name="age"
                          value={profile.age}
                          onChange={handleChange}
                          className="w-full text-xl font-bold editable-field"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gb-accent uppercase tracking-widest">性別 Gender</label>
                        <input
                          type="text"
                          name="gender"
                          value={profile.gender}
                          onChange={handleChange}
                          className="w-full text-xl font-bold editable-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gb-accent uppercase tracking-widest">個性 Personality</label>
                      <input
                        type="text"
                        name="personality"
                        value={profile.personality}
                        onChange={handleChange}
                        className="w-full text-xl font-bold editable-field"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gb-accent uppercase tracking-widest">健康狀況 Health</label>
                      <input
                        type="text"
                        name="health"
                        value={profile.health}
                        onChange={handleChange}
                        className="w-full text-xl font-bold editable-field"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gb-dark mb-4">
                      {profile.name}
                    </h1>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase text-gb-accent">年齡 / Age</span>
                        <span className="flex items-center gap-2 font-bold text-2xl text-gb-dark border-b-4 border-transparent">
                          {profile.age}歲
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase text-gb-accent">性別 / Gender</span>
                        <span className="flex items-center gap-2 font-bold text-2xl text-gb-dark border-b-4 border-transparent">
                          {profile.gender}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1 w-full mt-2">
                        <span className="text-xs font-bold uppercase text-gb-accent">個性 / Personality</span>
                        <span className="flex items-center gap-2 font-bold text-xl text-gb-dark border-b-4 border-transparent">
                          {profile.personality}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gb-dark text-[#FFFCF2] p-6 mt-8 font-bold flex items-center gap-4">
                      <div className="text-gb-accent">
                        <Heart size={24} className="fill-current" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-gb-sec-light mb-1">健康狀況 / Health</span>
                        <span className="text-xl">{profile.health}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* --- Interactive CTA Button --- */}
        <div className="flex justify-center -mt-6 relative z-20 mb-12">
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTA}
            className="geometric-card w-full md:w-auto px-12 py-6 bg-gb-sec-dark text-white font-black text-2xl uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-gb-accent transition-colors"
          >
            <MessageCircle size={28} />
            <span>我想認識 (Want to Meet)</span>
          </motion.button>
        </div>

        {/* --- Filters --- */}
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {(['all', 'experience', 'interests'] as const).map((f) => {
            const labels = {
              all: '全部 (All)',
              experience: '資歷 (Seniority)',
              interests: '興趣 (Interests)'
            };
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-pill relative px-6 py-2 rounded-full font-bold uppercase ${
                  filter === f ? 'bg-gb-accent text-white' : 'bg-white text-gb-dark'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {labels[f]}
                </span>
              </button>
            )
          })}
        </div>

        {/* --- Content Area --- */}
        <div className="space-y-12 mb-20 min-h-[400px]">
          
          {/* Experience Section */}
          <AnimatePresence mode="popLayout">
            {(filter === 'all' || filter === 'experience') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gb-dark text-gb-bg geometric-card-small">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-gb-dark uppercase tracking-widest">經歷 Experience</h2>
                </div>
                
                <div className="relative border-l-4 border-gb-dark ml-6 space-y-8 pb-4">
                  {experiences.map((exp, i) => (
                    <motion.div 
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-8"
                    >
                      {/* Timeline dot */}
                      <div className="absolute top-3 -left-[14px] w-6 h-6 bg-gb-accent border-4 border-gb-dark" />
                      
                      <div className="geometric-card-small bg-white p-6 hover:translate-y-[-4px] transition-transform">
                        <span className="text-xs font-bold text-gb-accent border-2 border-gb-dark px-3 py-1 mb-4 inline-block uppercase bg-[#FFFCF2]">
                          {exp.duration}
                        </span>
                        <h3 className="text-xl font-bold text-gb-dark mb-1">{exp.title}</h3>
                        <p className="text-gb-sec-dark font-bold text-sm mb-4 uppercase">{exp.company}</p>
                        <p className="text-gb-dark leading-relaxed font-medium">{exp.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Interests Section */}
          <AnimatePresence mode="popLayout">
            {(filter === 'all' || filter === 'interests') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gb-accent text-white geometric-card-small">
                    <Heart size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-gb-dark uppercase tracking-widest">興趣 Interests</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {interests.map((interest, i) => {
                    const Icon = interest.icon;
                    return (
                      <motion.div
                        key={interest.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="geometric-card-small bg-white p-6 flex flex-col items-start gap-4 hover:translate-y-[-4px] hover:translate-x-[4px] transition-transform"
                      >
                        <div className={`p-4 border-2 border-gb-dark ${interest.id % 2 === 0 ? 'bg-gb-sec-light' : 'bg-[#FFFCF2]'}`}>
                          <Icon size={28} className="text-gb-dark" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gb-dark mb-2 uppercase tracking-wide">{interest.title}</h3>
                          <p className="text-gb-sec-dark text-sm leading-relaxed font-medium">{interest.desc}</p>
                        </div>
                        {interest.image && (
                          <div className="w-full mt-2 border-2 border-gb-dark overflow-hidden aspect-video bg-gb-sec-light">
                            <img src={interest.image} alt={interest.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* --- Footer / Contact --- */}
      <footer id="contact" className="w-full border-t-4 border-gb-dark py-12 mt-12 bg-gb-bg font-bold font-sans text-gb-dark relative z-10 uppercase tracking-widest text-sm">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black text-gb-dark mb-6 tracking-tighter">來聊聊吧！<span className="animate-wave inline-block origin-bottom-right text-gb-dark">👋</span></h2>
            <p className="text-gb-sec-dark mb-8 max-w-sm tracking-normal">
              想要合作、一起打電動、或是揪我去吃拉麵？隨時歡迎聯絡我！
            </p>
            <div className="flex gap-4">
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="p-3 geometric-card-small bg-[#FFFCF2] hover:bg-gb-accent hover:text-white transition-colors">
                <Instagram size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="p-3 geometric-card-small bg-[#FFFCF2] hover:bg-gb-accent hover:text-white transition-colors">
                <MessageCircle size={24} />
              </motion.a>
            </div>
          </div>
          
          <div className="space-y-4">
            <a href="mailto:hello@example.com" className="geometric-card-small group flex flex-col md:flex-row items-center gap-4 text-gb-dark hover:text-white transition-colors p-6 bg-white hover:bg-gb-dark">
              <div className="p-3 bg-gb-sec-light border-2 border-gb-dark group-hover:bg-gb-accent transition-colors">
                <Mail size={24} className="text-gb-dark group-hover:text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="block font-bold text-gb-accent uppercase mb-1">Email</span>
                <span className="font-bold text-lg tracking-normal">hello@example.com</span>
              </div>
            </a>
            
            <a href="tel:+886912345678" className="geometric-card-small group flex flex-col md:flex-row items-center gap-4 text-gb-dark hover:text-white transition-colors p-6 bg-white hover:bg-gb-dark">
              <div className="p-3 bg-gb-sec-light border-2 border-gb-dark group-hover:bg-gb-accent transition-colors">
                <Phone size={24} className="text-gb-dark group-hover:text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="block font-bold text-gb-accent uppercase mb-1">Phone</span>
                <span className="font-bold text-lg tracking-normal">+886 912 345 678</span>
              </div>
            </a>
          </div>
        </div>
      </footer>

      {/* Global CSS for custom simple animations not fully in tailwind */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
        }
      `}</style>
    </div>
  );
}
