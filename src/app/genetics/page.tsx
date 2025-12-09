import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Genetics & Breeding Program | Spaeth Farms',
  description: 'Explore our registered Polled Hereford genetics program. Award-winning cattle, advanced breeding technologies, and elite bloodlines from Spaeth Farms in Wisconsin.',
};

const featuredCattle = [
  {
    name: 'TBC Ember 200ET',
    type: 'Show Heifer',
    description: 'Grand Champion at the Minnesota State Fair (September 2023). Shown by Sydney Spaeth, Ember exemplifies our commitment to breeding structurally correct, competitive show cattle.',
    achievement: 'Grand Champion - Minnesota State Fair 2023',
    image: '/spaeth-farms/images/show-heifer.jpg',
  },
  {
    name: 'T/R 4064B Diana 21L ET',
    type: 'Show Heifer',
    description: 'Reserve Division Champion at the Wisconsin Junior Hereford Association Jackpot Show (June 2024). Diana represents the quality genetics and maternal excellence of our breeding program.',
    achievement: 'Reserve Division Champion - WI Jr. Hereford Jackpot 2024',
    image: '/spaeth-farms/images/hereford-cow-calf.jpg',
  },
  {
    name: 'Lowen Genesis G16 ET',
    type: 'Herd Sire Bloodline',
    description: 'Our top-selling pregnancy lot featuring Lowen Genesis G16 ET genetics crossed with H FHF Rita 8444 ET sold for $4,750 to HC Herefords of Beloit, WI at the Wisconsin Hereford Association Sale.',
    achievement: 'Top Selling Pregnancy Lot - WHA Sale',
    image: '/spaeth-farms/images/hereford-bull.jpg',
  },
];

const breedingTechnologies = [
  {
    name: 'Artificial Insemination (AI)',
    description: 'Access to elite genetics from top Hereford sires nationwide, allowing us to incorporate the best bloodlines into our herd.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    name: 'Embryo Transfer (ET)',
    description: 'Multiply the genetic impact of our top females by producing multiple offspring from elite donor cows each year.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    ),
  },
  {
    name: 'In Vitro Fertilization (IVF)',
    description: 'Advanced reproductive technology enabling us to produce embryos from our best genetics with precise mating combinations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    name: 'Genomic DNA Testing',
    description: 'Comprehensive genetic evaluation to identify superior animals and make data-driven breeding decisions for continuous herd improvement.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
];

export default function GeneticsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-foreground text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/spaeth-farms/images/genetics-hero.jpg"
            alt="Hereford cattle"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-2">Registered Polled Herefords</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Genetics Program</h1>
            <p className="text-xl text-gray-300 mb-8">
              At Spaeth Farms, we&apos;re dedicated to raising structurally correct, dependable, and productive
              Polled Hereford cattle. Our genetics are selected for docility, maternal excellence,
              and competitiveness in the show ring.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Inquire About Genetics
              </Link>
              <a
                href="https://www.facebook.com/SpaethFarms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white text-white hover:bg-white hover:text-foreground"
              >
                Follow Us on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Breeding Excellence Since Generations</h2>
              <p className="text-muted mb-4">
                Our family has been involved in cattle farming for generations. Norbert and Anne Spaeth,
                Don and Darlene Manley, and Buck and Eunice Crandall were all lifelong dairy farmers.
                Today, we&apos;re proud to continue this legacy with our registered Polled Hereford program.
              </p>
              <p className="text-muted mb-6">
                Our cattle are expected to be docile, productive mothers, and competitive in the show ring.
                We utilize advanced reproductive technologies to ensure our customers receive elite genetics
                while also providing consumers with high-quality Hereford beef.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-border">
                  <p className="text-3xl font-bold text-secondary">100%</p>
                  <p className="text-sm text-muted">Registered Polled Herefords</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-border">
                  <p className="text-3xl font-bold text-secondary">5+</p>
                  <p className="text-sm text-muted">Generations of Farming</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/spaeth-farms/images/hereford-herd.jpg"
                alt="Spaeth Farms Hereford herd"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cattle */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Genetics</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Our cattle have earned recognition at major shows across the Midwest.
              Here are some of our notable animals and bloodlines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCattle.map((animal) => (
              <div key={animal.name} className="bg-background rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {animal.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{animal.name}</h3>
                  <p className="text-muted text-sm mb-4">{animal.description}</p>
                  <div className="flex items-center gap-2 text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                    </svg>
                    <span className="text-sm font-medium">{animal.achievement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Show Results */}
      <section className="section-padding bg-secondary text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Show Ring Success</h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Our daughter Sydney has proudly represented Spaeth Farms in the show ring,
              earning top honors at prestigious events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-accent font-semibold">Grand Champion</p>
                  <p className="text-2xl font-bold">Minnesota State Fair</p>
                </div>
              </div>
              <p className="text-gray-200">
                September 2023 - TBC Ember 200ET, shown by Sydney Spaeth, was awarded Grand Champion
                at one of the largest state fairs in the nation.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-accent font-semibold">Reserve Division Champion</p>
                  <p className="text-2xl font-bold">WI Jr. Hereford Jackpot</p>
                </div>
              </div>
              <p className="text-gray-200">
                June 2024 - T/R 4064B Diana 21L ET, shown by Sydney Spaeth, earned Reserve Division
                Champion at the Wisconsin Junior Hereford Association Jackpot Show.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breeding Technologies */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Breeding Technologies</h2>
            <p className="text-muted max-w-2xl mx-auto">
              We utilize the latest reproductive technologies to maximize genetic progress
              and provide our customers with elite genetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {breedingTechnologies.map((tech) => (
              <div key={tech.name} className="bg-white p-6 rounded-lg border border-border text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                  {tech.icon}
                </div>
                <h3 className="font-bold mb-2">{tech.name}</h3>
                <p className="text-sm text-muted">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wisconsin Hereford Association */}
      <section className="py-12 bg-white border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Proud Member of the Wisconsin Hereford Association</h3>
              <p className="text-muted">
                We actively participate in WHA events and sales, contributing quality genetics to the Hereford community.
              </p>
            </div>
            <a
              href="https://wisconsinherefords.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline whitespace-nowrap"
            >
              Visit WHA Website
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-foreground text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Our Genetics?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you&apos;re looking for breeding stock, show prospects, or want to learn more about our program,
            we&apos;d love to hear from you. Contact us to discuss available cattle or upcoming sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <a href="tel:715-313-0075" className="btn-outline border-white text-white hover:bg-white hover:text-foreground">
              Call Josh: (715) 313-0075
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
