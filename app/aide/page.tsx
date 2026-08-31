import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Aide — CRK-ICC",
};

export default function HelpPage() {
  return (
    <div className="min-h-screen lg:pl-72">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-medium text-foreground">
                Aide
              </h1>
              <p className="text-muted-foreground">
                Questions fréquentes sur l'utilisation du CRK-ICC.
              </p>
            </div>
            <Accordion multiple={false} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Comment rechercher une ressource ?</AccordionTrigger>
                <AccordionContent>
                  Utilisez la barre de recherche en haut de page ou accédez au fonds documentaire pour filtrer par type de document, thématique, langue ou zone géographique.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Comment proposer une ressource ?</AccordionTrigger>
                <AccordionContent>
                  Cliquez sur "Proposer une ressource" dans le menu ou en bas de la page d'accueil. Remplissez le formulaire. Votre proposition sera examinée avant publication.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Puis-je consulter ou télécharger les documents ?</AccordionTrigger>
                <AccordionContent>
                  Lorsque le CRK-ICC dispose des droits ou que la ressource est légalement accessible en ligne, un bouton "Consulter la ressource" est proposé. Sinon, la ressource est uniquement référencée.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Qui peut contribuer ?</AccordionTrigger>
                <AccordionContent>
                  Tout chercheur, artiste, professionnel ou institution intéressé par les ICC et le patrimoine culturel peut proposer une ressource après validation de son profil.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Comment citer une ressource ?</AccordionTrigger>
                <AccordionContent>
                  Chaque fiche ressource affiche la référence bibliographique complète. Utilisez-la directement dans vos travaux en respectant les droits d'auteur.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </main>
      </div>
    </div>
  );
}
