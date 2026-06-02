import { ThemedButton, ThemedInput } from "../../../components/Theme";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-[100svh] items-center bg-white px-5 py-28 dark:bg-slate-900/60 sm:py-32 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase text-cyan-600 dark:text-cyan-300">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
            Questions, feedback, or collaboration ideas?
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            Send a note and the FlashMind team will help you shape a smoother
            study flow.
          </p>
        </div>
        <form className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/60 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <ThemedInput
              label="Name"
              name="name"
              placeholder="Your full name"
            />
            <ThemedInput
              label="Email"
              type="email"
              name="email"
              placeholder="Your email address"
            />
          </div>
          <ThemedInput
            label="Subject"
            name="subject"
            placeholder="What is this regarding?"
          />
          <ThemedInput
            label="Message"
            name="message"
            rows="5"
            textarea
            placeholder="Your message here..."
          />
          <ThemedButton type="submit" className="px-7 py-4">
            Send Message
          </ThemedButton>
        </form>
      </div>
    </section>
  );
}
