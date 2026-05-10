import { Leaf, Mail, Globe, MessageCircle, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#05080f] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 text-emerald-400 mr-2" />
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                Eco<span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering individuals to make sustainable choices through advanced artificial intelligence and data analytics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Carbon Calculator</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Insights</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Energy Integration</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Impact Reports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe for the latest eco-tips and platform updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <button 
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center"
              >
                <Mail className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EcoAI. All rights reserved.
          </p>
          <p className="text-emerald-400/80 text-sm italic">
            "The greatest threat to our planet is the belief that someone else will save it."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
