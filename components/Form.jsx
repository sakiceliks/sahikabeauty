const Form = () => {
  return (
    <form className="flex flex-col gap-4">
  <input type="text" className="input" placeholder="Ad Soyad" />
  <input type="email" className="input" placeholder="E-posta adresiniz" />
  <input type="tel" className="input" placeholder="0530 434 83 49" pattern="[0-9]{4} [0-9]{3} [0-9]{2} [0-9]{2}" />
  <textarea className="textarea mb-2" placeholder="Mesajınız (WhatsApp üzerinden de ulaşabilirsiniz)" />
      <button type="submit" className="btn self-start">
        Send message
      </button>
    </form>
  );
};

export default Form;
