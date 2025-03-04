import Header from "./components/Header/Header"
import { useRef, useEffect, useState } from 'react'
import music from './music/Rain_on_Brick.mp3'
import retroSound from './music/retroMenu-.mp3'
import eccomerce from './assets/Ecommerce.png'
import glamoura from './assets/Glamoura.png'
import recruiter from './assets/Recruiter.png'
import certificate from './assets/ლევან ჩარგეიშვილი_Certificate.pdf'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import photogallery from './assets/photogallery.png'

gsap.registerPlugin(ScrollTrigger)
const App = () => {
  const [showContent, setShowContent] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showMusicName, setShowMusicName] = useState(false)
  const [musicNameClass, setMusicNameClass] = useState('')

  const playHoverSound = () => {
    const hoverSound = new Audio(retroSound)
    hoverSound.volume = 0.2
    hoverSound.play()
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
  
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStart = () => {
    setShowContent(true)
    setShowMusicName(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play()
    }
    
    setTimeout(() => {
      setMusicNameClass('fadeOut')
      setTimeout(() => {
        setShowMusicName(false)
      }, 1000)
    }, 5000)

    setTimeout(() => {
      const refs = [aboutRef, projectsRef, educationRef, contactRef]
      refs.forEach(ref => {
        if (ref.current) {
          ref.current.classList.add('fade-in-section')
        }
      })
    }, 100)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }
  useEffect(() => {
    if (showContent) {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        }
      });

      tl.from('.welcome-text', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.out"
      });
      // About section - clean, modern reveal
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top center+=100',
        onEnter: () => {
          gsap.from('#about .content', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            clearProps: "all"
          });
        },
        once: true
      });

      // Education - smooth scale reveal
      ScrollTrigger.create({
        trigger: '#education',
        start: 'top center+=100',
        onEnter: () => {
          gsap.from('#education h2', {
            y: 30,
            opacity: 0,
            duration: 0.8
          });
          gsap.from('.education-card', {
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          });
        },
        once: true
      });

      // Keeping your favorite Skills section animation
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top center+=100',
        onEnter: () => {
          gsap.from('#contact h2', {
            scale: 2,
            opacity: 0,
            duration: 0.8
          });
          gsap.from('.skill-category', {
            opacity: 0,
            scale: 0.5,
            rotation: -15,
            y: 100,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)'
          });
          gsap.from('.skill-category li', {
            opacity: 0,
            x: -50,
            duration: 0.5,
            stagger: 0.05,
            delay: 0.5
          });
        },
        once: true
      });

      const isMobile = window.innerWidth <= 768;

if (isMobile) {
  ScrollTrigger.batch('#projects .project-card', {
    start: 'top bottom-=100px',
    onEnter: batch => gsap.to(batch, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }),
    once: true
  });

  gsap.set('#projects .project-card', {
    y: 50,
    opacity: 0
  });
} else {
  ScrollTrigger.batch('#projects .project-card', {
    start: 'top bottom-=100px',
    onEnter: batch => gsap.to(batch, {
      xPercent: 0,
      opacity: 1,
      rotationZ: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power4.out"
    }),
    once: true
  });

  gsap.set('#projects .project-card', {
    xPercent: 100,
    opacity: 0,
    rotationZ: 10
  });
}



      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [showContent]);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-section');
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '50px'
      }
    );
  
    const refs = [aboutRef, projectsRef, educationRef, contactRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
  
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;
      if (shouldShow !== showScrollTop) {
        setShowScrollTop(shouldShow);
      }
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollTop]);

  return (
    <>
      <div className="rain"></div>
      <div className="rain"></div>
      <div className="rain"></div>
      <div className="rain"></div>
      <div className="rain"></div>
      <div className="rain"></div>
      <div className="rain"></div>
      <div className="rain"></div>
      <div className="rain"></div>
      <div className="rain"></div>
      
      <Header toggleMute={toggleMute} isMuted={isMuted} />
      <audio ref={audioRef} loop>
        <source src={music} type="audio/mp3" />
      </audio>
      
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#9333ea',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid #c084fc',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 50
          }}
        >
          ↑
        </button>
      )}

      {!showContent ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}>
          <button 
            onClick={handleStart}
            onMouseEnter={playHoverSound}
            style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              backgroundColor: '#9333ea',
              color: 'white',
              border: '3px solid #c084fc',
              borderRadius: '0px',
              boxShadow: '4px 4px 0 #c084fc',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              position: 'relative',
              textShadow: '2px 2px #581c87'
            }}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col w-full">
          <section 
  className="min-h-screen flex items-center justify-center"
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center'
  }}
>
<section className="min-h-screen flex items-center justify-center">
      <div className="welcome-text" style={{
        fontSize: '2.5rem',
        color: 'white',
        lineHeight: '1.8',
        textShadow: '3px 3px #581c87'
      }}>
        Welcome to my portfolio!<br />
        Scroll to see my projects and skills
      </div>
    </section>
  {showMusicName && (
    <div 
      className={`music-notification ${musicNameClass}`}
      style={{
        position: 'fixed',
        top: '80px',
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
        padding: '10px 20px',
        borderRadius: '0px',
        color: 'white',
        border: '2px solid #c084fc',
        textShadow: '1px 1px #581c87',
        zIndex: 50
      }}
    >
      Now Playing: Rain ON Brick - Bill Killey
    </div>
  )}
</section>

<section id="about" ref={aboutRef} className="min-h-screen flex items-center justify-center hidden-section">
  <div className="text-white text-center max-w-7xl w-full px-8 content">
    <h2 className="text-4xl sm:text-5xl mb-8 sm:mb-12 text-purple-400">About Me</h2>
    <p className="text-lg sm:text-2xl">Web Developer based in Tbilisi, Georgia</p>
    <h2 className="text-4xl sm:text-5xl mb-8 sm:mb-12 text-purple-400 mt-7">Contact</h2>
    <p className="text-lg sm:text-2xl mt-8 break-words">Contact: +995 592 44 90 49 | chargeishvililevani@gmail.com</p>
  </div>
</section>

<section id="projects" ref={projectsRef} className="min-h-screen flex items-center justify-center hidden-section py-20">
  <div className="text-white max-w-7xl w-full px-8">
    <h2 className="text-5xl mb-16 text-purple-400 text-center">Projects</h2>
    <div className="flex flex-col gap-16">
      {/* Ecommerce Project */}
      <div 
  className="project-card flex flex-col md:flex-row items-center gap-8 p-8 bg-purple-900/30 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
  style={{
    perspective: "1000px",
    transformStyle: "preserve-3d"
  }}
  onMouseMove={(e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }}
>
  <div className="w-full md:w-1/2">
    <img 
      src={photogallery} 
      alt="Photo Gallery Website" 
      className="rounded-lg w-full shadow-lg" 
    />
  </div>
  <div className="w-full md:w-1/2 text-left">
    <h3 className="text-3xl mb-4">Photo Gallery Website</h3>
    <p className="text-xl mb-6">Built a dynamic photo gallery platform using React, TypeScript, and the Unsplash API. Features include infinite scroll functionality, real-time search with history tracking, responsive image grid layout, and an optimized caching system for improved performance.</p>
    <a 
      href="https://sweeft-react-project.vercel.app/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
    >
      View Project
    </a>
  </div>
</div>
      <div 
        className="project-card flex flex-col md:flex-row items-center gap-8 p-8 bg-purple-900/30 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }}
      >
        <div className="w-full md:w-1/2">
          <img 
            src={eccomerce} 
            alt="Ecommerce Website" 
            className="rounded-lg w-full shadow-lg" 
          />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h3 className="text-3xl mb-4">Ecommerce Website</h3>
          <p className="text-xl mb-6">Developed a platform with Firebase authentication, secure billing management, and add-to-cart functionality. Built with React, TypeScript, and Firebase.</p>
          <a 
            href="https://products-app-front.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
          >
            View Project
          </a>
        </div>
      </div>

      {/* Recruiter Project */}
      <div 
        className="project-card flex flex-col md:flex-row items-center gap-8 p-8 bg-purple-900/30 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }}
      >
        <div className="w-full md:w-1/2">
          <img 
            src={recruiter} 
            alt="Recruitment Platform" 
            className="rounded-lg w-full shadow-lg" 
          />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h3 className="text-3xl mb-4">Recruitment Platform</h3>
          <p className="text-xl mb-6">Developed a recruitment platform with job posting and application features. Built with React, TypeScript for the front-end, and NestJS for the back-end.</p>
          <a 
            href="https://jobs-website-nine.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
          >
            View Project
          </a>
        </div>
      </div>

      {/* Glamoura Project */}
      <div 
        className="project-card flex flex-col md:flex-row items-center gap-8 p-8 bg-purple-900/30 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }}
      >
        <div className="w-full md:w-1/2">
          <img 
            src={glamoura} 
            alt="Profile Rating Website" 
            className="rounded-lg w-full shadow-lg" 
          />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h3 className="text-3xl mb-4">Profile Rating Website</h3>
          <p className="text-xl mb-6">Created a points-based ranking system with user profiles, admin panel, and leaderboards. Implemented user authorization and password recovery using Firebase.</p>
          <a 
            href="https://aura-website-beta.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
    <br /><br /><br />
  </div>
</section>

    <section id="education" ref={educationRef} className="min-h-screen flex items-center justify-center hidden-section">
  <div className="text-white text-center max-w-6xl w-full px-8">
    <h2 className="text-5xl mb-12 text-purple-400">Education</h2>
    <div className="space-y-16">
      <div className="education-card">
        <h3 className="text-3xl mb-4">University of Business and Technology</h3>
        <p className="text-xl">Computer Science | 2023-2027</p>
      </div>
      <div className="education-card">
  <h3 className="text-3xl mb-4">Re: Educate</h3>
  <p className="text-xl">Web Development | 2023-2024 (Finished)</p>
  <a 
    href={certificate}
    download
    className="inline-block mt-4 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all text-white"
    onMouseEnter={playHoverSound}
  >
    Click here to download certificate
  </a>
</div>
    </div>
  </div>
</section>

          <section id="contact" ref={contactRef} className="min-h-screen flex items-center justify-center hidden-section">
      <div className="text-white text-center max-w-6xl w-full px-8">
        <h2 className="text-5xl mb-12 text-purple-400">Skills</h2>
        <div className="grid grid-cols-2 gap-16 text-left">
          <div className="skill-category">
            <h3 className="text-3xl mb-6 text-purple-300">Programming Languages</h3>
            <ul className="list-disc list-inside text-xl space-y-2">
              <li>Javascript</li>
              <li>Typescript</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3 className="text-3xl mb-6 text-purple-300">Frameworks</h3>
            <ul className="list-disc list-inside text-xl space-y-2">
              <li>React.js (Advanced)</li>
              <li>Next.js (Advanced)</li>
              <li>Express.js (Intermediate)</li>
              <li>Node.js (Intermediate)</li>
              <li>Nest.js (Intermediate)</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3 className="text-3xl mb-6 text-purple-300">Markup</h3>
            <ul className="list-disc list-inside text-xl space-y-2">
              <li>HTML&CSS</li>
              <li>Tailwind CSS</li>
              <li>Styled Components</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3 className="text-3xl mb-6 text-purple-300">Tools & Services</h3>
            <ul className="list-disc list-inside text-xl space-y-2">
              <li>Git & Github</li>
              <li>MongoDB</li>
              <li>Postman</li>
              <li>Firebase</li>
              <li>REST API</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
        </div>
      )}
    </>
  )
}

export default App