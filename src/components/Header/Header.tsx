import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import retroSound from '../../music/retroMenu-.mp3'
import { useRef } from 'react'

interface HeaderProps {
  toggleMute: () => void
  isMuted: boolean
}

const Header = ({ toggleMute, isMuted }: HeaderProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const audioRef = useRef(new Audio(retroSound))
  
  const playHoverSound = () => {
    audioRef.current.currentTime = 0
    audioRef.current.volume = 0.2
    audioRef.current.play()
  }

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-center p-5 bg-black bg-opacity-45 z-50">
      <div className="w-[50%] text-white font-bold">Levan Chargeishvili</div>
      <div className="w-[20%] flex text-white gap-5 items-center">
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
          {isMuted ? 
            <HiVolumeOff size={24} /> : 
            <HiVolumeUp size={24} />
          }
        </div>
      </div>
    </header>
  )
}

export default Header