import React, { useState, useEffect } from 'react';
import { Heart, Users, Briefcase, Mail, ChevronDown, Menu, X } from 'lucide-react';

// --- Color Palette ---
// Primary Accent: teal-600
// Hover/Focus: teal-700
// Background: slate-50
// Text (Dark): slate-800
// Text (Light): slate-500
// Borders: slate-200

// --- Main App Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Close menu on navigation
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  // Effect to handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'about':
        return <AboutPage />;
      case 'work':
        return <WorkPage />;
      case 'get-involved':
        return <GetInvolvedPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-800 antialiased">
      <Navbar navigateTo={navigateTo} currentPage={currentPage} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}

// --- Navigation Bar Component ---
const Navbar = ({ navigateTo, currentPage, isMenuOpen, setIsMenuOpen }) => {
  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About Us' },
    { id: 'work', title: 'Our Work' },
    { id: 'get-involved', title: 'Get Involved' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigateTo('home')}
        >
          <Heart className="w-8 h-8 text-teal-600" />
          <span className="text-2xl font-bold text-slate-800">HopeBridge</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`text-lg font-medium transition-colors duration-300 ${
                currentPage === link.id
                  ? 'text-teal-600'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              {link.title}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
            <button 
              onClick={() => navigateTo('get-involved')}
              className="bg-teal-600 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-700 transition-transform duration-300 hover:scale-105"
            >
              Donate
            </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-8 h-8 text-slate-800" /> : <Menu className="w-8 h-8 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`text-2xl font-medium transition-colors duration-300 ${
                currentPage === link.id
                  ? 'text-teal-600'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              {link.title}
            </button>
          ))}
          <button 
            onClick={() => navigateTo('get-involved')}
            className="bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-teal-700 transition-transform duration-300 hover:scale-105 mt-4"
          >
            Donate Now
          </button>
        </div>
      )}
    </header>
  );
};

// --- Page Components ---

const HomePage = ({ navigateTo }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight mb-4">
                    Building Bridges to a Brighter Future
                </h1>
                <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
                    We are dedicated to creating lasting change in communities through education, healthcare, and sustainable development.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                    <button 
                      onClick={() => navigateTo('get-involved')}
                      className="bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-700 transition-transform duration-300 hover:scale-105 text-lg"
                    >
                      Join Our Cause
                    </button>
                    <button 
                      onClick={() => navigateTo('work')}
                      className="bg-transparent border-2 border-slate-800 text-slate-800 font-bold py-3 px-8 rounded-full hover:bg-slate-800 hover:text-white transition-all duration-300 text-lg"
                    >
                      See Our Work
                    </button>
                </div>
            </div>
            <div className="md:w-1/2">
                <img 
                  src="https://placehold.co/600x400/a7f3d0/334155?text=Hope+in+Action" 
                  alt="Children smiling and learning" 
                  className="rounded-lg shadow-2xl w-full h-auto"
                  onError={(e) => e.target.src='https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found'}
                />
            </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Programs</h2>
              <p className="text-slate-600 mb-12 max-w-3xl mx-auto">We focus on three key areas to maximize our impact and create sustainable change for those who need it most.</p>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                      <div className="inline-block bg-teal-100 text-teal-600 p-4 rounded-full mb-4">
                          <Briefcase className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Education for All</h3>
                      <p className="text-slate-600">Providing access to quality education and learning resources for underprivileged children and adults.</p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                      <div className="inline-block bg-teal-100 text-teal-600 p-4 rounded-full mb-4">
                          <Heart className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Health & Wellness</h3>
                      <p className="text-slate-600">Running medical camps, providing essential healthcare services, and promoting health awareness.</p>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                      <div className="inline-block bg-teal-100 text-teal-600 p-4 rounded-full mb-4">
                          <Users className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Community Empowerment</h3>
                      <p className="text-slate-600">Supporting local economies through skill development programs and sustainable livelihood projects.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Impact in Numbers</h2>
            <p className="text-slate-600 mt-2">A glimpse of the change we've driven together.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <p className="text-5xl font-bold text-teal-600">10,000+</p>
              <p className="text-slate-600 mt-2 text-lg">Children Educated</p>
            </div>
            <div className="p-4">
              <p className="text-5xl font-bold text-teal-600">5,000+</p>
              <p className="text-slate-600 mt-2 text-lg">Families Supported</p>
            </div>
            <div className="p-4">
              <p className="text-5xl font-bold text-teal-600">50+</p>
              <p className="text-slate-600 mt-2 text-lg">Communities Reached</p>
            </div>
            <div className="p-4">
              <p className="text-5xl font-bold text-teal-600">1,500+</p>
              <p className="text-slate-600 mt-2 text-lg">Volunteers Engaged</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const AboutPage = () => {
    const teamMembers = [
        { name: 'Jane Doe', role: 'Founder & CEO', img: 'https://placehold.co/300x300/a7f3d0/334155?text=Jane' },
        { name: 'John Smith', role: 'Director of Operations', img: 'https://placehold.co/300x300/a7f3d0/334155?text=John' },
        { name: 'Emily White', role: 'Head of Community Outreach', img: 'https://placehold.co/300x300/a7f3d0/334155?text=Emily' },
    ];

    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6">
                {/* Mission Section */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        To empower vulnerable communities by providing sustainable solutions in education, health, and economic development. We believe in creating a world where every individual has the opportunity to thrive.
                    </p>
                </div>

                {/* Our Story Section */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                    <div className="md:w-1/2">
                        <img 
                          src="https://placehold.co/600x400/d1fae5/334155?text=Our+Journey" 
                          alt="Group of volunteers working together" 
                          className="rounded-lg shadow-xl w-full h-auto"
                          onError={(e) => e.target.src='https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found'}
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <p className="text-slate-600 mb-4">
                            Founded in 2010, HopeBridge started as a small initiative by a group of passionate individuals committed to making a difference. What began as a local food drive has now grown into a multi-faceted organization impacting thousands of lives across the region.
                        </p>
                        <p className="text-slate-600">
                            Our journey has been one of collaboration, resilience, and unwavering dedication. We are driven by the stories of the people we serve and inspired by the generosity of our supporters.
                        </p>
                    </div>
                </div>

                {/* Meet the Team Section */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Meet Our Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map(member => (
                            <div key={member.name} className="bg-slate-50 p-6 rounded-lg shadow-md text-center">
                                <img 
                                  src={member.img} 
                                  alt={member.name} 
                                  className="w-32 h-32 rounded-full mx-auto mb-4"
                                  onError={(e) => e.target.src='https://placehold.co/300x300/e2e8f0/475569?text=Image'}
                                />
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-teal-600 font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const WorkPage = () => {
    const projects = [
        { title: 'Project Bright Start', description: 'Building and renovating schools in rural areas to provide safe and conducive learning environments.', img: 'https://placehold.co/600x400/a7f3d0/334155?text=Education' },
        { title: 'Healthy Horizons Initiative', description: 'Operating mobile medical clinics that bring essential healthcare services to remote communities.', img: 'https://placehold.co/600x400/a7f3d0/334155?text=Healthcare' },
        { title: 'Green Shoots Program', description: 'Training farmers in sustainable agricultural practices to improve food security and income.', img: 'https://placehold.co/600x400/a7f3d0/334155?text=Farming' },
        { title: 'Women\'s Empowerment Hub', description: 'Providing vocational training and micro-loans to women to help them start their own businesses.', img: 'https://placehold.co/600x400/a7f3d0/334155?text=Empowerment' },
        { title: 'Clean Water for All', description: 'Installing water purification systems and wells to ensure access to clean and safe drinking water.', img: 'https://placehold.co/600x400/a7f3d0/334155?text=Water' },
        { title: 'Digital Literacy Campaign', description: 'Equipping youth with essential computer skills to bridge the digital divide and enhance employability.', img: 'https://placehold.co/600x400/a7f3d0/334155?text=Tech' },
    ];

    return (
        <div className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work & Projects</h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        We are actively engaged in a variety of projects that address critical needs and foster long-term development. Here's a look at our key initiatives.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                            <img 
                              src={project.img} 
                              alt={project.title} 
                              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => e.target.src='https://placehold.co/600x400/e2e8f0/475569?text=Project+Image'}
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-slate-600">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const GetInvolvedPage = () => {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Involved</h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Your support is crucial to our mission. There are many ways you can contribute and make a real difference in the lives of others.
                    </p>
                </div>

                {/* Ways to get involved */}
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Donate */}
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-8 rounded-lg shadow-md">
                        <div className="text-teal-600">
                            <Heart className="w-16 h-16" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2">Donate</h2>
                            <p className="text-slate-600 mb-4">
                                Every contribution, no matter the size, helps us continue our work. Your donation can provide a child with books, a family with healthcare, or a community with clean water.
                            </p>
                            <button className="bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-700 transition-transform duration-300 hover:scale-105">
                                Make a Donation
                            </button>
                        </div>
                    </div>

                    {/* Volunteer */}
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-8 rounded-lg shadow-md">
                        <div className="text-teal-600">
                            <Users className="w-16 h-16" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2">Volunteer</h2>
                            <p className="text-slate-600 mb-4">
                                Give the gift of your time and skills. We have a variety of volunteer opportunities, from helping at events to providing expertise on projects. Join our team of passionate changemakers.
                            </p>
                            <button className="bg-slate-800 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-700 transition-colors duration-300">
                                See Opportunities
                            </button>
                        </div>
                    </div>

                    {/* Partner */}
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-8 rounded-lg shadow-md">
                        <div className="text-teal-600">
                            <Briefcase className="w-16 h-16" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2">Corporate Partnership</h2>
                            <p className="text-slate-600 mb-4">
                                Partner with us to create a meaningful impact. We collaborate with businesses on corporate social responsibility (CSR) initiatives, sponsorships, and employee engagement programs.
                            </p>
                            <button className="bg-slate-800 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-700 transition-colors duration-300">
                                Partner With Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question, a suggestion, or want to partner with us, please get in touch.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input type="text" placeholder="Your Name" required className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
                <input type="email" placeholder="Your Email" required className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
              </div>
              <div className="mb-6">
                <input type="text" placeholder="Subject" required className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
              </div>
              <div className="mb-6">
                <textarea placeholder="Your Message" rows="6" required className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"></textarea>
              </div>
              <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-700 transition-colors duration-300">
                Send Message
              </button>
              {formStatus && <p className="mt-4 text-green-600">{formStatus}</p>}
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                <h2 className="text-2xl font-bold mb-6">Our Information</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-slate-800">Address</h3>
                        <p className="text-slate-600">123 Hope Street, Unity City, 12345</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">Email</h3>
                        <p className="text-slate-600">contact@hopebridge.org</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">Phone</h3>
                        <p className="text-slate-600">(123) 456-7890</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">Follow Us</h3>
                        <div className="flex space-x-4 mt-2">
                            <a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>
                            <a href="#" className="text-slate-500 hover:text-teal-600 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.927 8.177c.058.463.07.933.07 1.413 0 4.54-3.46 9.77-9.77 9.77-1.933 0-3.73-.567-5.25-1.533a7.02 7.02 0 001.033.067c1.6 0 3.067-.55 4.233-1.467a3.448 3.448 0 01-3.233-2.383c.167.033.333.05.5.05.333 0 .65-.05.95-.117a3.447 3.447 0 01-2.767-3.383v-.05a3.423 3.423 0 001.567.433A3.447 3.447 0 013.95 6.317a9.78 9.78 0 007.1 3.6a3.443 3.443 0 015.8-3.133 6.91 6.91 0 002.183-.833 3.45 3.45 0 01-1.517 1.9a6.87 6.87 0 001.983-.55z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Footer Component ---
const Footer = ({ navigateTo }) => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-7 h-7 text-teal-400" />
              <span className="text-2xl font-bold">HopeBridge</span>
            </div>
            <p className="text-slate-400">
              Creating lasting change through community-driven projects in education, health, and sustainable development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => navigateTo('about')} className="text-slate-400 hover:text-teal-400 transition-colors">About Us</button></li>
              <li><button onClick={() => navigateTo('work')} className="text-slate-400 hover:text-teal-400 transition-colors">Our Work</button></li>
              <li><button onClick={() => navigateTo('get-involved')} className="text-slate-400 hover:text-teal-400 transition-colors">Get Involved</button></li>
              <li><button onClick={() => navigateTo('contact')} className="text-slate-400 hover:text-teal-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-400">
              <li>123 Hope Street, Unity City</li>
              <li>contact@hopebridge.org</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} HopeBridge. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
