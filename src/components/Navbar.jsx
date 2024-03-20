import React from "react";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom
import { IoHomeOutline } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";;
import { MdOutlineContactSupport } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import btglogoA from "../assets/btglogoA.png";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  // const [click, setClick] = React.useState(false);

  // const handleClick = () => {
  // setClick(!click);
  // };

    return (
        <nav className="bg-teal-900 text-input-section">
        <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-5 py-2">
            <div className="flex items-center flex-1">
            <img src={btglogoA} alt="Logo" className="w-30 h-8 navbar-logo" />
            </div>
            <div className="lg:flex md:flex flex-1 items center justify-end font-normal hidden">
            <div className="flex-10">
                <ul className="flex gap-8 mr-16 text-[18px] font-custom">
                {/* ใช้ Link จาก react-router-dom เพื่อสร้างการเชื่อมโยงไปยังเส้นทางที่คุณต้องการ */}
                <Link to="/">
                    <IoHomeOutline className="inline-block mr-1" />
                    Home
                </Link>
                {/* <Link to="/test"><MdManageHistory className="inline-block mr-1" />Test</Link> */}
                                        {/* <Link to="/tutorial"><IoDocumentsOutline className="inline-block mr-1" />Tutorial</Link>
                                        <Link to="/faq"><MdOutlineContactSupport className="inline-block mr-1" />FAQ</Link> */}
                <Link to="/login">
                    <FaRegUserCircle className="inline-block mr-1" />
                    Sing in
                </Link>
                </ul>
            </div>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
