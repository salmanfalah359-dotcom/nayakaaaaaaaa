"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ─── Reusable Tag Badge ───────────────────────────────────────────────────────

function Tag({
  iconSrc,
  label,
  rotate = false,
}: {
  iconSrc: string;
  label: string;
  rotate?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#f8f5f2] rounded-full text-[13px] sm:text-[14px] text-[#5d4037] font-normal whitespace-nowrap">
      <div
        className={`w-4 h-4 sm:w-5 sm:h-5 relative shrink-0 flex items-center justify-center ${
          rotate ? "rotate-90" : ""
        }`}
      >
        <Image
          src={iconSrc}
          alt=""
          width={20}
          height={20}
          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
        />
      </div>
      <span>{label}</span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "#beranda", label: "Beranda", active: true },
    { href: "#fitur", label: "Fitur Utama", active: false },
    { href: "#medis", label: "Dukungan Medis", active: false },
    { href: "#ekosistem", label: "Ekosistem", active: false },
    { href: "#paket", label: "Paket Kemitraan", active: false },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200"
      style={{ boxShadow: "0px 0.1px 25px 0px rgba(0,0,0,0.12)" }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 h-[72px] md:h-[100px] flex items-center justify-between">
        {/* Logo */}
        <a href="#beranda" className="flex items-center gap-0 shrink-0 select-none">
          <Image
            src="/assets/LogoNayaka1.png"
            alt="NAYAKA"
            width={220}
            height={38}
            unoptimized
            className="h-[32px] sm:h-[38px] md:h-[44px] w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 lg:px-5 py-3 rounded-full text-[16px] lg:text-[18px] transition-colors duration-200 whitespace-nowrap ${
                link.active
                  ? "text-[#5d4037] font-medium"
                  : "text-[#71717b] hover:text-[#5d4037] hover:bg-[#f8f5f2] font-normal"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xl text-[#5d4037] hover:bg-[#f8f5f2] transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#f4f4f5] px-5 py-3 flex flex-col gap-1 shadow-xl">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-[16px] transition-colors ${
                link.active
                  ? "text-[#5d4037] font-medium bg-[#f8f5f2]"
                  : "text-[#71717b] hover:text-[#5d4037] hover:bg-[#f8f5f2]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────


function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [secondsUntilLaunch, setSecondsUntilLaunch] = useState<number | null>(null);

  useEffect(() => {
    if (!videoOpen && !maintenanceOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
        setMaintenanceOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoOpen, maintenanceOpen]);

  useEffect(() => {
    if (!maintenanceOpen) return;

    const launchAt = Date.UTC(2026, 9, 13, 1, 0, 0);
    const updateCountdown = () => {
      setSecondsUntilLaunch(Math.max(0, Math.ceil((launchAt - Date.now()) / 1000)));
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(intervalId);
  }, [maintenanceOpen]);

  const countdown = secondsUntilLaunch ?? 0;
  const countdownParts = [
    { label: "Hari", value: Math.floor(countdown / 86400) },
    { label: "Jam", value: Math.floor((countdown % 86400) / 3600) },
    { label: "Menit", value: Math.floor((countdown % 3600) / 60) },
    { label: "Detik", value: countdown % 60 },
  ];

  return (
    <>
    <section
      id="beranda"
      className="hero-section bg-white px-4 sm:px-6 overflow-hidden scroll-mt-[72px] md:scroll-mt-[100px]"
    >
      <div className="hero-inner max-w-[1100px] mx-auto flex flex-col items-center text-center">
        <div className="hero-tag mb-3 sm:mb-6">
          <Tag
            iconSrc="/assets/icon_tablet.svg"
            label="Bermain untuk Melihat Lebih Baik"
            rotate
          />
        </div>

        {/* Mobile = 3 lines. Desktop = exactly 2 lines. Font size stays unchanged. */}
        <h1 className="hero-title text-[20px] xs:text-[22px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[1.25] font-medium text-[#18181b] tracking-tight text-center mx-auto">
          <span className="block sm:inline whitespace-nowrap">Tingkatkan Kepatuhan</span>
          <span className="block sm:inline whitespace-nowrap sm:ml-[0.28em]">Terapi Ambliopia Lewat</span>
          <br className="hidden sm:block" />
          <span className="block sm:inline whitespace-nowrap sm:ml-0">
            <em className="text-[#5d4037] italic font-medium">Dichoptic Game Training</em>
          </span>
        </h1>

        {/* Polaroid Photo Gallery */}
        <div className="hero-gallery relative mt-3 sm:mt-6 md:mt-8 mb-2 sm:mb-4 md:mb-6 w-full flex justify-center items-end px-2 pt-1 sm:pt-2 md:pt-4">
          <div className="flex items-end justify-center w-full max-w-[900px] gap-0 md:gap-14 lg:gap-20">
            {/* Left photo */}
            <div className="hero-photo-left relative shrink-0 z-10 -rotate-6 md:rotate-0 -mr-7 xs:-mr-10 sm:-mr-8 md:mr-0 mb-[8px] sm:mb-[12px] md:mb-[20px] transition-transform duration-300 w-[100px] xs:w-[115px] sm:w-[150px] md:w-[160px] h-[116px] xs:h-[132px] sm:h-[170px] md:h-[185px]">
              <div className="w-full h-full bg-white rounded-[2px] p-[7px] sm:p-[10px] md:p-[12px] pb-[18px] sm:pb-[26px] md:pb-[28px] flex flex-col shadow-[0px_0px_16.5px_rgba(0,0,0,0.22)]">
                <div className="w-full h-full bg-[#5d4037] relative rounded-[1px]" />
              </div>
              <div
                className="absolute pointer-events-none w-[84px] xs:w-[98px] sm:w-[130px] md:w-[140px] h-[132px] xs:h-[152px] sm:h-[195px] md:h-[210px] left-[7px] sm:left-[10px] md:left-[10px] bottom-[18px] sm:bottom-[26px] md:bottom-[28px]"
                style={{ clipPath: "inset(-80px -25px 0px -25px)" }}
              >
                <Image
                  src="/assets/orang1.png"
                  alt="Anak menggunakan kacamata anaglif 3D"
                  fill
                  unoptimized
                  className="object-cover object-bottom"
                  priority
                />
              </div>
            </div>

            {/* Center photo */}
            <div className="hero-photo-center relative shrink-0 z-20 mb-0 transition-transform duration-300 w-[124px] xs:w-[142px] sm:w-[190px] md:w-[220px] h-[140px] xs:h-[160px] sm:h-[215px] md:h-[250px]">
              <div className="w-full h-full bg-white rounded-[2px] p-[8px] sm:p-[12px] md:p-[14px] pb-[22px] sm:pb-[32px] md:pb-[38px] flex flex-col shadow-[0px_0px_22px_rgba(0,0,0,0.28)]">
                <div className="w-full h-full bg-[#5d4037] relative rounded-[1px]" />
              </div>
              <div
                className="absolute pointer-events-none w-[158px] xs:w-[180px] sm:w-[240px] md:w-[280px] h-[166px] xs:h-[190px] sm:h-[255px] md:h-[290px] left-[-17px] xs:left-[-19px] sm:left-[-25px] md:left-[-30px] bottom-[10px] sm:bottom-[14px] md:bottom-[18px]"
                style={{ clipPath: "inset(-120px -50px 0px -50px)" }}
              >
                <Image
                  src="/assets/orang2.png"
                  alt="Anak bermain game terapi dengan tablet"
                  fill
                  unoptimized
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>

            {/* Right photo */}
            <div className="hero-photo-right relative shrink-0 z-10 rotate-6 md:rotate-0 -ml-7 xs:-ml-10 sm:-ml-8 md:ml-0 mb-[7px] sm:mb-[10px] md:mb-[16px] transition-transform duration-300 w-[104px] xs:w-[119px] sm:w-[155px] md:w-[175px] h-[118px] xs:h-[136px] sm:h-[175px] md:h-[200px]">
              <div className="w-full h-full bg-white rounded-[2px] p-[7px] sm:p-[10px] md:p-[12px] pb-[19px] sm:pb-[28px] md:pb-[30px] flex flex-col shadow-[0px_0px_16.5px_rgba(0,0,0,0.22)]">
                <div className="w-full h-full bg-[#5d4037] relative rounded-[1px]" />
              </div>
              <div
                className="absolute pointer-events-none w-[120px] xs:w-[140px] sm:w-[185px] md:w-[210px] h-[145px] xs:h-[166px] sm:h-[215px] md:h-[245px] left-[-8px] xs:left-[-10px] sm:left-[-15px] md:left-[-18px] bottom-[12px] sm:bottom-[16px] md:bottom-[20px]"
                style={{ clipPath: "inset(-100px -35px 0px -35px)" }}
              >
                <Image
                  src="/assets/orang3.png"
                  alt="Anak melakukan terapi ambliopia"
                  fill
                  unoptimized
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <p className="hero-subtext text-[13px] sm:text-[15px] text-[#18181b] leading-[1.5] sm:leading-relaxed max-w-[550px] mb-3 sm:mb-6 px-2">
          NAYAKA membantu meningkatkan kepatuhan terapi ambliopia melalui{" "}
          <em className="italic">dichoptic game training</em>.
        </p>

        <div className="hero-actions flex flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-0 sm:px-4">
          <button
            type="button"
            onClick={() => setMaintenanceOpen(true)}
            className="nayaka-btn-primary flex-1 sm:flex-none text-center justify-center"
          >
            Coba <em>Game</em> Sekarang
            <Image
              src="/assets/icon_arrow_right.svg"
              alt=""
              width={21}
              height={21}
              className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]"
            />
          </button>
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="nayaka-btn-outline flex-1 sm:flex-none text-center justify-center"
          >
            Tonton Video Teaser
            <Image
              src="/assets/icon_play.svg"
              alt=""
              width={21}
              height={21}
              className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]"
            />
          </button>
        </div>
      </div>
    </section>
    {videoOpen && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
        onClick={() => setVideoOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="teaser-video-title"
          className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-black shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between bg-[#18181b] px-4 py-3 text-white">
            <h2 id="teaser-video-title" className="text-sm font-medium sm:text-base">
              Video Teaser NAYAKA
            </h2>
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Tutup video teaser"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <video
            src="/assets/video.mp4"
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="block max-h-[calc(100svh-7rem)] w-full bg-black"
          >
            Browser Anda tidak mendukung pemutaran video.
          </video>
        </div>
      </div>
    )}
    {maintenanceOpen && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 sm:p-8"
        onClick={() => setMaintenanceOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="maintenance-title"
          className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between bg-[#5d4037] px-5 py-4 text-white sm:px-7">
            <p className="text-sm font-medium sm:text-base">NAYAKA Web Game</p>
            <button
              type="button"
              onClick={() => setMaintenanceOpen(false)}
              className="rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Tutup pemberitahuan maintenance"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-5 py-8 text-center sm:px-8 sm:py-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f5f2] text-[#5d4037]">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l2.5 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h2 id="maintenance-title" className="text-2xl font-semibold text-[#18181b] sm:text-3xl">
              Game Web Sedang Maintenance
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#71717b] sm:text-base">
              Kami sedang menyiapkan pengalaman bermain NAYAKA. Game dijadwalkan
              tersedia kembali pada 13 Oktober 2026 pukul 08.00 WIB.
            </p>
            {secondsUntilLaunch === null ? (
              <p className="mt-8 text-sm text-[#71717b]" role="status">Menghitung waktu...</p>
            ) : secondsUntilLaunch === 0 ? (
              <p className="mt-8 rounded-lg bg-[#f8f5f2] px-4 py-4 font-medium text-[#5d4037]" role="status">
                Waktu maintenance terjadwal telah berakhir.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3" aria-label="Hitung mundur menuju pembukaan game">
                {countdownParts.map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-[#f8f5f2] px-2 py-3 sm:py-4">
                    <p className="text-2xl font-semibold tabular-nums text-[#5d4037] sm:text-3xl">
                      {String(value).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-xs text-[#71717b] sm:text-sm">{label}</p>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-5 text-xs text-[#71717b] sm:text-sm">Waktu mengikuti zona WIB (UTC+7)</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

const features = [
  {
    icon: "/assets/feat_game.png",
    title: "Dichoptic Game Training",
    desc: "Metode terapi menggunakan game dengan rangsangan berbeda pada tiap mata untuk melatih kerja sama kedua mata",
    italic: true,
  },
  {
    icon: "/assets/feat_contrast.png",
    title: "Adaptive Contrast Calibration",
    desc: "Menyeimbangkan kontras visual antara mata sehat dan mata malas agar otak bisa kembali menyatukan penglihatan kedua mata",
    italic: true,
  },
  {
    icon: "/assets/feat_ai.png",
    title: "AI Compliance Monitoring",
    desc: "AI mendeteksi penggunaan kacamata anaglif 3D dan menjeda game saat kacamata anaglif 3D dilepas.",
    italic: true,
  },
  {
    icon: "/assets/feat_report.png",
    title: "Laporan Kemajuan Digital",
    desc: "Memantau durasi & konsistensi terapi melalui ringkasan aktivitas yang dapat dipantau oleh dokter spesialis mata dan orang tua.",
    italic: false,
  },
];

function FeaturesSection() {
  return (
    <section id="fitur" className="py-12 sm:py-20 px-4 sm:px-6 bg-white scroll-mt-[90px]">
      <div className="max-w-[1100px] mx-auto">
        {/* Tag */}
        <div className="mb-4 sm:mb-5">
          <Tag iconSrc="/assets/icon_sparkles.svg" label="Keunggulan NAYAKA" />
        </div>

        {/* Heading */}
        <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-medium text-[#18181b] leading-[1.2] mb-8 sm:mb-12">
          Mengapa Memilih{" "}
          <span className="text-[#5d4037] font-medium">NAYAKA?</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {features.map((feat, i) => (
            <div
              key={i}
              className="feature-card bg-white border border-[#e4e4e7] rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 flex flex-col justify-between gap-4"
              style={{ minHeight: 140 }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#f4f4f5] border border-[#e4e4e7] rounded-[12px] p-2 shrink-0 flex items-center justify-center w-[58px] h-[58px] sm:w-[68px] sm:h-[68px]">
                  <Image
                    src={feat.icon}
                    alt=""
                    width={52}
                    height={52}
                    unoptimized
                    className="w-10 h-10 sm:w-[52px] sm:h-[52px] object-contain"
                  />
                </div>
                <h3
                  className={`text-[19px] sm:text-[24px] font-medium text-[#18181b] leading-[1.3] ${
                    feat.italic ? "italic" : ""
                  }`}
                >
                  {feat.title}
                </h3>
              </div>
              <p className="text-[14px] sm:text-[16px] text-[#71717b] leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Medical Endorsement Section ──────────────────────────────────────────────

function MedicalSection() {
  return (
    <section id="medis" className="py-12 sm:py-20 px-4 sm:px-6 bg-white scroll-mt-[90px]">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-4 sm:mb-5">
          <Tag iconSrc="/assets/icon_badge_check.svg" label="Dukungan Medis" />
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          {/* Left: Heading + Quote Card */}
          <div className="flex-1 min-w-0 w-full">
            <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-medium text-[#18181b] leading-[1.2] mb-6 sm:mb-8">
              Apresiasi Medis dari<br className="hidden sm:inline" />{" "}
              <span className="text-[#5d4037] font-medium">Klinik Mata EDC</span>
            </h2>

            <div className="bg-[#f8f5f2] rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 border border-[#eff7ff]">
              <div className="flex flex-col gap-4 sm:gap-5">
                <p className="text-[15px] sm:text-[18px] text-[#18181b] leading-[1.65] font-normal">
                  NAYAKA ini merupakan cikal bakal dari suatu aplikasi yang bisa
                  membantu—baik itu anak-anak yang mengalami ambliopia,
                  dokternya, apalagi nanti pasti membantu orang tuanya. Kalau
                  sudah sempurna, saya yakin akan meningkatkan kepatuhan untuk
                  terapi, karena sesungguhnya aplikasi ini adalah suatu terapi.
                </p>
                <div>
                  <p className="text-[16px] sm:text-[18px] font-medium text-[#18181b]">
                    dr. Erry Dewanto, Sp.M
                  </p>
                  <p className="text-[14px] sm:text-[18px] font-medium text-[#71717b] sm:text-[#18181b]">
                    Dokter Spesialis Mata &amp; Direktur Utama EDC Group
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Doctor Photo Polaroid Frame */}
          <div className="shrink-0 flex items-center justify-center p-2 sm:p-4 pt-10 sm:pt-14 overflow-visible">
            <div
              className="relative shrink-0 origin-center scale-[0.9] sm:scale-100"
              style={{
                width: 287,
                height: 335,
                transform: "rotate(3deg)",
              }}
            >
              <div className="w-full h-full bg-white rounded-[4px] p-[16px] pb-[50px] flex flex-col shadow-[0px_0px_18px_rgba(0,0,0,0.2)]">
                <div className="w-full h-full bg-[#5d4037] relative rounded-[2px]" />
              </div>

              <div
                className="absolute pointer-events-none"
                style={{
                  width: 320,
                  height: 400,
                  left: -16,
                  bottom: 50,
                }}
              >
                <Image
                  src="/assets/dokter.png"
                  alt="dr. Erry Dewanto, Sp.M – Dokter Spesialis Mata & Direktur Utama EDC Group"
                  fill
                  unoptimized
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ecosystem Section ────────────────────────────────────────────────────────

function EcosystemSection() {
  return (
    <section id="ekosistem" className="py-6 sm:py-8 px-3 sm:px-6 scroll-mt-[90px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-[#5d4037] rounded-[16px] sm:rounded-[20px] px-5 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-12 overflow-hidden">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12 gap-3">
            <Tag
              iconSrc="/assets/icon_badge_check.svg"
              label="Kelengkapan Ekosistem"
            />
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-medium text-white leading-[1.25] mt-2">
              Ekosistem Terapi Ambliopia Terpadu
            </h2>
            <p className="text-[15px] sm:text-[18px] text-white/90 leading-relaxed max-w-[815px]">
              Integrasi <em className="italic">dichoptic game training</em>, kacamata
              anaglif 3D, buku catatan terapi ambliopia, dan laporan kemajuan digital
              yang siap diterapkan langsung di fasilitas layanan kesehatan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 min-h-0 lg:min-h-[550px]">
            <div className="lg:col-span-4 bg-white rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 flex flex-col justify-between items-center overflow-hidden">
              <div className="relative w-full h-[180px] sm:h-[220px] my-auto flex items-center justify-center">
                <Image
                  src="/assets/kacamata.png"
                  alt="Kacamata Anaglif 3D NAYAKA"
                  fill
                  unoptimized
                  className="object-contain object-center"
                />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 text-center mt-auto w-full pt-4">
                <h3 className="text-[26px] sm:text-[34px] md:text-[40px] font-bold text-[#5d4037] leading-[1.15]">
                  Kacamata Anaglif 3D
                </h3>
                <p className="text-[15px] sm:text-[18px] text-[#18181b] leading-relaxed">
                  Kacamata terapi dengan bingkai kayu ramah lingkungan dan lensa
                  anaglif untuk memisahkan stimulus visual kedua mata saat
                  bermain game.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
              <div className="bg-white rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 flex-1 overflow-hidden">
                <div className="relative shrink-0 flex items-center justify-center w-full sm:w-[220px] h-[170px] sm:h-[190px]">
                  <div className="relative w-[210px] h-[160px]">
                    <Image
                      src="/assets/mockupnayaka.png"
                      alt="Platform Digital NAYAKA"
                      fill
                      unoptimized
                      className="object-contain object-center"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0 text-center sm:text-left">
                  <h3 className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-[#5d4037] leading-[1.15]">
                    Platform Digital NAYAKA
                  </h3>
                  <p className="text-[15px] sm:text-[18px] text-[#18181b] leading-relaxed">
                    Aplikasi terapi berbasis game interaktif dengan fitur kalibrasi kontras
                    adaptif, pemantauan kepatuhan terapi menggunakan AI, dan integrasi data
                    klinis.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 flex-1 overflow-hidden">
                <div className="relative shrink-0 flex items-center justify-center w-full sm:w-[200px] h-[160px] sm:h-[170px]">
                  <div className="relative w-[140px] sm:w-[150px] h-[170px] sm:h-[185px] -rotate-6">
                    <Image
                      src="/assets/bukucatatan.png"
                      alt="Buku Catatan Terapi Ambliopia NAYAKA"
                      fill
                      unoptimized
                      className="object-contain object-center drop-shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0 text-center sm:text-left">
                  <h3 className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-[#5d4037] leading-[1.15]">
                    Buku Catatan Terapi Ambliopia
                  </h3>
                  <p className="text-[15px] sm:text-[18px] text-[#18181b] leading-relaxed">
                    Buku panduan dan rekap terapi pasien di rumah. Berfungsi sebagai
                    pendamping <em className="italic font-medium">offline</em>{" "}
                    pelengkap Laporan Digital yang praktis ditinjau dokter saat
                    konsultasi langsung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────

const packages = [
  {
    name: "Paket Clip-On",
    price: "Rp1,926,860",
    highlighted: false,
    features: [
      "10 Akun Pasien (Akses Game & Dashboard)",
      "10 Clip-On Lensa Anaglif 3D",
      "10 Buku Catatan Terapi Ambliopia",
      "Akses Platform Digital NAYAKA Base",
    ],
  },
  {
    name: "Paket Lengkap",
    price: "Rp5,176,860",
    highlighted: true,
    features: [
      "10 Akun Pasien (Akses Game & Dashboard)",
      "10 Bingkai Kacamata Kayu Ramah Lingkungan",
      "10 Clip-On Lensa Anaglif 3D",
      "10 Buku Catatan Terapi Ambliopia",
      "Akses Platform Digital NAYAKA Base",
    ],
  },
  {
    name: "Paket Starter",
    price: "Rp3,551,860",
    highlighted: false,
    features: [
      "10 Akun Pasien (Akses Game & Dashboard)",
      "5 Bingkai Kacamata Kayu Ramah Lingkungan",
      "10 Clip-On Lensa Anaglif 3D",
      "10 Buku Catatan Terapi Ambliopia",
      "Akses Platform Digital NAYAKA Base",
    ],
  },
];

function PricingSection() {
  return (
    <section id="paket" className="pt-12 sm:pt-20 pb-20 sm:pb-32 px-4 sm:px-6 bg-white scroll-mt-[90px]">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex justify-center mb-4 sm:mb-5">
          <Tag iconSrc="/assets/icon_hashtag.svg" label="Paket Kemitraan" />
        </div>

        <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-medium text-center text-[#18181b] leading-[1.2] mb-3">
          <span className="text-[#5d4037]">Paket Tepat</span> untuk Fasilitas
          Layanan Anda.
        </h2>
        <p className="text-[15px] sm:text-[18px] text-[#71717b] text-center leading-relaxed max-w-[750px] mx-auto mb-8 sm:mb-12">
          Pilih skema kemitraan yang paling sesuai dengan kapasitas dan kebutuhan
          operasional fasilitas kesehatan Anda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`rounded-[18px] sm:rounded-[20px] p-6 sm:p-7 flex flex-col justify-between border min-h-[480px] lg:min-h-[600px] ${
                pkg.highlighted
                  ? "bg-[#5d4037] border-[#5d4037] shadow-xl"
                  : "bg-white border-[#e4e4e7]"
              }`}
            >
              <div className="flex flex-col">
                <p
                  className={`text-[16px] sm:text-[18px] font-medium mb-2 ${
                    pkg.highlighted ? "text-white" : "text-[#5d4037]"
                  }`}
                >
                  {pkg.name}
                </p>

                <p
                  className={`text-[32px] sm:text-[40px] font-bold leading-none mb-5 sm:mb-6 ${
                    pkg.highlighted ? "text-white" : "text-[#5d4037]"
                  }`}
                >
                  {pkg.price}
                </p>

                <div
                  className={`w-full h-px mb-6 sm:mb-7 ${
                    pkg.highlighted ? "bg-white/30" : "bg-[#e4e4e7]"
                  }`}
                />

                <ul className="flex flex-col gap-3.5 sm:gap-4">
                  {pkg.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="shrink-0 w-[28px] h-[28px] sm:w-[35px] sm:h-[35px] mt-0.5">
                        <Image
                          src={
                            pkg.highlighted
                              ? "/assets/icon_check_white.svg"
                              : "/assets/icon_check_brown.svg"
                          }
                          alt=""
                          width={35}
                          height={35}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        className={`text-[15px] sm:text-[18px] leading-[22px] font-normal ${
                          pkg.highlighted ? "text-white" : "text-[#18181b]"
                        }`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="https://wa.me/6285257668104?text=Halo+NAYAKA%2C+saya+tertarik+untuk+mengajukan+uji+coba+NAYAKA+di+fasilitas+kesehatan+kami.%0A%0ANama+Fasilitas%3A%0AKota%2FKabupaten%3A%0ANama+PIC%3A%0AJabatan%3A%0A%0AMohon+informasi+mengenai+prosedur+dan+persyaratan+uji+coba.+Terima+kasih.&utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-[12px] text-[16px] sm:text-[18px] font-medium transition-all duration-200 mt-8 ${
                  pkg.highlighted
                    ? "bg-white text-[#5d4037] hover:bg-[#f8f5f2]"
                    : "bg-[#5d4037] text-white hover:bg-[#432c25]"
                }`}
              >
                Mulai Uji Coba
                <Image
                  src="/assets/icon_arrow_right.svg"
                  alt=""
                  width={21}
                  height={21}
                  className="w-[21px] h-[21px]"
                  style={
                    pkg.highlighted
                      ? {
                          filter:
                            "brightness(0) saturate(100%) invert(26%) sepia(18%) saturate(1633%) hue-rotate(345deg) brightness(97%) contrast(89%)",
                        }
                      : {}
                  }
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <MedicalSection />
        <EcosystemSection />
        <PricingSection />
      </main>
    </div>
  );
}