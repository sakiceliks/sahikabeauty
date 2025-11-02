
import React from 'react';
import Link from 'next/link';

interface BeautyWelcomeScreenProps {
  instagramLink: string;
  googleBusinessReviewLink: string;
  businessName: string;
}

const BeautyWelcomeScreen: React.FC<BeautyWelcomeScreenProps> = ({
  instagramLink,
  googleBusinessReviewLink,
  businessName,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-10 border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-8 pt-10 pb-8 text-center border-b min-h-full border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {businessName}
          </h1>
          <p className="text-sm text-gray-500">
            Desteğiniz bizim için değerli
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">
          
          {/* Instagram Button */}
          <Link href={instagramLink} passHref legacyBehavior>
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-full h-12 px-16 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <svg 
                className="w-5 h-5 ml-5" 
                style={{marginRight:5}}
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.77 1.624 4.908 4.908.058 1.265.07 1.645.07 4.849 0 3.204-.012 3.584-.07 4.85-.148 3.252-1.624 4.77-4.908 4.908-1.265.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.77-1.624-4.908-4.908-.058-1.265-.07-1.644-.07-4.85 0-3.204.012-3.584.07-4.85.148-3.252 1.624-4.77 4.908-4.908 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.623-6.98 6.98-.058 1.281-.072 1.689-.072 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.623 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.78-2.622 6.979-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.62-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.796 0 1.44-.645 1.44-1.44s-.644-1.44-1.44-1.44z" />
              </svg>
              Instagram'da Takip Edin
            </a>
          </Link>

          {/* Google Review Button */}
          <Link href={googleBusinessReviewLink} passHref legacyBehavior>
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-full h-12 px-6 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg 
                className="w-5 h-5 mr-2.5 text-yellow-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61L12 2.5 9.19 9.87 2 10.48l5.46 4.73-1.64 7.03L12 17.27z" />
              </svg>
              Google'da Yorum Yapın
            </a>
          </Link>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 pt-4 text-center">
          <p className="text-xs text-gray-400">
            Teşekkür ederiz
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeautyWelcomeScreen;