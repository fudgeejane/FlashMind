import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "../../../assets/FlashMind.png";

const socialLinks = [
  { name: "GitHub", Icon: FaGithub, url: "https://github.com/fudgeejane" },
  { name: "Facebook", Icon: FaFacebook, url: "https://www.facebook.com/fudgeejane/" },
  { name: "LinkedIn", Icon: FaLinkedin, url: "https://www.linkedin.com/in/francine-jane-sto-domingo-680476319/" },
];

export default function FooterSection({ navItems }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-5 py-10 text-white dark:border-white/10 lg:px-8">
      <div data-reveal-block className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={Logo} alt="FlashMind Logo" className="h-12 w-12 rounded-lg" />
            <span className="text-xl font-black">FlashMind</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            AI-powered study tools for faster, more confident learning.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-cyan-300">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold">Social Links</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map(({ name, Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 px-3 text-sm text-slate-300 transition hover:border-cyan-300 hover:text-cyan-300"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-400">
            Copyright {new Date().getFullYear()} FlashMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
