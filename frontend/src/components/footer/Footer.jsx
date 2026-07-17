import React from "react";

function Footer() {
  return (
 <footer className="mt-auto bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-gray-300 border-t border-green-800">   <div className="max-w-[1400px] w-full px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pt-12 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-white">
              Categories
            </h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-white">About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-white">Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Fiverr</span>
            <span>Buying on Fiverr</span>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-white">
              Community
            </h2>
            <span>Customer Success Stories</span>
            <span>Community Hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-white">
              More From Fiverr
            </h2>
            <span>Fiverr Business</span>
            <span>Fiverr Pro</span>
            <span>Fiverr Logo Maker</span>
            <span>Fiverr Guides</span>
            <span>Get Inspired</span>
            <span>Fiverr Select</span>
            <span>ClearVoice</span>
            <span>Fiverr Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-12 border-gray-200" />

        {/* Bottom Section */}
        <div className="flex pb-8 flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left */}
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">fiverr</h2>
            <span className="text-sm whitespace-nowrap">
              © fiverr International Ltd. 2023
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            
            <div className="flex gap-4">
              <img
                src="/img/twitter.png"
                alt="Twitter"
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src="/img/facebook.png"
                alt="Facebook"
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src="/img/linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src="/img/pinterest.png"
                alt="Pinterest"
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src="/img/instagram.png"
                alt="Instagram"
                className="w-6 h-6 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <img
                src="/img/language.png"
                alt="Language"
                className="w-6 h-6"
              />
              <span>English</span>
            </div>

            <div className="flex items-center gap-2">
              <img
                src="/img/coin.png"
                alt="Currency"
                className="w-6 h-6"
              />
              <span>USD</span>
            </div>

            <img
              src="/img/accessibility.png"
              alt="Accessibility"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
