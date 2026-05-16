import React, { useEffect, useRef, useState } from 'react'

function App() {
  const mainCursorRef = useRef(null);
  const trailingCursorRef = useRef(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const isHoveringLinkRef = useRef(false);

  useEffect(() => {
    // Zero-lag buttery smooth cursor coordinates
    const moveCursor = (e) => {
      if (mainCursorRef.current) {
        // Adjust coordinate center: if hand pointer, align the fingertip (-12, -2). If dot, align center (-4, -4).
        const offsetX = isHoveringLinkRef.current ? -12 : -4;
        const offsetY = isHoveringLinkRef.current ? -2 : -4;
        mainCursorRef.current.style.transform = `translate3d(${e.clientX + offsetX}px, ${e.clientY + offsetY}px, 0)`;
      }
      if (trailingCursorRef.current) {
        trailingCursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };

    // Detect ONLY actual links or buttons for the Hand icon
    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        setIsHoveringLink(true);
        isHoveringLinkRef.current = true;
      } else {
        setIsHoveringLink(false);
        isHoveringLinkRef.current = false;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-white font-mono flex flex-col items-center p-4 md:p-8 overflow-x-hidden relative cursor-none">
      
      {/* --- ADVANCED CUSTOM NEON CURSOR --- */}
      
      {/* Main Cursor (Switches between Green Dot and Neon Cyan Hand) */}
      <div 
        ref={mainCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center transition-transform duration-100"
      >
        {isHoveringLink ? (
          // Custom Neon Cyan Hand Pointer SVG (Only for links/buttons)
          <svg fill="#00ffff" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
            <path d="M18.8 12.3v.4c0 3.7-3 6.7-6.7 6.7H10c-3 0-5.6-2.2-6.5-5.1l-.8-2.6c-.2-.6 0-1.2.4-1.6.4-.4 1-.5 1.5-.3l2.8.9V3.8c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v6H12c.1 0 .2-.1.2-.2v-2.3c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v2.4c0 .1.1.2.2.2s.2-.1.2-.2v-1.1c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v1.2c0 .1.1.2.2.2s.2-.1.2-.2V7.7c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v4.6z" stroke="#ffffff" strokeWidth="0.5"/>
          </svg>
        ) : (
          // Default Green Dot
          <div className="w-2 h-2 bg-hackerGreen rounded-full shadow-[0_0_5px_rgba(0,255,0,0.8)]"></div>
        )}
      </div>

      {/* Trailing Circle */}
      <div 
        ref={trailingCursorRef}
        className={`fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-50 hidden md:block transition-all duration-150 ease-out ${isHoveringLink ? 'scale-[1.8] border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.6)]' : 'scale-100 border-hackerGreen shadow-[0_0_10px_rgba(0,255,0,0.5)]'}`}
      ></div>

      {/* --- HERO SECTION --- */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center w-full max-w-4xl border-b border-gray-800">
        <h1 className="text-4xl md:text-6xl font-bold text-hackerGreen mb-4 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          &gt; Krishna Prajapat_
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
          Full-Stack (MERN) Developer & Application Security Enthusiast. 
          I don't just write code; I break it, patch it, and make it bulletproof.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#projects" className="border border-hackerGreen text-hackerGreen px-6 py-2 hover:bg-hackerGreen hover:text-black transition-all duration-300 font-bold tracking-widest cursor-none">
            VIEW_PROJECTS
          </a>
          <a href="#contact" className="border border-gray-500 text-gray-300 px-6 py-2 hover:border-white hover:text-white transition-all duration-300 font-bold tracking-widest cursor-none">
            CONTACT_ME
          </a>
        </div>
      </div>

      {/* --- ABOUT & SKILLS SECTION --- */}
      <div className="w-full max-w-6xl py-16 border-b border-gray-800 mx-auto">
        <h2 className="text-3xl font-bold text-hackerGreen mb-8 border-l-4 border-hackerGreen pl-4">
          ./Skills_And_Arsenal
        </h2>
        {/* FIX: grid items will stretch to be equal height by default, added h-full to cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-6 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-hackerGreen mr-2">[*]</span> Offensive Sec
            </h3>
            {/* FIX: flex-1 pushes the bottom text down, making equal spacing */}
            <ul className="flex-1 flex flex-wrap gap-2 text-gray-300 text-xs content-start">
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Kali Linux Environment</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Web App Pen Testing (OWASP)</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Secure Auth (JWT/RBAC)</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Burp Suite & Metasploit</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Exploiting Metasploitable</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">nmap & Zenmap</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Wifi Scanning</li>
            </ul>
            <div className="text-hackerGreen font-bold mt-6 w-full text-center pt-3 border-t border-gray-800">
              &gt; 43 PortSwigger Labs Solved
            </div>
          </div>

          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-6 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-hackerGreen mr-2">[*]</span> MERN Stack
            </h3>
            <ul className="flex-1 flex flex-wrap gap-2 text-gray-300 text-xs content-start">
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">MongoDB (Strict Schemas)</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Express.js & Node.js</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">React.js Architecture</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">WebRTC & Socket.io</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Brevo API (OTP & Emails)</li>
            </ul>
            <div className="text-hackerGreen font-bold mt-6 w-full text-center pt-3 border-t border-gray-800">
              &gt; Built Real-Time Systems
            </div>
          </div>

          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-6 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-hackerGreen mr-2">[*]</span> Cloud & DevOps
            </h3>
            <ul className="flex-1 flex flex-wrap gap-2 text-gray-300 text-xs content-start">
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Redis Cloud (Caching)</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Git & GitHub (Version Control)</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Docker Containerization</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Vercel Hosting</li>
              <li className="h-fit hover-glow border border-gray-700 bg-black px-2 py-1.5 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Render & Netlify</li>
            </ul>
            <div className="text-hackerGreen font-bold mt-6 w-full text-center pt-3 border-t border-gray-800">
              &gt; CI/CD Pipelines
            </div>
          </div>
        </div>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <div id="projects" className="w-full max-w-5xl py-16 border-b border-gray-800 mx-auto">
        <h2 className="text-3xl font-bold text-hackerGreen mb-8 border-l-4 border-hackerGreen pl-4">
          ./Executed_Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-6 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-xl font-bold text-white mb-2">1. AVCP (Virtual Classroom)</h3>
            <p className="flex-1 text-gray-400 mb-4 text-sm">Advanced Virtual Classroom Platform with WebRTC, Socket.io, and strict JWT/RBAC security.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">MERN</span>
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">WebRTC</span>
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Socket.io</span>
            </div>
            <a href="https://avcp.vercel.app/" target="_blank" rel="noreferrer" className="mt-auto text-hackerGreen hover:text-[#00ffff] hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all duration-300 text-sm font-bold cursor-none inline-block w-fit">[ Live_Demo ]</a>
          </div>
          
          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-6 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-xl font-bold text-white mb-2">2. Workout Buddy</h3>
            <p className="flex-1 text-gray-400 mb-4 text-sm">A full-stack fitness tracking application with secure user authentication and database management.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">MERN</span>
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">MongoDB</span>
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">UserAuth</span>
            </div>
            <a href="https://mern-project-workout-budddy.vercel.app/" target="_blank" rel="noreferrer" className="mt-auto text-hackerGreen hover:text-[#00ffff] hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all duration-300 text-sm font-bold cursor-none inline-block w-fit">[ Live_Demo ]</a>
          </div>

          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-6 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-xl font-bold text-white mb-2">3. Laundry Service</h3>
            <p className="flex-1 text-gray-400 mb-4 text-sm">A clean, responsive web application interface designed for managing laundry service bookings.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">HTML/CSS</span>
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">JavaScript</span>
            </div>
            <a href="https://laundryservice-webapp-tutedude4.netlify.app/" target="_blank" rel="noreferrer" className="mt-auto text-hackerGreen hover:text-[#00ffff] hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all duration-300 text-sm font-bold cursor-none inline-block w-fit">[ Live_Demo ]</a>
          </div>

          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-6 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-xl font-bold text-white mb-2">4. OmniFood</h3>
            <p className="flex-1 text-gray-400 mb-4 text-sm">A modern, responsive landing page for an AI-driven food delivery startup.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Frontend</span>
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">UI/UX</span>
            </div>
            <a href="https://krishna-omnifood-restaurent.netlify.app" target="_blank" rel="noreferrer" className="mt-auto text-hackerGreen hover:text-[#00ffff] hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all duration-300 text-sm font-bold cursor-none inline-block w-fit">[ Live_Demo ]</a>
          </div>

          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-6 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-xl font-bold text-white mb-2">5. Bella Vista</h3>
            <p className="flex-1 text-gray-400 mb-4 text-sm">A visually appealing frontend interface showcasing a premium restaurant menu and ambiance.</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Frontend</span>
              <span className="hover-glow h-fit text-xs border border-gray-600 bg-black px-2 py-1.5 text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-none flex items-center">Design</span>
            </div>
            <a href="https://bellavistarestaurant-krishna.netlify.app" target="_blank" rel="noreferrer" className="mt-auto text-hackerGreen hover:text-[#00ffff] hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all duration-300 text-sm font-bold cursor-none inline-block w-fit">[ Live_Demo ]</a>
          </div>
        </div>
      </div>

      {/* --- CERTIFICATIONS SECTION --- */}
      <div className="w-full max-w-5xl py-16 mx-auto">
        <h2 className="text-3xl font-bold text-hackerGreen mb-8 border-l-4 border-hackerGreen pl-4">
          ./Security_Clearances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-5 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-lg font-bold text-white mb-1">Ethical Hacking</h3>
            <p className="flex-1 text-gray-400 text-sm mb-3">Tutedude</p>
            <a href="https://upskill.tutedude.com/certificate/TD-KRIS-EH-0728" target="_blank" rel="noreferrer" className="text-hackerGreen hover:text-[#00ffff] hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all duration-300 text-sm font-bold block mt-auto cursor-none w-fit">
              [ Verify_Credential ]
            </a>
          </div>
          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-5 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-lg font-bold text-white mb-1">Programming Basics</h3>
            <p className="flex-1 text-gray-400 text-sm mb-3">Great Learning Academy</p>
            <a href="https://www.mygreatlearning.com/certificate/POAFGXXV" target="_blank" rel="noreferrer" className="text-hackerGreen hover:text-[#00ffff] hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all duration-300 text-sm font-bold block mt-auto cursor-none w-fit">
              [ Verify_Credential ]
            </a>
          </div>
          <div className="h-full flex flex-col bg-darkerBg border border-gray-800 p-5 rounded hover:border-hackerGreen transition-all duration-300 cursor-none">
            <h3 className="text-lg font-bold text-white mb-1">Google Analytics</h3>
            <p className="flex-1 text-gray-400 text-sm mb-3">Great Learning Academy</p>
            <a href="https://www.mygreatlearning.com/certificate/OFYRQEAY" target="_blank" rel="noreferrer" className="text-hackerGreen hover:text-[#00ffff] hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)] transition-all duration-300 text-sm font-bold block mt-auto cursor-none w-fit">
              [ Verify_Credential ]
            </a>
          </div>
        </div>
      </div>

      {/* --- CONTACT & FOOTER SECTION --- */}
      <div id="contact" className="w-full max-w-4xl py-12 border-t border-gray-800 mt-8 text-center mx-auto cursor-none">
        <h2 className="text-2xl font-bold text-hackerGreen mb-6 drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">
          ./Initiate_Connection
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          System is listening for incoming transmissions. Whether it's a job opportunity, a bug bounty, or just tech talk, feel free to drop a ping.
        </p>
        
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          <a href="https://github.com/Krishna4596" target="_blank" rel="noreferrer" className="border border-gray-700 text-white bg-darkerBg px-6 py-2 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all duration-300 font-bold tracking-widest cursor-none text-sm">
            [ GitHub ]
          </a>
          <a href="https://www.linkedin.com/in/krishna-prajapat-474089338/" target="_blank" rel="noreferrer" className="border border-gray-700 text-white bg-darkerBg px-6 py-2 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all duration-300 font-bold tracking-widest cursor-none text-sm">
            [ LinkedIn ]
          </a>
          <a href="mailto:krishprajapat9977@gmail.com" className="border border-gray-700 text-white bg-darkerBg px-6 py-2 hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all duration-300 font-bold tracking-widest cursor-none text-sm">
            [ Email ]
          </a>
        </div>
        
        <div className="text-xs font-mono text-left inline-block bg-darkerBg p-5 border border-gray-800 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] cursor-none">
          <p className="text-hackerGreen">&gt; root@krishna:~$ exit</p>
          <p className="text-hackerGreen">&gt; logout</p>
          <p className="mt-3 text-gray-500">Connection closed.</p>
          <p className="text-gray-600">Power status: <span className="text-[#00ffff] font-bold drop-shadow-[0_0_3px_rgba(0,255,255,0.8)]">[ OK ]</span></p>
          <p className="mt-4 text-gray-700 border-t border-gray-800 pt-3 text-center">© 2026 Krishna Prajapat. All systems secure.</p>
        </div>
      </div>

    </div>
  )
}

export default App