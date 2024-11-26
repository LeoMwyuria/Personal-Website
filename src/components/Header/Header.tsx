import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { RiMenu3Line } from 'react-icons/ri'
import retroSound from '../../music/retroMenu-.mp3'
import { useRef, useState } from 'react'

interface HeaderProps {
  toggleMute: () => void
  isMuted: boolean
}

const Header = ({ toggleMute, isMuted }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const audioRef = useRef(new Audio(retroSound))
  
  const playHoverSound = () => {
    audioRef.current.currentTime = 0
    audioRef.current.volume = 0.2
    audioRef.current.play()
  }

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between p-5 bg-black bg-opacity-45 z-50 w-full max-w-[100vw]">
      <div className="text-white font-bold text-xl md:text-2xl">Levan Chargeishvili</div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2"
        >
          <RiMenu3Line size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-full left-0 right-0 flex-col bg-black bg-opacity-90 py-4 max-h-[80vh] overflow-y-auto`}>
        <div 
          onMouseEnter={playHoverSound}
          onClick={() => scrollToSection('about')} 
          className="text-white hover:text-purple-500 cursor-pointer py-3 px-5"
        >
          About
        </div>
        <div 
          onMouseEnter={playHoverSound}
          onClick={() => scrollToSection('projects')} 
          className="text-white hover:text-purple-500 cursor-pointer py-3 px-5"
        >
          Projects
        </div>
        <div 
          onMouseEnter={playHoverSound}
          onClick={() => scrollToSection('education')} 
          className="text-white hover:text-purple-500 cursor-pointer py-3 px-5"
        >
          Education
        </div>
        <div 
          onMouseEnter={playHoverSound}
          onClick={() => scrollToSection('contact')} 
          className="text-white hover:text-purple-500 cursor-pointer py-3 px-5"
        >
          Skills
        </div>
        <div 
          onClick={toggleMute} 
          className="text-white hover:text-purple-500 cursor-pointer py-3 px-5"
        >
          {isMuted ? <HiVolumeOff size={24} /> : <HiVolumeUp size={24} />}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex text-white gap-5 items-center">
        <div 
          onMouseEnter={playHoverSound}
          onClick={() => scrollToSection('about')} 
          className="hover:text-purple-500 cursor-pointer"
        >
          About
        </div>
        <div 
          onMouseEnter={playHoverSound}
          onClick={() => scrollToSection('projects')} 
          className="hover:text-purple-500 cursor-pointer"
        >
          Projects
        </div>
        <div 
          onMouseEnter={playHoverSound}
          onClick={() => scrollToSection('education')} 
          className="hover:text-purple-500 cursor-pointer"
        >
          Education
        </div>
        <div 
          onMouseEnter={playHoverSound}
          onClick={() => scrollToSection('contact')} 
          className="hover:text-purple-500 cursor-pointer"
        >
          Skills
        </div>
        <div 
          onClick={toggleMute} 
          className="hover:text-purple-500 cursor-pointer"
        >
          {isMuted ? <HiVolumeOff size={24} /> : <HiVolumeUp size={24} />}
        </div>
      </div>
    </header>
  )
}

export default Header