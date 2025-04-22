import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import one from '../assets/1.jpg';
import two from '../assets/2.jpg';
import three from '../assets/3.jpg';
import four from '../assets/4.jpg';
import five from '../assets/5.jpg';
import six from '../assets/6.jpg';
import Agri from '../assets/agri.jpg';
import { FaLeaf, FaHandshake, FaHeart, FaRecycle, FaTruck, FaClock } from 'react-icons/fa';
import { SiOpenai } from "react-icons/si";

const FeatureCard = ({ img, title, description, icon }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden transform duration-500 hover:scale-105 hover:shadow-2xl group">
      <div className="relative">
        <img src={img} alt={title} className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-green-500 text-3xl transform transition-transform duration-500 group-hover:rotate-12">{icon}</div>
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
    </div>
  );
};

const ProductCard = ({ img, name, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform duration-500 hover:scale-105 hover:shadow-2xl group m-2 sm:m-4 border border-green-100">
      <div className="relative">
        <img src={img} alt={name} className="w-full h-48 sm:h-60 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-4">{description}</p>
      </div>
    </div>
  
  );
};

const Home = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);

  // Intersection Observer for Features Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFeatures(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Products Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowProducts(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (productsRef.current) {
      observer.observe(productsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optional: Debug click on Grok AI link
  const handleGrokClick = () => {
    console.log('Grok AI link clicked!');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen md:min-h-[30vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
            transitionTime={500}
            stopOnHover={false}
            swipeable
            emulateTouch
            showArrows={false}
          >
            {[one, two, three, four, five, six].map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-screen object-cover transform transition-transform duration-[1000ms] ease-in-out"
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 py-36">
          <div className="bg-gray-600/50 backdrop-blur-lg p-8 md:p-12 rounded-xl max-w-3xl">
            <h1 className="text-5xl font-semibold text-clip hover:text-blue-900 text-black mb-6 leading-tight tracking-wide drop-shadow-xl shadow-black/50">
              FARMIO – Local Roots, Fresh Routes
            </h1>
            <p className="text-black text-lg md:text-2xl mb-6 leading-relaxed shadow-sm shadow-black/30">
              Explore a world of local, fresh produce straight from the farm.
            </p>
          </div>
        </div>
      </section>

      {/* Our Features Section */}
      <section
        ref={featuresRef}
        className={`py-20 bg-cover bg-center relative transition-opacity duration-1000 ${
          showFeatures ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${one})`, backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 text-center mb-12">
          <h2 className="text-4xl font-bold text-white drop-shadow-md">Why Choose Us</h2>
          <p className="text-lg text-gray-200 mt-4 max-w-3xl mx-auto leading-relaxed">
            Discover the unique features that make shopping fresh, local produce an exceptional experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
          {[
            {
              img: one,
              title: 'Fresh from the Farm',
              description: 'We bring you the freshest produce directly from local farms, so you can enjoy organic foods every day.',
              icon: <FaLeaf />,
            },
            {
              img: two,
              title: 'Support Local Farmers',
              description: 'By shopping with us, you’re supporting local farmers and helping grow the agricultural community.',
              icon: <FaHandshake />,
            },
            {
              img: three,
              title: 'Organic and Healthy',
              description: 'We only source the most organic produce, ensuring you get the healthiest options for your family.',
              icon: <FaHeart />,
            },
            {
              img: four,
              title: 'Sustainable Practices',
              description: 'Our farming partners use sustainable methods to protect the environment and reduce waste.',
              icon: <FaRecycle />,
            },
            {
              img: five,
              title: 'Convenient Delivery',
              description: 'We offer convenient delivery to your doorstep, so you can enjoy fresh food without leaving your home.',
              icon: <FaTruck />,
            },
            {
              img: six,
              title: 'Fresh & Fast',
              description: 'Our system ensures fast delivery of fresh produce, so you can enjoy it at its peak freshness.',
              icon: <FaClock />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* Our Products Section */}
      <section
        ref={productsRef}
        className={`py-16 sm:py-20 bg-cover bg-center relative transition-opacity duration-1000 ${
          showProducts ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${Agri})`, backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">Our Products</h2>
          <p className="text-base sm:text-lg text-gray-200 mt-4 max-w-3xl mx-auto leading-relaxed">
            Browse our selection of fresh, organic produce straight from local farms.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
          {[
            {
              img: one,
              name: 'Organic Tomatoes',
              description: 'Juicy, ripe tomatoes grown without pesticides, perfect for salads and sauces.',
            },
            {
              img: two,
              name: 'Fresh Spinach',
              description: 'Crisp, nutrient-rich spinach leaves, ideal for smoothies and stir-fries.',
            },
            {
              img: three,
              name: 'Golden Carrots',
              description: 'Sweet, crunchy carrots packed with vitamins, great for snacking or cooking.',
            },
            {
              img: four,
              name: 'Farm-Fresh Apples',
              description: 'Crisp and flavorful apples, hand-picked for maximum freshness.',
            },
            {
              img: five,
              name: 'OrganicBrowsers our selection of fresh, organic produce straight from local farms',
            },
            {
              img: six,
              name: 'Red Bell Peppers',
              description: 'Bright, sweet peppers that add color and flavor to any dish.',
            },
          ].map((product, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                showProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        {/* Enhanced Collaboration Section with Glassmorphism and Shadows */}
        <section className="relative overflow-hidden rounded-[40px] mx-auto mt-16 w-full max-w-6xl px-8 py-14 transition-transform duration-500 hover:scale-[1.02] group shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/50 to-gray-600/50 backdrop-blur-[12px] border border-white/20 rounded-[40px] z-0" />
          <div className="absolute inset-0 bg-stars-pattern bg-cover opacity-10 z-0 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="text-center lg:text-left flex-1 animate-slide-in-left">
              <h2 className="text-4xl font-extrabold text-white tracking-tight leading-snug mb-4 group-hover:text-cyan-400 transition-colors duration-300 drop-shadow-[0_4px_8px_rgba(0,255,255,0.4)]">
                Ready to Collaborate?
              </h2>
              <p className="text-lg text-gray-300 max-w-xl drop-shadow-md">
                Partner with us to revolutionize local farming. Let’s connect and grow together!
              </p>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <a
                href="tel:+919560472926"
                className="relative inline-block px-8 py-4 bg-cyan-500 text-white font-bold rounded-full shadow-xl hover:bg-cyan-600 transition-all duration-300 group-hover:shadow-cyan-400 hover:scale-110 ring-2 ring-transparent hover:ring-cyan-300"
              >
                <span className="relative z-10">📞 Connect Now</span>
                <span className="absolute top-0 left-0 w-full h-full rounded-full bg-cyan-400 opacity-20 group-hover:animate-ping" />
              </a>
            </div>
          </div>
        </section>
        {/* Grok AI Link with Catchy Icon */}
        <div className="flex justify-end mt-8 mr-8 relative z-50">
          <a
            href="https://grok.com/?referrer=website"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGrokClick}
            className="group flex items-center space-x-3 p-4 bg-green-600 rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl pointer-events-auto"
            title="Chat with Grok AI for farming tips"
          >
            <SiOpenai className="text-white text-5xl transform group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white font-bold text-xl">Ask Grok for Farming Help</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;