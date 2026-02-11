"use client"

export function HeroSolutionsWeb() {
  return (
    <section className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-3xl sm:max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* Badge */}
        <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8 mt-8 sm:mt-12 animate-fade-in-badge">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2 animate-pulse"></span>
          Création de Sites Web
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-4 sm:mb-6 animate-fade-in-heading">
          Des sites web modernes, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">performants et sur-mesure</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 text-balance max-w-xs sm:max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0 animate-fade-in-subheading font-light">
          Nous concevons des sites vitrines et e-commerce adaptés à vos besoins professionnels. Profitez d'une présence en ligne optimisée pour tous les appareils et moteurs de recherche.
        </p>

        {/* Cartes spécifiques sites vitrines / e-commerce */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-10 mb-8">
          <div className="bg-white/10 rounded-lg shadow-md p-6 w-full md:w-1/2 border border-white/20">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Sites vitrines</h3>
            <p className="text-white/80">
              Présentez votre activité, vos services et vos valeurs avec un site élégant, rapide et facile à gérer.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg shadow-md p-6 w-full md:w-1/2 border border-white/20">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Sites e-commerce</h3>
            <p className="text-white/80">
              Développez votre boutique en ligne avec une solution sécurisée, rapide et évolutive.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-12 animate-fade-in-buttons">
          <a 
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:scale-105 shadow-2xl"
          >
            Demander un devis gratuit
          </a>
        </div>
      </div>
    </section>
  )
}