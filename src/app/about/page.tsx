import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Spaeth Farms - Wisconsin Family Farm',
  description: 'Learn about Spaeth Farms, a family-owned cattle operation in Wisconsin dedicated to raising premium beef with sustainable practices.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-foreground text-white py-24">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/farm-aerial.jpg"
            alt="Aerial view of Spaeth Farms"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container-custom relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              For generations, the Spaeth family has been raising cattle on the rolling hills of Wisconsin. What started as a small family operation has grown into a trusted source of premium beef for families across the nation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Rooted in Tradition, Focused on Quality</h2>
              <p className="text-lg text-muted mb-6 leading-relaxed">
                At Spaeth Farms, we believe that the best beef comes from cattle raised with care, respect, and time-honored practices. Our family has been dedicated to this philosophy for generations.
              </p>
              <p className="text-lg text-muted mb-6 leading-relaxed">
                Every animal on our farm is treated with the utmost respect. We believe that healthy, happy cattle produce the best beef, and we never compromise on animal welfare or quality.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                When you choose Spaeth Farms, you&apos;re not just buying beef—you&apos;re supporting a family farm that takes pride in every cut we produce.
              </p>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/farm-family.jpg"
                alt="The Spaeth family on the farm"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              These principles guide everything we do at Spaeth Farms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Animal Welfare</h3>
              <p className="text-muted">
                Our cattle are raised humanely on open pastures with access to fresh water, quality feed, and veterinary care. We never use growth hormones or unnecessary antibiotics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Practices</h3>
              <p className="text-muted">
                We practice rotational grazing to maintain healthy pastures and minimize our environmental impact. Our farm is committed to sustainable agriculture for future generations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Uncompromising Quality</h3>
              <p className="text-muted">
                We hand-select every animal and dry-age our steaks for optimal flavor. Our beef is USDA inspected, vacuum-sealed, and flash-frozen at peak freshness.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community First</h3>
              <p className="text-muted">
                We&apos;re proud to be part of our local farming community. We support fellow farmers, local businesses, and agricultural education programs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-muted">
                We believe you should know where your food comes from. We&apos;re always happy to answer questions about our practices and welcome visitors to the farm.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Family Legacy</h3>
              <p className="text-muted">
                This farm is our legacy, and we take that responsibility seriously. We&apos;re committed to leaving the land better than we found it for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Josh */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-accent font-semibold tracking-widest uppercase mb-4">Meet the Farmer</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Josh Spaeth</h2>
              <p className="text-lg text-muted mb-6 leading-relaxed">
                Josh grew up on this farm and has been involved in cattle raising since he could walk. After studying agricultural science, he returned home to continue the family tradition with a focus on sustainable practices and premium quality.
              </p>
              <p className="text-lg text-muted mb-6 leading-relaxed">
                &quot;Every day, I walk the pastures and check on our herd. I know each animal, and I take personal responsibility for the quality of beef that leaves our farm. When you order from Spaeth Farms, you&apos;re getting beef I&apos;m proud to put my name on.&quot;
              </p>
              <div className="flex items-center gap-4">
                <a href="tel:715-313-0075" className="flex items-center gap-2 text-secondary font-semibold hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  (715) 313-0075
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/josh-portrait.jpg"
                alt="Josh Spaeth, owner of Spaeth Farms"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Farm Stats */}
      <section className="py-16 bg-secondary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">50+</p>
              <p className="text-white/80">Years of Farming</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">200+</p>
              <p className="text-white/80">Acres of Pasture</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">5,000+</p>
              <p className="text-white/80">Families Served</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">100%</p>
              <p className="text-white/80">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Taste the Spaeth Farms Difference?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Experience premium, farm-raised beef delivered directly to your door. Your purchase supports our family farm and sustainable agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary">
              Shop Our Beef
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
