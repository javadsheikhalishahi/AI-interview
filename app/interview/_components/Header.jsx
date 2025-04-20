import Image from "next/image"

function Header() {
  return (
    <div className="sticky top-0 w-full p-1 items-center shadow-lg glassmorphism z-50">
     <Image src={'/Logo.png'} alt="LogoInterview" width={200} height={100} className="w-[60px] ml-7 scale-200 animate-fadeIn" priority/>
    </div>
  )
}

export default Header
