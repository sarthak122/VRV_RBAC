import { Link, NavLink } from "react-router-dom"
import { CiLock } from 'react-icons/ci';

export const Header= () => {
    return (
        <>
        <header className="md:border-b-2 mx-4">
            <nav className="max-w-[1320px] lg:mx-auto flex items-center justify-between py-5">
        <div>
          <p className="text-3xl md:text-4xl cursor-pointer hover:scale-95">
            <span className="text-primaryGreen">R</span>
            <span className="text-[#ffa337]">BAC</span>
          </p>
        </div>
        <div className="hidden md:flex">
          <div className="items-center space-x-12 flex">
            <ul className="flex gap-2 lg:gap-8 text-base text-primaryGray font-medium ">
              {/* {NavLinks.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-#365CCE hover:underline first:text-#365CCE"
                >
                  {item}
                </li>
              ))} */}
            </ul>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-2 lg:gap-6 ">
            <div className="flex items-center gap-2 font-medium hover:text-#365CCE cursor-pointer hover:underline">
              <CiLock className="text-2xl" />
              <NavLink to="/login" className="text-primaryGray hover:text-#365CCE">Login</NavLink>
            </div>
            <NavLink to="/signup">
            <div className="bg-[#20b486] max-w-[180px] text-center text-white px-2 lg:px-6 py-3 font-medium rounded-lg cursor-pointer hover:bg-[#76ceb2]">
                Sign up for Free
      
    </div>
            </NavLink>
            
          </div>
        </div>
        {/* <div className="md:hidden block cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? (
            <img src={'/assets/edtech/close_menu.svg'} alt="close menu" />
          ) : (
            <img src={'/assets/edtech/open_menu.svg'} alt="close menu" />
          )}
        </div>
        {isMenuOpen && (
          <ul
            className="flex flex-col bg-#365CCE text-white gap-6 text-[16px] font-normal items-center mt-10 py-5 md:hidden
                   z-50 absolute top-7 left-0 w-full transition duration-1000 ease-in-out"
          >
            <div className="space-y-2">
              {NavLinks.map((item, index) => (
                <p key={index} className="cursor-pointer  hover:underline">
                  {item}
                </p>
              ))}
            </div>
            <div className="flex flex-col text-white items-center gap-2 lg:gap-6 ">
              <div className="flex items-center gap-2 font-medium cursor-pointer hover:underline">
                <CiLock className="text-2xl" />
                <p>Login</p>
              </div>
              <div className="border-2 border-white text-white px-2 lg:px-6 py-3 font-medium rounded-lg cursor-pointer hover:underline">
                Sign up for Free
              </div>
            </div>
          </ul>
        )} */}
      </nav>
    </header>
        </>
    )
}