import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-gray-300 pt-24 pb-14 px-6 overflow-hidden isolate">
      {/* Glowing Ambient Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] top-[-100px] left-[-100px] bg-gradient-to-br from-cyan-500/30 to-purple-600/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bottom-[-100px] right-[-100px] bg-gradient-to-tr from-pink-500/20 to-yellow-300/20 blur-[100px] rounded-full animate-ping" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-[0.04]" />
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 lg:px-0 relative z-10">
        {/* Contact Info */}
        <div className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] duration-500">
          <h3 className="text-2xl font-bold text-white mb-3 tracking-widest">FARMIO</h3>
          <p className="text-sm leading-relaxed">Village-Jashara Post Sachui District Mau</p>
          <p className="text-sm">Email: ag0567688@gmail.com</p>
          <p className="text-sm">Phone: +91 9560472926</p>
        </div>

        {/* Navigation */}
        <div className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:scale-[1.03] duration-500">
          <h4 className="text-xl font-semibold text-cyan-300 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Products", "Contact", "Login"].map((text, i) => (
              <li key={i} className="relative group">
                <Link to={text === "Home" ? "/" : `/${text.toLowerCase()}`} className="hover:text-cyan-400 transition-all duration-300">
                  {text}
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-500"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:scale-[1.03] duration-500">
          <h4 className="text-xl font-semibold text-pink-400 mb-3">Follow Us</h4>
          <div className="flex gap-6 text-2xl">
            {[{
              href: "https://instagram.com/gupta_aman_9161",
              icon: <FaInstagram />,
              color: "text-pink-500"
            }, {
              href: "https://www.linkedin.com/in/amangupta9454",
              icon: <FaLinkedin />,
              color: "text-blue-400"
            }, {
              href: "https://github.com/amangupta9454",
              icon: <FaGithub />,
              color: "text-white"
            }, {
              href: "https://wa.me/919560472926",
              icon: <FaWhatsapp />,
              color: "text-green-400"
            }].map(({ href, icon, color }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className={`group relative hover:scale-125 transform transition-all duration-300 ${color}`}>
                {icon}
                <span className="absolute -inset-2 bg-current opacity-10 blur-lg rounded-full -z-10" />
              </a>
            ))}
          </div>
        </div>

        {/* Farmer CTA */}
        <div className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:scale-[1.03] duration-500">
          <h4 className="text-xl font-semibold text-green-400 mb-3">For Farmers</h4>
          <p className="text-sm mb-4">Join our network to sell your produce directly to customers and get real-time market prices.</p>
          <button onClick={scrollToTop}
            className="group relative inline-flex items-center px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
            <FaArrowUp className="mr-2 group-hover:animate-bounce" />
            Back to Top
            <span className="absolute -inset-1.5 rounded-full bg-cyan-400 blur-[12px] opacity-30 group-hover:opacity-50 transition-all duration-300 -z-10"></span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="my-14 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 rounded-full" />

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="text-white font-semibold">FARMIO</span>. All rights reserved.
      </div>

      {/* Developer Credits */}
      <div className="mt-3 text-center text-sm">
        <a href="https://www.linkedin.com/in/amangupta9454" target="_blank" rel="noopener noreferrer"
          className="text-cyan-300 hover:underline transition">
          Created by <span className="font-semibold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-[shine_12s_linear_infinite]">Code Veda</span>
        </a>
      </div>

      {/* Custom Tailwind Keyframes */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% }
          100% { background-position: 200% }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
