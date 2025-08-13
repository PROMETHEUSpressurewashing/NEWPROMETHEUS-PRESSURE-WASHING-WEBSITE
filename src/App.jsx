import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  Home,
  Mail,
  Phone,
  Facebook,
  Instagram,
  X,
  MapPin,
  Menu,
  X as CloseIcon,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import 'tailwindcss/tailwind.css';

// Root component for the entire application
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // State to manage the accordion
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xkgzyppz", {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormMessage({ text: 'Thank you for your message! We will get back to you shortly.', type: 'success' });
        form.reset(); // This clears the form fields
      } else {
        const result = await response.json();
        if (Object.keys(result).length > 0) {
            setFormMessage({ text: 'Oops! There was a problem submitting your form. ' + result.errors.map(error => error.message).join(', '), type: 'error' });
        } else {
            setFormMessage({ text: 'Oops! There was a problem submitting your form. Please try again.', type: 'error' });
        }
      }
    } catch (error) {
      setFormMessage({ text: 'Oops! Something went wrong. Please check your internet connection.', type: 'error' });
    }
  };

  return (
    <div className="bg-gray-100 font-sans text-gray-800 antialiased">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <FAQ openFaq={openFaq} toggleFaq={toggleFaq} />
        <Contact handleFormSubmit={handleFormSubmit} formMessage={formMessage} />
      </main>
      <Footer />
    </div>
  );
};

// Header component with navigation
const Header = ({ isMenuOpen, toggleMenu }) => (
  <header className="sticky top-0 z-50 bg-white shadow-md">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-blue-900">
        <Sparkles className="text-blue-500" size={32} />
        <span>Prometheus Pressure Washing</span>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#services" className="text-gray-600 hover:text-blue-500 transition duration-300">Services</a>
        <a href="#about" className="text-gray-600 hover:text-blue-500 transition duration-300">About Us</a>
        <a href="#gallery" className="text-gray-600 hover:text-blue-500 transition duration-300">Gallery</a>
        <a href="#contact" className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-lg">Get a Free Quote</a>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-800">
          {isMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    <div className={`md:hidden bg-white shadow-lg absolute inset-x-0 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="flex flex-col items-center space-y-4 py-8">
        <a href="#services" onClick={toggleMenu} className="w-full text-center py-2 text-gray-600 hover:bg-blue-100">Services</a>
        <a href="#about" onClick={toggleMenu} className="w-full text-center py-2 text-gray-600 hover:bg-blue-100">About Us</a>
        <a href="#gallery" onClick={toggleMenu} className="w-full text-center py-2 text-gray-600 hover:bg-blue-100">Gallery</a>
        <a href="#contact" onClick={toggleMenu} className="w-full text-center py-2 text-white bg-blue-500 hover:bg-blue-600">Get a Free Quote</a>
      </nav>
    </div>
  </header>
);

// Hero section
const Hero = () => (
  <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
    {/* Background Image/Overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://placehold.co/1920x1080/0F2A5F/white?text=Pressure+Washing+Hero')",
        filter: "brightness(0.5)"
      }}
    ></div>
    <div className="relative z-10 text-center px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
        Experience the <span className="text-blue-400">Prometheus</span> Difference
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
        Professional pressure washing services that make your home or business shine. We restore the beauty of your property with power and precision.
      </p>
      <div className="mt-8">
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300"
        >
          Get Your Free Quote
        </a>
      </div>
    </div>
  </section>
);

// Services section
const Services = () => {
  const services = [
    { name: "Residential", description: "Cleaning driveways, patios, siding, and decks to restore their original beauty and curb appeal.", icon: <Home size={48} className="text-blue-500" /> },
    { name: "Commercial", description: "Professional cleaning for storefronts, sidewalks, parking lots, and building exteriors to maintain a pristine image.", icon: <Wrench size={48} className="text-blue-500" /> },
    { name: "Soft Washing", description: "A gentle yet effective method for cleaning delicate surfaces like roofs, stucco, and wood without causing damage.", icon: <Sparkles size={48} className="text-blue-500" /> },
    { name: "Deck & Patio Cleaning", description: "Specialized cleaning to remove dirt, mold, and mildew, preparing your outdoor living spaces for a fresh coat of sealant or stain.", icon: <Wrench size={48} className="text-blue-500" /> }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">Our Services</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We offer a comprehensive range of pressure washing services for both residential and commercial properties.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
              <p className="mt-4 text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About section
const About = () => (
  <section id="about" className="py-20 bg-gray-100">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12">
      <div className="md:w-1/2">
        <img
          src="https://placehold.co/800x600/0F2A5F/white?text=About+Us"
          alt="Prometheus team member"
          className="rounded-xl shadow-2xl w-full h-auto"
        />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-4xl font-extrabold text-gray-900">Who We Are</h2>
        <p className="mt-6 text-lg text-gray-600">
          Prometheus Pressure Washing is a family-owned and operated business dedicated to providing top-quality exterior cleaning services. We are passionate about restoring the beauty of your property and committed to delivering exceptional results with every job. Our team uses state-of-the-art equipment and eco-friendly cleaning solutions to ensure a safe and effective clean.
        </p>
        <p className="mt-4 text-lg text-gray-600">
          We believe in honest work, transparent pricing, and complete customer satisfaction. Your trust is our priority.
        </p>
      </div>
    </div>
  </section>
);

// Gallery section
const Gallery = () => {
  const images = [
    { src: "https://placehold.co/400x300/0F2A5F/white?text=Before", alt: "Before pressure washing" },
    { src: "https://placehold.co/400x300/0F2A5F/white?text=After", alt: "After pressure washing" },
    { src: "https://placehold.co/400x300/0F2A5F/white?text=Before", alt: "Before pressure washing" },
    { src: "https://placehold.co/400x300/0F2A5F/white?text=After", alt: "After pressure washing" }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">Our Work</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          See the dramatic difference a professional cleaning can make.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} className="rounded-xl shadow-lg w-full h-auto object-cover" />
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials section
const Testimonials = () => {
  const testimonials = [
    { text: "Prometheus did an amazing job on my driveway and patio. They look brand new! Highly recommend.", name: "Jane D." },
    { text: "Professional, on-time, and excellent results. My house siding has never looked better.", name: "John P." },
    { text: "The team was courteous and efficient. The soft wash on my roof was exactly what it needed. Five stars!", name: "Sarah M." }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">What Our Customers Say</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              <p className="mt-4 font-semibold text-gray-800">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ section
const FAQ = ({ openFaq, toggleFaq }) => {
  const faqs = [
    { question: "What is the difference between pressure washing and soft washing?", answer: "Pressure washing uses high-pressure water to clean hard surfaces like concrete and brick. Soft washing uses low-pressure water and specialized cleaning solutions to safely clean more delicate surfaces like roofs and siding." },
    { question: "Are your cleaning solutions safe for my pets and plants?", answer: "Yes, we use eco-friendly and biodegradable cleaning solutions that are safe for your family, pets, and landscaping." },
    { question: "Do you offer free estimates?", answer: "Absolutely! We offer free, no-obligation quotes. Simply contact us with details about your project, and we'll provide an estimate." }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-300"
              >
                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                {openFaq === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              {openFaq === index && (
                <div className="p-6 text-gray-600 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Contact section
const Contact = ({ handleFormSubmit, formMessage }) => (
  <section id="contact" className="py-20 bg-blue-900 text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-extrabold">Get a Free Quote</h2>
      <p className="mt-4 text-lg max-w-2xl mx-auto">
        Ready to restore the beauty of your property? Fill out the form below to get a free, no-obligation estimate.
      </p>

      <div className="mt-12 bg-white text-gray-800 p-8 rounded-xl shadow-2xl max-w-lg mx-auto">
        {formMessage.text && (
          <div className={`p-4 mb-4 rounded-md ${formMessage.type === 'success' ? 'bg-green-100 text-green-700' : formMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
            {formMessage.text}
          </div>
        )}
        <form onSubmit={handleFormSubmit} action="https://formspree.io/f/xkgzyppz" method="POST">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <textarea
                name="message"
                placeholder="Your Message (e.g., details about the project)"
                rows="5"
                required
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300 shadow-lg"
          >
            Send Message
          </button>
        </form>
        <p className="mt-4 text-gray-500 text-sm">
        </p>
      </div>
    </div>
  </section>
);

// Footer component
const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 py-12">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className="text-xl font-bold mb-4 text-white">Prometheus Pressure Washing</h4>
        <p className="text-sm">
          Restoring the beauty of your property with professional and precise cleaning services.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="#services" className="hover:text-blue-400">Services</a></li>
          <li><a href="#about" className="hover:text-blue-400">About Us</a></li>
          <li><a href="#gallery" className="hover:text-blue-400">Gallery</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Get a Free Quote</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4 text-white">Contact Us</h4>
        <p className="flex items-center space-x-2"><Mail size={16} /><span>info@prometheus-pressure-washing.com</span></p>
        <p className="flex items-center space-x-2 mt-2"><Phone size={16} /><span>(555) 123-4567</span></p>
        <p className="flex items-center space-x-2 mt-2"><MapPin size={16} /><span>Your City, Your State</span></p>
        <div className="flex space-x-4 mt-6">
          <a href="#" className="hover:text-blue-400"><Facebook size={24} /></a>
          <a href="#" className="hover:text-blue-400"><Instagram size={24} /></a>
          <a href="#" className="hover:text-blue-400"><X size={24} /></a>
        </div>
      </div>
    </div>
    <div className="mt-8 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Prometheus Pressure Washing. All rights reserved.
    </div>
  </footer>
);

// Export the App component as the default export
export default App;
