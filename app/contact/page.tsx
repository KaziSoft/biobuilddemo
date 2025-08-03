import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Office workspace background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" aria-hidden="true" />
        </div>

        <div className="relative z-10 pb-12 pt-24 sm:pt-32 lg:pb-16 lg:pt-40 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-poppins tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let's Connect
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question about our services,
              projects, or just want to say hi, our team is ready to answer all your questions.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#contact-form"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#7AA859] bg-white hover:bg-blue-50 transition-colors"
                >
                  <HiOutlineMail className="-ml-1 mr-2 h-5 w-5" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-poppins text-gray-900 sm:text-3xl">
              Send us a message
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
              Have a project in mind or want to collaborate? Fill out the form below and we'll get back to you soon.
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Contact Info Section */}
              <div className="bg-gradient-to-br from-[#7AA859] to-green-700 p-8 md:p-12 text-white">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="mb-8 opacity-90">
                  Fill out the form or use the contact details below to get in touch with us.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaEnvelope className="h-5 w-5 text-blue-200" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-blue-100">Email</h3>
                      <p className="text-base">info@biobuildbd.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaPhone className="h-5 w-5 text-blue-200" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-blue-100">Phone</h3>
                      <p className="text-base">+88017 51 51 12 12</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaMapMarkerAlt className="h-5 w-5 text-blue-200" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-blue-100">Office</h3>
                      <p className="text-base">House: 05, Road 20, Sector 13<br />Uttara, Dhaka-1230
                        Bangladesh.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-sm font-medium text-blue-100 mb-4">Follow us</h3>
                  <div className="flex space-x-4">
                    <a href="linkedin.com/company/biobuildbd" className="text-white hover:text-blue-200 transition-colors">
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-blue-200 transition-colors">
                      <FaGithub className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-white hover:text-blue-200 transition-colors">
                      <FaTwitter className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="p-8 md:p-12">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        placeholder="your Email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#7AA859] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Send Message
                      <FiSend className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;