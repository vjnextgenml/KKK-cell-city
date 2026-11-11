// @ts-check
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const services = [
  {
    name: "Display replacement",
    description:
      "Support for cracked glass, unresponsive touch, lines, or other display problems.",
    image: "/images/focused-smartphone-repair-workshop.png",
  },
  {
    name: "Battery replacement",
    description:
      "Replacement support to help restore dependable battery life and everyday use.",
    image: "/images/repair-battery-replacement.jpg",
  },
  {
    name: "Charging port repair",
    description:
      "Help with loose connections, slow charging, or other charging-port issues.",
    image: "/images/repair-charging-port.jpg",
  },
  {
    name: "Software support",
    description:
      "Help with updates, device setup, performance, and common software problems.",
    image: "/images/repair-software-support.jpg",
  },
  {
    name: "Speaker & microphone repair",
    description:
      "Get help with call audio, unclear microphones, or speaker sound issues.",
    image: "/images/repair-speaker-microphone.jpg",
  },
  {
    name: "Water damage care",
    description:
      "Inspection and practical guidance after accidental liquid exposure.",
    image: "/images/focused-smartphone-repair-workshop.png",
  },
];

const phoneNumbers = [
  { display: "97512 11787", tel: "9751211787" },
  { display: "88700 35459", tel: "8870035459" },
];

/**
 * @param {{
 *   cartCount: number;
 * }} props
 */
export default function Repairs({ cartCount }) {
  const [selectedService, setSelectedService] = useState("");
  const [device, setDevice] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /**
   * @param {string} serviceName
   * @param {string} [number]
   */
  function inquiryUrl(serviceName, number = "919751211787") {
    const message = `Hello KKK Cell City, I'd like to inquire about ${serviceName}.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  /** @param {import("react").FormEvent<HTMLFormElement>} event */
  function requestBooking(event) {
    event.preventDefault();
    const message = `Hello KKK Cell City, I'd like repair support for my ${device}. Service: ${selectedService}. My contact number is ${phone}.`;
    window.open(
      `https://wa.me/919751211787?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
  }

  /** @param {string} serviceName */
  function chooseService(serviceName) {
    setSelectedService(serviceName);
    setSubmitted(false);
    document.getElementById("repair-inquiry")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <div className="light-theme min-h-screen bg-ink text-slate-200">
      <Navbar cartCount={cartCount} />
      <main>
        <section className="relative isolate overflow-hidden border-b border-blue-100">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_38%,rgba(37,99,235,0.14),transparent_38%),linear-gradient(115deg,#eff6ff_10%,#dbeafe_60%,#f8fafc_100%)]" />
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-blue-700">
                <Wrench size={14} /> KKK Cell City repair support
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Let’s get your phone
                <span className="block bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                  back to feeling right.
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                From screen and battery concerns to software questions, our
                Perambalur team can help you understand the next step. Tell us
                what’s going on and we’ll guide you from there.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#repair-inquiry"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
                >
                  Request repair support <ArrowRight size={16} />
                </a>
                <a
                  href="tel:9751211787"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition hover:border-blue-500/30 hover:bg-slate-800/60"
                >
                  <Phone size={16} /> Call our team
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-7 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              How we can help
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Mobile repair services
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Repair needs and timing vary by model and condition. We’ll assess
              your device and discuss the available options before proceeding.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ name, description, image }) => (
              <article
                key={name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-glow"
              >
                {image && (
                  <img
                    src={image}
                    alt={`${name} service`}
                    loading="lazy"
                    className="h-48 w-full object-cover lg:h-40"
                  />
                )}
                <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-4">
                <h3 className="text-base font-semibold text-white">
                  {name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                  {description}
                </p>
                <button
                  type="button"
                  onClick={() => chooseService(name)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2.5 text-sm font-semibold text-blue-300 transition hover:border-blue-400/40 hover:bg-blue-600 hover:text-white"
                >
                  Inquire / Book <ArrowRight size={15} />
                </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="repair-inquiry"
          className="mx-auto grid max-w-7xl scroll-mt-24 gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8"
        >
          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-6 shadow-[0_12px_36px_rgba(37,99,235,0.07)] sm:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                Get in touch
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Tell us what your phone needs.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
                Send an inquiry on WhatsApp or call the showroom. Repair
                availability, parts, and estimates are confirmed by the team
                after they understand the issue.
              </p>

              <form onSubmit={requestBooking} className="mt-6 space-y-4">
                <label className="block text-xs font-medium text-slate-400">
                  Repair service
                  <select
                    required
                    value={selectedService}
                    onChange={(event) => {
                      setSelectedService(event.target.value);
                      setSubmitted(false);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-slate-400">
                    Phone model
                    <input
                      required
                      value={device}
                      onChange={(event) => setDevice(event.target.value)}
                      placeholder="e.g. iPhone 15"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </label>
                  <label className="block text-xs font-medium text-slate-400">
                    Your phone number
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Contact number"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  <MessageCircle size={17} />
                  {submitted ? "Send another inquiry on WhatsApp" : "Continue on WhatsApp"}
                </button>
                {submitted && (
                  <p role="status" className="text-center text-xs text-emerald-400">
                    Your inquiry is ready in WhatsApp. Send the message there to
                    reach our team.
                  </p>
                )}
              </form>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.09] text-blue-300">
              <ShieldCheck size={20} />
            </span>
            <h2 className="mt-5 text-xl font-bold text-white">
              Speak with our local team
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Call or message us with your device model and a short description
              of the issue. We’ll help you work out what to do next.
            </p>
            <div className="mt-6 space-y-3">
              {phoneNumbers.map(({ display, tel }) => (
                <div
                  key={tel}
                  className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:flex-row sm:items-center"
                >
                  <a
                    href={`tel:${tel}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition hover:text-white"
                  >
                    <Phone size={15} className="text-blue-400" />
                    {display}
                  </a>
                  <a
                    href={inquiryUrl("mobile repair support", `91${tel}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 transition hover:text-emerald-800"
                  >
                    <MessageCircle size={14} /> WhatsApp us
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2.5 border-t border-slate-800/80 pt-5 text-xs leading-5 text-slate-400">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <p>
                Final availability, pricing, and repair estimates are confirmed
                by the shop after device assessment.
              </p>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
