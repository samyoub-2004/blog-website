import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <GlassmorphismNav />

          <div className="mx-auto w-full max-w-4xl px-6 py-16 text-white">
            <h1 className="text-4xl font-semibold tracking-tight">Politique de confidentialité</h1>
            <p className="mt-4 text-white/80">
              Cette politique de confidentialité explique comment xo-link (« nous »,
              « notre », « nos ») collecte, utilise et protège vos informations
              lorsque vous utilisez notre site web et nos expériences de messagerie
              (y compris notre chatbot sur le site et les interactions via Facebook
              Messenger).
            </p>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Informations que nous collectons</h2>
              <p className="text-white/80">
                Nous pouvons collecter le contenu que vous nous envoyez, par exemple :
              </p>
              <ul className="list-disc pl-6 text-white/80 space-y-2">
                <li>Les messages que vous saisissez dans notre chatbot sur le site</li>
                <li>Les messages que vous envoyez à notre Page Facebook via Messenger</li>
              </ul>
              <p className="text-white/80">
                Selon le canal, nous pouvons recevoir des métadonnées techniques
                (par exemple, des identifiants de plateforme nécessaires pour livrer
                les réponses). Nous ne cherchons pas à collecter des informations
                personnelles sensibles.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Comment nous utilisons vos informations</h2>
              <ul className="list-disc pl-6 text-white/80 space-y-2">
                <li>Pour répondre à vos demandes et messages</li>
                <li>Pour fournir une assistance et des informations sur nos services</li>
                <li>Pour améliorer l’expérience du site et l’assistance automatisée</li>
              </ul>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Traitement par IA</h2>
              <p className="text-white/80">
                Lorsque vous envoyez un message, nous pouvons le traiter à l’aide
                d’un modèle d’IA afin de générer une réponse. Les réponses IA sont
                générées automatiquement et peuvent être imparfaites. Évitez de
                partager des informations confidentielles.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Services tiers</h2>
              <p className="text-white/80">
                Nous pouvons utiliser des prestataires tiers pour faire fonctionner
                les fonctionnalités de messagerie et générer des réponses via IA.
                Dans le cas de Facebook Messenger, Meta fournit la plateforme de
                messagerie. Ces prestataires peuvent traiter les données conformément
                à leurs propres politiques.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Conservation des données</h2>
              <p className="text-white/80">
                Nous conservons les informations uniquement le temps nécessaire pour
                fournir le service et respecter nos obligations légales. Si vous
                souhaitez la suppression de vos données, contactez-nous.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Vos droits</h2>
              <p className="text-white/80">
                Vous pouvez demander l’accès, la correction ou la suppression de vos
                informations personnelles en nous contactant.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p className="text-white/80">
                Pour toute demande liée à la confidentialité, contactez :{" "}
                <span className="font-medium">contact@xo-link.com</span>
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Modifications de cette politique</h2>
              <p className="text-white/80">
                Nous pouvons mettre à jour cette politique de confidentialité de
                temps à autre. La version mise à jour sera publiée sur cette page.
              </p>
            </section>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  )
}
