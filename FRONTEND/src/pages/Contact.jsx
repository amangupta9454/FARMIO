const Contact = () => {
  return (
    <div name="contact" className="w-full text-white py-24 bg-gray-900">
      <div className="max-w-screen-lg px-4 mx-auto">
        <div className="mb-6 text-center">
          <p className="text-white font-bold text-4xl underline hover:text-pink-500 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-1s">
            Contact Me
          </p>
        </div>
        <div className="mb-8 text-center animate__animated animate__fadeIn animate__delay-2s">
          <p className="text-xl mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            Feel free to get in touch with me:
          </p>
          <ul className="text-lg mt-4 space-y-3 animate__animated animate__fadeIn animate__delay-2s">
            <li className="animate__animated animate__fadeIn animate__delay-3s">
              Email:{" "}
              <a href="mailto:ag0567688@gmail.com" className="text-green-600 hover:underline hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                ag0567688@gmail.com
              </a>
            </li>
            <li className="animate__animated animate__fadeIn animate__delay-4s">
              Mobile:{" "}
              <a href="tel:+919560472926" className="text-green-600 hover:underline hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                +91 9560472926
              </a>
            </li>
            <li className="animate__animated animate__fadeIn animate__delay-5s">
              WhatsApp:{" "}
              <a href="https://wa.me/919560472926" className="text-green-600 hover:underline hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                +91 9560472926
              </a>
            </li>
          </ul>
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="w-full md:w-1/2 pr-4 md:pr-0">
            <form action="https://getform.io/f/amddkgwb" method="POST"
              className="w-full max-w-md p-6 bg-transparent backdrop-blur-md rounded-xl shadow-2xl relative overflow-hidden transform animate__animated animate__fadeInUp animate__delay-3s"
              style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
              <div className="absolute inset-0 bg-opacity-20 blur-3xl -z-10 animate__animated animate__fadeIn animate__delay-4s"></div>
              {[{ label: "Name", 
                  type: "text", 
                  name: "name", 
                  placeholder: "Your name" },
              { label: "Email", 
                type: "email",
                 name: "email", 
                 placeholder: "Your email" },
              { label: "Mobile Number",
                 type: "tel",
                  name: "mobile",
                   placeholder: "Your mobile number", pattern: "^[7-9][0-9]{9}$",
                    title: "Enter a valid Indian mobile number starting with 7, 8, or 9" }].map(({ label, type, name, placeholder, pattern }) => (
                <div className="mb-6 group animate__animated animate__fadeIn animate__delay-5s" key={name}>
                  <label htmlFor={name} className="block text-lg font-semibold text-gray-200">
                    {label}
                  </label>
                  <input type={type} name={name} id={name} required placeholder={placeholder} pattern={pattern}
                    className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-800 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition-transform duration-300 transform group-hover:scale-105 hover:shadow-lg animate__animated animate__pulse animate__infinite" />
                </div>
              ))}
              {[{ label: "Gender", name: "gender", 
              options: [{ value: "", label: "Select Gender" }, 
                { value: "male", label: "Male" }, 
                { value: "female", label: "Female" }, 
                { value: "other", label: "Other" }
              ] }].map(({ label, name, options }) => (
                <div className="mb-6 group animate__animated animate__fadeIn animate__delay-6s" key={name}>
                  <label htmlFor={name} className="block text-lg font-semibold text-gray-200">{label} </label>
                  <select name={name} id={name} required className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-800 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition-transform duration-300 transform group-hover:scale-105 hover:shadow-lg animate__animated animate__pulse animate__infinite">
                    {options.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="mb-6 group animate__animated animate__fadeIn animate__delay-7s">
                <label htmlFor="message" className="block text-lg font-semibold text-gray-200">
                  Message
                </label>
                <textarea name="message" id="message" required placeholder="Enter your message" rows="4" className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-800 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition-transform duration-300 transform group-hover:scale-105 hover:shadow-lg animate__animated animate__pulse animate__infinite"></textarea>
              </div>
              <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate__animated animate__bounceInUp animate__delay-1s hover:animate__pulse hover:animate__infinite hover:ring-4 hover:ring-blue-400">
                Connect Me
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2 pl-4 md:pl-0">
            <div className="text-center  animate__animated animate__fadeInUp animate__delay-8s"> 
              <h2 className="font-bold text-white hover:text-purple-500 cursor-pointer text-2xl hover:underline hover:font-serif">Address</h2>
              <p className="font-semibold text-gray-300 hover:text-green-500 cursor-grab text-xl">
                Plot No. 766,26th KM Milestone,NH-9, 
                <br />
                Ghaziabad,Uttar Pradesh – 201015
              </p>
              <h2 className="text-white font-bold text-4xl underline hover:text-pink-500 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-1s pb-9 ">Reach to us</h2>
            </div>
            <div className="map-container relative hover:shadow-cyan-500 overflow-hidden rounded-xl animate__animated animate__fadeInUp animate__delay-9s hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="absolute  bg-gray-900 opacity-20 hover:opacity-40 transition-opacity duration-300 ease-in-out"></div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.545251972305!2d77.49128877566565!3d28.673331882226368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf2c4cac27f99%3A0xd9961659aee6d5b2!2sHi-Tech%20Institute%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1739723721387!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade " className="rounded-xl shadow-2xl"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
