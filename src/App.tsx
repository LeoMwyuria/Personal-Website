import Header from "./components/Header/Header"
import { useRef, useEffect, useState } from 'react'
import music from './music/Rain_on_Brick.mp3'
import retroSound from './music/retroMenu-.mp3'

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
      if (window.scrollY > 300) {
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-section')
          }
        })
      },
      { threshold: 0.3 }
    )

    const refs = [aboutRef, projectsRef, educationRef, contactRef]
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

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
        <div className="min-h-screen flex flex-col">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center'
          }}>
            <div 
              style={{
                animation: 'fadeIn 1s ease-in',
                fontSize: '2.5rem',
                color: 'white',
                lineHeight: '1.8',
                textShadow: '3px 3px #581c87'
              }}
            >
              Welcome to my portfolio!<br />
              Scroll to see my projects and skills
            </div>
            {showMusicName && (
              <div 
                className={`music-notification ${musicNameClass}`}
                style={{
                  position: 'fixed',
                  top: '80px',
                  left: '20px',
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
          </div>

          <section 
            id="about"
            ref={aboutRef} 
            className="min-h-screen flex items-center justify-center hidden-section mx-4"
          >
            <div className="text-white text-center max-w-6xl w-full px-8">
              <h2 className="text-5xl mb-12 text-purple-400">About Me</h2>
              <p className="text-2xl">Web Developer based in Tbilisi, Georgia</p>
              <h2 className="text-5xl mb-12 text-purple-400 mt-7">Contact</h2>
              <p className="text-2xl mt-8">Contact: +995 592 44 90 49 | chargeishvililevani@gmail.com</p>
            </div>
          </section>

          <section 
            id="projects"
            ref={projectsRef} 
            className="min-h-screen flex items-center justify-center hidden-section"
          >
            <div className="text-white text-center max-w-6xl w-full px-8">
              <h2 className="text-5xl mb-12 text-purple-400">Projects</h2>
              <div className="space-y-16">
                <div>
                  <h3 className="text-3xl mb-4">Ecommerce Website</h3>
                  <p className="text-xl">Developed a platform with Firebase authentication, secure billing management, and add-to-cart functionality. Built with React, TypeScript, and Firebase.</p>
                </div>
                <div>
                  <h3 className="text-3xl mb-4">Recruitment Platform</h3>
                  <p className="text-xl">Developed a recruitment platform with job posting and application features. Built with React, TypeScript for the front-end, and NestJS for the back-end.</p>
                </div>
                <div>
                  <h3 className="text-3xl mb-4">Profile Rating Website</h3>
                  <p className="text-xl">Created a points-based ranking system with user profiles, admin panel, and leaderboards. Implemented user authorization and password recovery using Firebase. Built with React, TypeScript, Firebase, and Tailwind CSS.</p>
                </div>
              </div>
            </div>
          </section>

          <section 
            id="education"
            ref={educationRef} 
            className="min-h-screen flex items-center justify-center hidden-section"
          >
            <div className="text-white text-center max-w-6xl w-full px-8">
              <h2 className="text-5xl mb-12 text-purple-400">Education</h2>
              <div className="space-y-16">
                <div>
                  <h3 className="text-3xl mb-4">University of Business and Technology</h3>
                  <p className="text-xl">Computer Science | 2023-2027</p>
                </div>
                <div>
                  <h3 className="text-3xl mb-4">Re: Educate – Certificate Link</h3>
                  <p className="text-xl">Web Development | 2023-2024 (Finished)</p>
                </div>
              </div>
            </div>
          </section>

          <section 
            id="contact"
            ref={contactRef} 
            className="min-h-screen flex items-center justify-center hidden-section"
          >
            <div className="text-white text-center max-w-6xl w-full px-8">
              <h2 className="text-5xl mb-12 text-purple-400">Skills</h2>
              <div className="grid grid-cols-2 gap-16 text-left">
                <div>
                  <h3 className="text-3xl mb-6 text-purple-300">Programming Languages</h3>
                  <ul className="list-disc list-inside text-xl space-y-2">
                    <li>Javascript</li>
                    <li>Typescript</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-3xl mb-6 text-purple-300">Frameworks</h3>
                  <ul className="list-disc list-inside text-xl space-y-2">
                    <li>React.js (Advanced)</li>
                    <li>Next.js (Intermediate)</li>
                    <li>Express.js (Basic)</li>
                    <li>Node.js (Basic)</li>
                    <li>Nest.js (Basic)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-3xl mb-6 text-purple-300">Markup</h3>
                  <ul className="list-disc list-inside text-xl space-y-2">
                    <li>HTML&CSS</li>
                    <li>Tailwind CSS</li>
                    <li>Styled Components</li>
                  </ul>
                </div>
                <div>
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