const treatments = [
  {
    id: 1,
    name: "THE STAR FACIAL",
    image: "/woman-facial-treatment.png",
    description:
      "Yeni bir sen hayali değil! Işıltılı ve yola çıkışımız ve Anti aging bakımında zirve nokta olan bakımımız.",
  },
  {
    id: 2,
    name: "FOREVER YOUNG",
    image: "/young-woman-skincare-treatment.jpg",
    description: "Genç ciltler için uzman kadromuz tarafından hazırlanan bakım ritüelimiz temizleme amaçlıdır.",
  },
  {
    id: 3,
    name: "Şahika Beauty FACIAL",
    image: "/hydrating-facial-treatment.jpg",
    description: "Yoğunlukta nemlenme ilham alan Şahika Beauty bakım ritüelimiz uzman kadromuz tarafından yapılan.",
  },
  {
    id: 4,
    name: "GOLD FACIAL",
    image: "/gold-facial-treatment-luxury.jpg",
    description:
      "Doğal mat gülşeni yüzünüz ve anti aging endişeler yaşayan ciltler için uzman kadromuz tarafından yapılan.",
  },
  {
    id: 5,
    name: "COLLEGEN FACIAL",
    image: "/collagen-facial-treatment.jpg",
    description: "Günümüzün en önemli endişelerinden biri olan ve elastikiyet kaybıyla faktörlerle ilgili alıp verme.",
  },
  {
    id: 6,
    name: "HYDRAFACIAL",
    image: "/hydrafacial-treatment-machine.jpg",
    description: "Hydrafacial cilt değmeden uzman eller tarafından yapılan klinik bir cilt temizleme bakımıdır.",
  },
  {
    id: 7,
    name: "POWER SHAPE 2",
    image: "/body-contouring.png",
    description: "Dünyasdaki tüm kadınların ortak hayali olan pürüzsüz ve güzel bir vücut PowerShape 2 klinik ortamda.",
  },
]

export default function TreatmentsSection() {
  return (
    <section className="relative px-4 md:px-8 py-12 md:py-16 bg-gray-50">
      {/* Background Script Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-light italic text-blue-100 opacity-30">
          Şahika Beauty
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider mb-4 md:mb-6 text-heading-primary">
            POPÜLER TEDAVİLER
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm md:text-base px-4">
            Şahika Beauty olarak, profesyonel kadromuzun yanında yenilikçi yapısı ve en iyi teknolojiyi kullanarak,
            ihtiyacınız olan tüm güzellik hizmetlerini hassas, özenli ve güvenilir bir şekilde sunmaktayız.
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src={treatment.image || "/placeholder.svg"}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-3 text-heading-secondary group-hover:text-link-hover transition-colors">
                {treatment.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed px-2">{treatment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
