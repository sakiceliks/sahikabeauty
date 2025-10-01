"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null) // 'success' or 'error'
  const [statusMessage, setStatusMessage] = useState("")

  // --- Utility Component: Custom Notification/Toast ---
  const StatusToast = ({ status, message, onClose }) => {
    const isSuccess = status === 'success';
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    const icon = isSuccess ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

    return (
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-2xl z-50 text-white ${bgColor} flex items-center space-x-3 max-w-sm w-full mt-2`}
      >
        {icon}
        <span className="font-medium text-sm flex-grow">{message}</span>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    );
  };
  // --- End Utility Component ---

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Ad Soyad gerekli"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi gerekli"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin"
    }
    
    // Telefon numarasını sadece doluysa ve formata uymuyorsa kontrol et
    if (formData.phone && !/^0\d{3} \d{3} \d{2} \d{2}$/.test(formData.phone)) {
      newErrors.phone = "Geçerli telefon formatı: 0530 434 83 49"
    }
    
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    // Limit message length
    if (name === 'message' && value.length > 500) {
      return // Do not update state if over limit
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "") // Remove all non-digits
    
    // Limit to 11 digits and apply formatting: XXXX YYY ZZ ZZ
    if (value.length > 0) {
      value = value.substring(0, 11)
      
      let formatted = ''
      if (value.length >= 1) formatted += value.substring(0, 4)
      if (value.length >= 5) formatted += ' ' + value.substring(4, 7)
      if (value.length >= 8) formatted += ' ' + value.substring(7, 9)
      if (value.length >= 10) formatted += ' ' + value.substring(9, 11)
      
      value = formatted;
    }
    
    setFormData(prev => ({
      ...prev,
      phone: value
    }))
    
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ""
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmissionStatus(null);
    setStatusMessage("");
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Gerçek API çağrısı
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Başarı durumunda formu sıfırla ve bildirim göster
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        })
        setSubmissionStatus('success');
        setStatusMessage("Mesajınız başarıyla gönderildi!");
      } else {
        throw new Error(result.error || 'Mesaj gönderilemedi')
      }
      
    } catch (error) {
      // Hata durumunda bildirim göster
      setSubmissionStatus('error');
      setStatusMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false)
      // Bildirimi 5 saniye sonra kapat
      setTimeout(() => {
        setSubmissionStatus(null);
      }, 5000);
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto relative"
    >
      {/* Custom Tailwind CSS (for shake animation) */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% {transform: translateX(0);}
          10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
          20%, 40%, 60%, 80% {transform: translateX(5px);}
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
      
      {/* Bildirim Alanı */}
      <AnimatePresence>
        {submissionStatus && (
          <StatusToast 
            status={submissionStatus} 
            message={statusMessage} 
            onClose={() => setSubmissionStatus(null)} 
          />
        )}
      </AnimatePresence>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6" 
        noValidate
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Name Field */}
        <motion.div // <--- Açılan etiket
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label 
            htmlFor="name" 
            className="block text-sm font-semibold text-gray-800 transition-colors duration-200"
          >
            Ad Soyad <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`
                w-full px-4 py-3 border-2 rounded-lg
                text-gray-800 placeholder-gray-500
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-4
                ${errors.name 
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400'
                }
              `}
              placeholder="Adınız ve soyadınız"
              required 
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {formData.name && !errors.name && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {errors.name && (
            <p id="name-error" className="text-sm text-red-600 flex items-center gap-1 animate-shake">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.name}
            </p>
          )}
        </motion.div> {/* <--- DÜZELTME: motion.div olarak kapatıldı */}

        {/* Email Field */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label 
            htmlFor="email" 
            className="block text-sm font-semibold text-gray-800"
          >
            E-posta Adresi <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`
                w-full px-4 py-3 border-2 rounded-lg
                text-gray-800 placeholder-gray-500
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-4
                ${errors.email 
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400'
                }
              `}
              placeholder="ornek@email.com"
              required 
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {formData.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {errors.email && (
            <p id="email-error" className="text-sm text-red-600 flex items-center gap-1 animate-shake">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email}
            </p>
          )}
        </motion.div>

        {/* Phone Field */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label 
            htmlFor="phone" 
            className="block text-sm font-semibold text-gray-800"
          >
            Telefon Numarası <span className="text-gray-500 text-xs">(Opsiyonel)</span>
          </label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`
                w-full px-4 py-3 border-2 rounded-lg
                text-gray-800 placeholder-gray-500
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-4
                ${errors.phone 
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400'
                }
              `}
              placeholder="0530 434 83 49"
              aria-describedby="phone-format"
              aria-invalid={!!errors.phone}
            />
            {formData.phone && !errors.phone && /^0\d{3} \d{3} \d{2} \d{2}$/.test(formData.phone) && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {errors.phone && (
            <p className="text-sm text-red-600 flex items-center gap-1 animate-shake">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.phone}
            </p>
          )}
          <p id="phone-format" className="text-xs text-gray-600">
            Format: 0530 434 83 49
          </p>
        </motion.div>

        {/* Message Field */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label 
            htmlFor="message" 
            className="block text-sm font-semibold text-gray-800"
          >
            Mesajınız <span className="text-gray-500 text-xs">(Opsiyonel)</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="
                w-full px-4 py-3 border-2 rounded-lg resize-none
                text-gray-800 placeholder-gray-500
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-4
                border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400
              "
              placeholder="Mesajınızı buraya yazın... (WhatsApp üzerinden de ulaşabilirsiniz)"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {formData.message.length}/500
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full sm:w-auto min-w-[200px] min-h-[52px] px-8 py-3
              bg-gradient-to-r from-blue-600 to-blue-700
              hover:from-blue-700 hover:to-blue-800
              disabled:from-gray-400 disabled:to-gray-500
              text-white font-semibold rounded-lg
              transition-all duration-300 ease-in-out
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-4 focus:ring-blue-200
              disabled:transform-none disabled:cursor-not-allowed
              shadow-lg hover:shadow-xl
              flex items-center justify-center gap-2
            "
            aria-label={isSubmitting ? "Mesaj gönderiliyor..." : "İletişim formunu gönder"}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Gönderiliyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Mesaj Gönder
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

export default Form
