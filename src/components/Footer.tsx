import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

  const Footer = () => {
  return (
    <footer className="bg-white/10 py-10 mt-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About Chai-Chai</h2>
            <p className="text-sm text-gray-900">
              Savor the best blends, sourced from premium gardens. Experience chai like never before!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/all-product" className="hover:text-yellow-400 transition">Products</a></li>
              <li><a href="/blog" className="hover:text-yellow-400 transition">Blog</a></li>
              <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p>Email: support@chai-chai.com</p>
            <p>Phone: +91 9373037975</p>
            <p>Address: Pune, India</p>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
            <div className="flex gap-4 text-xl">
              <a href="https://www.facebook.com/profile.php?id=61560587617228" className="hover:text-blue-500 transition"><FaFacebook /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
              <a href="https://x.com/Vishal___Kwad" className="hover:text-blue-400 transition"><FaTwitter /></a>
              <a href="https://www.instagram.com/vishal___kwad/" className="hover:text-blue-600 transition"><FaLinkedin /></a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-800 mt-10">
          @ {new Date().getFullYear()} Chai-Chai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};


export default Footer;