import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="font-display text-4xl md:text-5xl text-espresso font-medium mb-4">
        Contact Us
      </h1>
      <p className="text-espresso-light mb-10 leading-relaxed">
        We would love to hear from you. Send us a message and we will respond as soon as we can.
      </p>
      <form className="space-y-6" action="#" method="post">
        <div>
          <label htmlFor="name" className="block text-sm uppercase tracking-wider text-espresso mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 bg-white border border-cream-dark text-espresso focus:outline-none focus:ring-2 focus:ring-plum/30"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm uppercase tracking-wider text-espresso mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 bg-white border border-cream-dark text-espresso focus:outline-none focus:ring-2 focus:ring-plum/30"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm uppercase tracking-wider text-espresso mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 bg-white border border-cream-dark text-espresso focus:outline-none focus:ring-2 focus:ring-plum/30 resize-y"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-plum text-cream uppercase tracking-widest text-sm hover:bg-plum-light transition-colors"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
