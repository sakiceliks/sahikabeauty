const Form = () => {
  return (
    <form className="flex flex-col gap-4">
      <label htmlFor="name" className="sr-only">
        Ad Soyad
      </label>
      <input id="name" type="text" className="input" placeholder="Ad Soyad" required aria-required="true" />
      <label htmlFor="email" className="sr-only">
        E-posta adresi
      </label>
      <input id="email" type="email" className="input" placeholder="E-posta adresiniz" required aria-required="true" />
      <label htmlFor="phone" className="sr-only">
        Telefon numarası
      </label>
      <input
        id="phone"
        type="tel"
        className="input"
        placeholder="0530 434 83 49"
        pattern="[0-9]{4} [0-9]{3} [0-9]{2} [0-9]{2}"
        aria-describedby="phone-format"
      />
      <span id="phone-format" className="sr-only">
        Telefon formatı: 0530 434 83 49
      </span>
      <label htmlFor="message" className="sr-only">
        Mesajınız
      </label>
      <textarea
        id="message"
        className="textarea mb-2"
        placeholder="Mesajınız (WhatsApp üzerinden de ulaşabilirsiniz)"
        rows="4"
      />
      <button type="submit" className="btn self-start min-h-[44px] px-6" aria-label="İletişim formunu gönder">
        Mesaj Gönder
      </button>
    </form>
  )
}

export default Form
