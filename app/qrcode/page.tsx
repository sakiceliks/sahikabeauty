import BeautyWelcomeScreen from "@/components/QrCode";

// Not: Linklerinizi buraya eklemelisiniz.
// Google İşletme Yorum linkinizi almak için Google'da "Google yorum linki oluşturma" aratabilirsiniz.
const INSTAGRAM_LINK = "https://www.instagram.com/sahikabeauty/"; 
const GOOGLE_REVIEW_LINK = "https://search.google.com/local/writereview?placeid=ChIJ98rOb7rRyhQRb45F8AYYa8k"; 
const BUSINESS_NAME = "Şahika Beauty";

const WelcomePage = () => {
  return (
    <BeautyWelcomeScreen 
      instagramLink={INSTAGRAM_LINK} 
      googleBusinessReviewLink={GOOGLE_REVIEW_LINK}
      businessName={BUSINESS_NAME}
    />
  );
};

export default WelcomePage;