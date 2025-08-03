import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-5 md:px-20 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <Image
            className="h-24 w-48 mx-auto pb-3"
            src="/img/logo.png" // Update with BIOBUILD's logo path
            alt="BIOBUILD Development Ltd. Logo"
            height={150}
            width={150}
          />
          <p className="text-gray-400 text-lg">
            Pioneering sustainable and innovative real estate development in Bangladesh. We build communities, not just structures.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-gray-300 mb-4">Our Projects</h3>
          <ul className="space-y-2 text-gray-400 text-lg">
            <li>
              <Link href="/residential">Residential Communities</Link>
            </li>
            <li>
              <Link href="/commercial">Commercial Complexes</Link>
            </li>
            <li>
              <Link href="/mixed-use">Mixed-Use Developments</Link>
            </li>
            <li>
              <Link href="/sustainable">Sustainable Buildings</Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-lg">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/projects">Our Portfolio</Link>
            </li>
            <li>
              <Link href="/investors">Investor Relations</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gray-300 mb-4">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-gray-400 text-lg">
                House: 05, Road 20, Sector 13, Uttara, Dhaka-1230, Bangladesh
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-gray-400" />
              <p className="text-gray-400 text-lg">+880 1751511212</p>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-400" />
              <p className="text-gray-400 text-lg">info@biobuildbd.com</p>
            </div>
            
            <div className="pt-2">
              <h3 className="text-gray-300 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="https://facebook.com/biobuild" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF size={20} className="hover:text-gray-100 transition-colors" />
                </Link>
                <Link href="https://twitter.com/biobuild" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={20} className="hover:text-gray-100 transition-colors" />
                </Link>
                <Link href="https://instagram.com/biobuild" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={20} className="hover:text-gray-100 transition-colors" />
                </Link>
                <Link href="https://linkedin.com/company/biobuild" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn size={20} className="hover:text-gray-100 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p className='text-gray-50 text-sm'>&copy; {new Date().getFullYear()} BIOBUILD Development Ltd. All rights reserved.</p>
        {/* <p className="mt-2 text-sm">Building the future, sustainably.</p> */}
      </div>
    </footer>
  );
};

export default Footer;