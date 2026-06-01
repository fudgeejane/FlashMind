import Logo from "../../assets/FlashMind.png";
import { ThemedPage } from "../Theme";

export default function LoadingPage() {
  return (
    <ThemedPage className="grid place-items-center px-5">
      <section className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-3xl bg-theme-primary/25" />
          <div className="relative grid h-20 w-20 place-items-center rounded-3xl ">
            <img src={Logo} alt="FlashMind" className="h-16 w-16 rounded-2xl" />
          </div>
        </div>
      </section>
    </ThemedPage>
  );
}
