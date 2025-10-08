import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

// 💌 Personaliza aquí
const NOMBRE = "mi amor";

// ⬇️ Importa tus fotos locales
import f1 from "./assets/foto-1.jpg";
import f2 from "./assets/foto-2.jpg";
import f3 from "./assets/foto-3.jpg";
import f4 from "./assets/foto-4.jpg";
import f5 from "./assets/foto-5.jpg";
import f6 from "./assets/foto-6.jpg";

// Galería con tus imágenes
const fotos = [
  { url: f1, alt: "", pos: "50% 8%" },
  { url: f2, alt: "", pos: "50% 12%" },
  { url: f3, alt: "" },
  { url: f4, alt: "" },
  { url: f5, alt: "" },
  { url: f6, alt: "" },
];

const dedicatoria = `
Desde que estás en mi vida, todo es más bonito. Gracias por tu risa,
por tu paciencia y por hacer de cada día una pequeña aventura.
Te quiero mucho mi gran amor. ❤️
`;

const hearts = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 6,
  size: 18 + Math.random() * 26,
  opacity: 0.45 + Math.random() * 0.4,
}));

function FechaHoy() {
  const fecha = new Date();
  const opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const texto = fecha.toLocaleDateString("es-PE", opciones);
  return <span className="capitalize">{texto}</span>;
}

function diasJuntos() {
  const inicio = new Date("2025-06-08"); // 📅 coloca la fecha de aniversario
  const hoy = new Date();
  const diff = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
  return diff;
}

// 💬 Efecto de escritura para mensajes románticos
function MensajeSorpresa({
  text = "Eres mi razón favorita para sonreír 💫",
  speed = 60,
  startDelay = 400,
  loop = false,
  className = "",
  cursor = true,
}) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    let timeoutId;
    let intervalId;
    const start = () => {
      intervalId = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          if (loop) {
            timeoutId = setTimeout(() => {
              i = 0;
              setShown("");
              start();
            }, 1200);
          }
        }
      }, speed);
    };
    timeoutId = setTimeout(start, startDelay);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay, loop]);

  const lines = shown.split("\n");
  return (
    <div className={`text-center text-rose-700 text-xl sm:text-2xl ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx}>
          {line}
          {idx < lines.length - 1 && <br />}
        </span>
      ))}
      {cursor && (
        <span className="ml-1 inline-block w-[10px] h-6 align-middle bg-rose-600 animate-pulse opacity-80" />
      )}
    </div>
  );
}

export default function LovePage() {
  // 🎵 Control del audio
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  const audioSrc = new URL("mi-nina-bonita.mp3", import.meta.env.BASE_URL).toString(); // ruta correcta para GitHub Pages

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.4;

    const tryPlay = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        const onFirstInteract = () => {
          audioRef.current?.play().then(() => setIsPlaying(true));
          window.removeEventListener("pointerdown", onFirstInteract);
        };
        window.addEventListener("pointerdown", onFirstInteract, { once: true });
      }
    };
    tryPlay();
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100 text-rose-900 relative overflow-hidden">
      {/* 🎵 Reproductor de fondo (uno solo) */}
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* 💖 Corazones flotantes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: h.opacity }}
            transition={{ repeat: Infinity, repeatType: "loop", ease: "easeInOut", duration: h.duration, delay: h.delay }}
            aria-hidden
            className="absolute select-none"
            style={{ left: `${h.left}%`, fontSize: h.size }}
          >
            ❤
          </motion.span>
        ))}
      </div>

      {/* 🌸 Contenido principal */}
      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14">
        {/* 🗓️ Encabezado */}
        <section className="mb-8">
          <div className="mx-auto rounded-2xl bg-white/80 shadow-xl backdrop-blur p-6 sm:p-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="text-sm text-rose-500 font-medium tracking-wide">
                <FechaHoy />
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                Feliz <span className="text-rose-600">día mi amor💞</span> ✨
              </h1>
              <p className="text-rose-700 max-w-2xl">
                Hoy celebramos nuestro capítulo favorito. Gracias por caminar conmigo, por los abrazos que curan y por los sueños que tejemos juntos.
              </p>
              <div className="mt-2 text-4xl sm:text-5xl select-none" aria-hidden>
                🐧❤️🐧
              </div>
            </div>
          </div>
        </section>

        {/* ✨ Mensaje sorpresa con efecto de escritura */}
        <MensajeSorpresa
          text={"Desde que llegaste a mi vida,\nmi mundo es más bonito contigo 💖"}
          speed={60}
          startDelay={800}
          loop={false}
          className="mt-6 mb-2"
        />

        {/* 📸 Galería de fotos */}
        <section className="mb-8">
          <div className="mx-auto rounded-2xl bg-white/80 shadow-xl backdrop-blur p-5 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Nuestros momentos</h2>
            <p className="text-center text-rose-700 mb-6">Pequeñas piezas de un amor enorme. 💞</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {fotos.map((f, idx) => (
                <motion.figure
                  key={f.url + idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-xl shadow-md bg-rose-50"
                >
                  <img
                    src={f.url}
                    alt={f.alt ?? `Foto ${idx + 1}`}
                    className="w-full aspect-[2/3] sm:aspect-[4/3] md:aspect-[3/2] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: f.pos || "50% 50%" }}
                    loading="lazy"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-sm p-2">
                    {f.alt ?? "Juntos"}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ✨ Dedicatoria */}
        <section>
          <div className="mx-auto rounded-2xl bg-white/80 shadow-xl backdrop-blur p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Para ti</h2>
            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative max-w-3xl mx-auto text-center text-lg sm:text-xl leading-relaxed text-rose-800"
            >
              <span className="absolute -left-1 -top-3 text-3xl" aria-hidden>“</span>
              {dedicatoria.split("\n").map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
              <span className="absolute -right-1 -bottom-3 text-3xl" aria-hidden>”</span>
            </motion.blockquote>
            <div className="mt-6 flex justify-center text-5xl" aria-hidden>
              🐧🤍🐧
            </div>
          </div>
        </section>

        {/* 💘 Contador de amor */}
        <div className="mt-8 text-center text-rose-700 text-lg sm:text-xl">
          Han pasado <span className="font-bold text-rose-600">{diasJuntos()}</span> días desde que empezó nuestra historia 💘
        </div>

        {/* 🎵 Botón corazón animado */}
        <motion.button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          title={isPlaying ? "Pausar música" : "Reproducir música"}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-300"
          style={{ background: isPlaying ? "#e11d48" : "#9ca3af" }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0.25, scale: 1 }}
                animate={{ opacity: [0.25, 0], scale: [1, 1.6] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                style={{ background: "rgba(244, 63, 94, 0.25)" }}
              />
              <motion.span
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0.2, scale: 1 }}
                animate={{ opacity: [0.2, 0], scale: [1, 2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                style={{ background: "rgba(244, 63, 94, 0.15)" }}
              />
            </>
          )}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
            className="relative"
            animate={
              isPlaying
                ? {
                    scale: [1, 1.18, 1],
                    filter: [
                      "drop-shadow(0 0 0px rgba(255,0,90,0.0))",
                      "drop-shadow(0 0 12px rgba(255,0,90,0.7))",
                      "drop-shadow(0 0 0px rgba(255,0,90,0.0))",
                    ],
                    rotate: [0, -2, 0, 2, 0],
                  }
                : { scale: 1, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))", rotate: 0 }
            }
            transition={{ duration: 1.1, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
          >
            <path d="M12.1 21.35l-1.1-1.02C5.14 15.24 2 12.39 2 8.98 2 6.42 4.05 4.5 6.6 4.5c1.54 0 3.04.73 4 1.87 0.96-1.14 2.46-1.87 4-1.87 2.55 0 4.6 1.92 4.6 4.48 0 3.41-3.14 6.26-8.99 11.36l-1.11 1.01z" />
          </motion.svg>
        </motion.button>

        {/* ✍️ Firma */}
        <footer className="mt-10 text-center text-sm text-rose-600">
          Hecho con mucho amor por Junior • <span className="font-medium">para {NOMBRE}</span>
        </footer>
      </main>
    </div>
  );
}
