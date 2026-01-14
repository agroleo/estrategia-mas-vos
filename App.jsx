import React, { useMemo, useState } from "react";
import {
  ShieldCheck,
  Star,
  Target,
  Calendar,
  Users,
  Leaf,
  Handshake,
  BadgeCheck,
  ClipboardList,
  FileText,
  CheckCircle2,
  Plus,
  Trash2,
  Send,
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  Building2,
  BadgeInfo,
  Sparkles,
  HeartHandshake,
  GraduationCap,
  Factory,
  TrendingUp,
  MapPin,
  Shield,
} from "lucide-react";

/**
 * ✅ REGLAS DE ORO (Vercel):
 * - UN SOLO ARCHIVO (App.jsx): todo dentro de este archivo.
 * - SIN NUEVAS LIBRERÍAS: solo react + lucide-react + tailwind classes.
 * - NAVEGACIÓN POR ESTADO: useState para steps, sin router.
 * - SIN CALENDARIOS AUTOMÁTICOS: NO se calculan fechas ni grillas. Solo formulario -> texto -> WhatsApp.
 */

export default function App() {
  const WHATSAPP_NUMBER = "3515173310";

  // ---------- Helpers ----------
  const months = useMemo(
    () => [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    []
  );

  const talkTracks = useMemo(
    () => [
      "Manejo Integrado de Plagas (MIP)",
      "Monitoreo y Control",
      "Calibración de Maquinaria de Pulverización",
      "Mezclas Eficientes de Productos Químicos",
      "Uso e Importancia de Coadyuvantes",
      "Sustentabilidad y Protocolos (+VOS)",
    ],
    []
  );

  const objectiveOptions = useMemo(
    () => [
      "Posicionamiento técnico",
      "Generación de demanda",
      "Lanzamiento de productos",
      "Fidelización de clientes",
      "Acceso a grandes cuentas",
      "Validación técnica / ensayos",
      "Certificaciones / sostenibilidad",
      "Otro",
    ],
    []
  );

  const impactIndicators = useMemo(
    () => [
      "Reducción de dosis",
      "Menor impacto ambiental",
      "Mejora de eficiencia",
      "Compatibilidad con certificaciones",
      "Otro",
    ],
    []
  );

  const serviceOptions = useMemo(
    () => [
      "Ensayos regionales",
      "Plataforma de trazabilidad",
      "Protocolos por cultivo",
      "Capacitación continua",
      "Modelos de financiamiento verde",
      "Club técnico de productores",
      "Otro",
    ],
    []
  );

  // Sinergias: separamos Técnico / Comercial
  const synergyTechTypes = useMemo(
    () => [
      "Fertilidad + Sanidad",
      "Sanidad + Coadyuvantes",
      "Sanidad + Tecnología de aplicación",
      "Bioinsumos + Químicos",
      "Nutrición + Estrés abiótico",
      "Otro",
    ],
    []
  );

  const synergyCommercialActions = useMemo(
    () => [
      "Giras técnicas a campo (multi-empresa)",
      "Capacitaciones exclusivas para cuentas clave",
      "Activaciones en distribuidores",
      "Contenido técnico co-brandeado (fichas, videos, casos)",
      "Campañas por cultivo y momento crítico",
      "Demostraciones comparativas / días de campo",
      "Replicar acciones en La Rioja",
      "Otro",
    ],
    []
  );

  const toggleInArray = (arr, item) =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  const pickWithOther = (arr, otherValue) => {
    const base = (arr || []).filter((x) => x !== "Otro");
    if ((arr || []).includes("Otro") && otherValue?.trim()) return [...base, otherValue.trim()];
    return base;
  };

  const isFilled = (v) => (v || "").trim().length > 0;

  // ---------- Form State ----------
  const initial = {
    // Bloque 1
    empresa: "",
    responsable: "",
    cargo: "",
    email: "",
    telefono: "",
    zona: "San Juan", // SJ, LR, ambas
    objetivos: [],
    objetivoOtro: "",
    kpis: "",

    // Bloque 2 — Productos (cards)
    portfolio: [
      {
        producto: "",
        tipo: "",
        cultivosObjetivo: "",
        diferencial: "",
        estado: "Consolidado",
      },
    ],

    // Bloque 3 — Matriz Técnica (cards)
    matrizTecnica: [
      {
        cultivo: "",
        problema: "",
        mesCritico: "Septiembre",
        solucion: "",
        formato: "Charla",
      },
    ],

    // Bloque 4 — Intervenciones (cards)
    intervenciones: [
      {
        mes: "Septiembre",
        cultivo: "",
        tema: "MIP",
        temaOtro: "",
        producto: "",
        formato: "Charla técnica",
        origen: "Estratégico", // o Técnico
      },
    ],

    // Bloque 5 — Sinergias (Técnicas + Comerciales)
    sinergiasTecnicasTipos: [],
    sinergiaTecnicaOtro: "",
    combosTecnicos: [
      {
        componentes: "",
        beneficio: "",
        cultivo: "",
        formato: "Demo",
      },
    ],
    sinergiasComercialesAcciones: [],
    sinergiaComercialOtro: "",
    sinergiasComercialesNotas: "",

    // Bloque 6 — Charlas
    participacionCharlas: talkTracks.map((t) => ({
      tema: t,
      interes: "A evaluar",
      rol: "A evaluar",
      comentarios: "",
    })),

    // Bloque 7 — Protocolo/Sello (Aporto + Necesito)
    // 7A Aporto
    aporteProductos: "",
    aporteEvidencias: "",
    indicadoresImpacto: [],
    indicadorOtro: "",
    condicionesLimites: "",
    // 7B Necesito
    necesitaRequisitosValidacion: "",
    necesitaAuditoriaRegistro: "",
    necesitaUsoMarcaSello: "",
    necesitaValorEsperado: "",

    // Bloque 8 — Servicios
    serviciosComunidad: [],
    servicioOtro: "",

    // Bloque 9/10
    esperaRecibir: "",
    dispuestoAportar: "",
    compromiso: "Participación anual",
    vision3Anios: "",
  };

  const [data, setData] = useState(initial);
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const update = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const addCard = (field, card) =>
    setData((d) => ({
      ...d,
      [field]: [...d[field], card],
    }));

  const updateCard = (field, idx, patch) =>
    setData((d) => ({
      ...d,
      [field]: d[field].map((c, i) => (i === idx ? { ...c, ...patch } : c)),
    }));

  const removeCard = (field, idx) =>
    setData((d) => ({
      ...d,
      [field]: d[field].filter((_, i) => i !== idx),
    }));

  const resetAll = () => {
    setData(initial);
    setStep(0);
    showToast("Formulario reiniciado.");
  };

  // ---------- WhatsApp Report ----------
  const buildReport = () => {
    const objetivos = pickWithOther(data.objetivos, data.objetivoOtro);
    const indicadores = pickWithOther(data.indicadoresImpacto, data.indicadorOtro);
    const servicios = pickWithOther(data.serviciosComunidad, data.servicioOtro);

    const sinergiasTec = pickWithOther(data.sinergiasTecnicasTipos, data.sinergiaTecnicaOtro);
    const sinergiasCom = pickWithOther(data.sinergiasComercialesAcciones, data.sinergiaComercialOtro);

    const lines = [];
    lines.push("COMUNIDAD +VOS SINERGIA AGRO — ENCUESTA ESTRATÉGICA 2026");
    lines.push("========================================================");
    lines.push("");

    lines.push("BLOQUE 1 — PERFIL Y FOCO COMERCIAL");
    lines.push(`Empresa: ${data.empresa || "—"}`);
    lines.push(
      `Responsable: ${data.responsable || "—"}${data.cargo ? ` (${data.cargo})` : ""}`
    );
    lines.push(`Contacto: ${data.email || "—"} | ${data.telefono || "—"}`);
    lines.push(`Zona de acción: ${data.zona || "—"}`);
    lines.push(`Objetivos: ${objetivos.length ? objetivos.join(", ") : "—"}`);
    lines.push(`KPI esperados: ${data.kpis || "—"}`);
    lines.push("");

    lines.push("BLOQUE 2 — PORTFOLIO ESTRATÉGICO (Productos/tecnologías foco 2026)");
    (data.portfolio || []).forEach((p, i) => {
      const has = [p.producto, p.tipo, p.cultivosObjetivo, p.diferencial].some((x) =>
        isFilled(x)
      );
      if (!has) return;
      lines.push(
        `• (${i + 1}) Producto: ${p.producto || "—"} | Tipo: ${p.tipo || "—"} | Cultivos: ${
          p.cultivosObjetivo || "—"
        } | Diferencial: ${p.diferencial || "—"} | Estado: ${p.estado || "—"}`
      );
    });
    lines.push("");

    lines.push("BLOQUE 3 — MATRIZ TÉCNICA (Cultivo × Problema × Mes × Solución × Formato)");
    (data.matrizTecnica || []).forEach((r, i) => {
      const has = [r.cultivo, r.problema, r.solucion].some((x) => isFilled(x));
      if (!has) return;
      lines.push(
        `• (${i + 1}) Cultivo: ${r.cultivo || "—"} | Problema: ${r.problema || "—"} | Mes crítico: ${
          r.mesCritico || "—"
        } | Solución: ${r.solucion || "—"} | Formato: ${r.formato || "—"}`
      );
    });
    lines.push("");

    lines.push("BLOQUE 4 — INTERVENCIONES PROPUESTAS (NO automático)");
    (data.intervenciones || []).forEach((r, i) => {
      const temaFinal = r.tema === "Otro" ? (r.temaOtro || "—") : r.tema;
      const has = [r.mes, r.cultivo, temaFinal].some((x) => isFilled(x));
      if (!has) return;
      lines.push(
        `• (${i + 1}) Origen: ${r.origen || "—"} | Mes: ${r.mes || "—"} | Cultivo: ${
          r.cultivo || "—"
        } | Tema: ${temaFinal || "—"} | Producto: ${r.producto || "—"} | Formato: ${
          r.formato || "—"
        }`
      );
    });
    lines.push("");

    lines.push("BLOQUE 5 — SINERGIAS (Técnicas y Comerciales)");
    lines.push("5A) Sinergias técnicas (paquetes/validación):");
    lines.push(`• Tipos: ${sinergiasTec.length ? sinergiasTec.join(", ") : "—"}`);
    (data.combosTecnicos || []).forEach((c, i) => {
      const has = [c.componentes, c.beneficio, c.cultivo].some((x) => isFilled(x));
      if (!has) return;
      lines.push(
        `• Combo (${i + 1}) Componentes: ${c.componentes || "—"} | Beneficio: ${
          c.beneficio || "—"
        } | Cultivo: ${c.cultivo || "—"} | Formato: ${c.formato || "—"}`
      );
    });
    lines.push("5B) Sinergias comerciales (co-marketing/demanda):");
    lines.push(`• Acciones: ${sinergiasCom.length ? sinergiasCom.join(", ") : "—"}`);
    lines.push(`• Notas: ${data.sinergiasComercialesNotas || "—"}`);
    lines.push("");

    lines.push("BLOQUE 6 — PARTICIPACIÓN EN CHARLAS +VOS");
    (data.participacionCharlas || []).forEach((p) => {
      lines.push(
        `• ${p.tema}: Interés=${p.interes}; Rol=${p.rol}${p.comentarios ? `; Nota=${p.comentarios}` : ""}`
      );
    });
    lines.push("");

    lines.push("BLOQUE 7 — PROTOCOLO / SELLO / SOSTENIBILIDAD");
    lines.push("7A) ¿Qué puede aportar su empresa?");
    lines.push(`• Productos/tecnologías: ${data.aporteProductos || "—"}`);
    lines.push(`• Evidencias/soporte: ${data.aporteEvidencias || "—"}`);
    lines.push(`• Indicadores de impacto: ${indicadores.length ? indicadores.join(", ") : "—"}`);
    lines.push(`• Condiciones/límites: ${data.condicionesLimites || "—"}`);
    lines.push("7B) ¿Qué necesita su empresa para sumarse?");
    lines.push(`• Requisitos de validación: ${data.necesitaRequisitosValidacion || "—"}`);
    lines.push(`• Auditoría/registro: ${data.necesitaAuditoriaRegistro || "—"}`);
    lines.push(`• Uso de marca/sello: ${data.necesitaUsoMarcaSello || "—"}`);
    lines.push(`• Valor esperado del sello: ${data.necesitaValorEsperado || "—"}`);
    lines.push("");

    lines.push("BLOQUE 8 — SERVICIOS A CONSTRUIR EN COMUNIDAD");
    lines.push(`${servicios.length ? servicios.join(", ") : "—"}`);
    lines.push("");

    lines.push("BLOQUE 9 — EXPECTATIVAS Y COMPROMISO");
    lines.push(`Espera recibir: ${data.esperaRecibir || "—"}`);
    lines.push(`Dispuesto a aportar: ${data.dispuestoAportar || "—"}`);
    lines.push(`Nivel de compromiso: ${data.compromiso || "—"}`);
    lines.push("");

    lines.push("BLOQUE 10 — VISIÓN DE ALIANZA (3 años)");
    lines.push(`${data.vision3Anios || "—"}`);

    return lines.join("\n");
  };

  const sendToWhatsApp = () => {
    if (!isFilled(data.empresa) || !isFilled(data.responsable)) {
      showToast("Complete Empresa y Responsable antes de enviar.");
      return;
    }
    const msg = buildReport();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  // ---------- UI pieces ----------
  const Container = ({ children }) => (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {children}
      {toast ? (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-full bg-slate-900 text-white px-5 py-3 text-sm font-black shadow-xl">
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  );

  const Card = ({ children, className = "" }) => (
    <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );

  const SectionHeader = ({ icon: Icon, title, subtitle, right }) => (
    <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-lg font-black tracking-tight text-slate-900">{title}</div>
          {subtitle ? <div className="text-sm text-slate-500">{subtitle}</div> : null}
        </div>
      </div>
      {right}
    </div>
  );

  const Field = ({ label, hint, children }) => (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-2">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">
          {label}
        </label>
        {hint ? <div className="text-[11px] text-slate-400">{hint}</div> : null}
      </div>
      {children}
    </div>
  );

  const Input = ({ value, onChange, placeholder }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-200"
    />
  );

  const TextArea = ({ value, onChange, placeholder, rows = 4 }) => (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-200"
    />
  );

  const Select = ({ value, onChange, options }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-200"
    >
      {options.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  );

  const Chip = ({ active, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition",
        active
          ? "bg-emerald-700 text-white border-emerald-700"
          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300",
      ].join(" ")}
    >
      {active ? <CheckCircle2 className="h-4 w-4" /> : null}
      {children}
    </button>
  );

  const Divider = () => <div className="h-px w-full bg-slate-100 my-6" />;

  const CardRow = ({ title, subtitle, children, onRemove, removable = true }) => (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-black text-slate-900">{title}</div>
          {subtitle ? <div className="text-[11px] text-slate-500 mt-1">{subtitle}</div> : null}
        </div>
        {removable ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-50"
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
            Quitar
          </button>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );

  // ---------- Steps ----------
  const steps = [
    { key: "intro", label: "Intro", icon: Star },
    { key: "perfil", label: "Perfil", icon: Target },
    { key: "portfolio", label: "Productos", icon: Leaf },
    { key: "matriz", label: "Matriz", icon: Calendar },
    { key: "interv", label: "Interv.", icon: ClipboardList },
    { key: "sinergias", label: "Sinergias", icon: Handshake },
    { key: "charlas", label: "Charlas", icon: Users },
    { key: "sello", label: "Sello", icon: BadgeCheck },
    { key: "servicios", label: "Servicios", icon: Leaf },
    { key: "final", label: "Final", icon: Send },
  ];

  const canPrev = step > 0;
  const canNext = step < steps.length - 1;

  const StepBar = () => (
    <div className="sticky top-[76px] z-30 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-2 overflow-x-auto">
        {steps.map((s, idx) => {
          const active = idx === step;
          const done = idx < step;
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setStep(idx)}
              className={[
                "flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black border whitespace-nowrap transition",
                active
                  ? "bg-slate-900 text-white border-slate-900"
                  : done
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  const Header = () => (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-black tracking-tight uppercase text-slate-900">
              Comunidad +VOS Sinergia Agro
            </div>
            <div className="text-[11px] font-semibold text-slate-500">
              Formulario paso a paso — Envío a WhatsApp {WHATSAPP_NUMBER}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetAll}
            className="hidden md:inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50"
          >
            <Trash2 className="h-4 w-4" />
            Reiniciar
          </button>
          <button
            type="button"
            onClick={sendToWhatsApp}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white hover:bg-emerald-800"
          >
            <Send className="h-4 w-4" />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );

  // ---------- Step Content ----------
  const StepIntro = () => (
    <Card>
      <SectionHeader
        icon={FileText}
        title="Plan Estratégico +VOS 2026"
        subtitle="Objetivos estratégicos 2026: subir la vara técnica, ordenar la comunicación y ganar competitividad en territorio."
      />
      <div className="p-6 space-y-5 text-sm text-slate-700 leading-relaxed">
        {/* Intro principal */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-700" />
            <div className="font-black text-slate-900">Contexto 2026</div>
          </div>
          <p className="mt-3">
            Agroconsulta se prepara para el año 2026 con una visión de innovación transversal en su
            relación con el mercado, basada en un compromiso profundo con la sostenibilidad, la
            profesionalización del sector y la generación de valor compartido.
          </p>
          <p className="mt-3">
            En este marco, la empresa inicia su proceso de certificación como{" "}
            <span className="font-black">Empresa B</span>, fortaleciendo su ADN histórico de
            asesoramiento técnico y elevando el estándar de servicio para clientes y aliados.
          </p>
        </div>

        {/* Objetivos estratégicos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-700" />
              <div className="font-black text-slate-900">
                1) Protocolo de Buenas Prácticas con Sello
              </div>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <p className="text-slate-700">
                Un estándar técnico +VOS para ordenar prácticas y respaldar con evidencia el desempeño
                productivo, ambiental y social.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>Buenas prácticas, trazabilidad, uso responsable de insumos y calidad de aplicación.</li>
                <li>Eficiencia en agua/energía, criterios ambientales y sociales.</li>
                <li>Soporte para mercados exigentes, grandes cuentas y financiamiento asociado a sostenibilidad.</li>
              </ul>
              <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <BadgeInfo className="h-4 w-4 text-emerald-700" />
                  <div className="text-xs font-black uppercase tracking-widest text-slate-600">
                    Participación de empresas
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-700">
                  Aportar productos/tecnologías, soporte técnico, validación a campo, evidencia y capacitación para
                  integrar soluciones certificables.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-emerald-700" />
              <div className="font-black text-slate-900">2) Comunidad +VOS Sinergia Agro</div>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <p className="text-slate-700">
                Una identidad integradora para articular comunicación, capacitación y acciones técnicas y comerciales
                con empresas aliadas y productores.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>Relaciones de largo plazo y mensajes técnicos unificados hacia el productor.</li>
                <li>Soluciones integrales (paquetes, demos, ensayos, protocolos) con roles claros.</li>
                <li>
                  Impacto en <span className="font-black">San Juan</span> con proyección estratégica hacia{" "}
                  <span className="font-black">La Rioja</span>.
                </li>
              </ul>
              <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-700" />
                  <div className="text-xs font-black uppercase tracking-widest text-slate-600">
                    Resultado esperado
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-700">
                  Adelantarnos a la demanda, ganar competitividad y eficientizar recursos (equipo, logística,
                  contenidos) con un plan 2026 ordenado y medible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Programa interno */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-emerald-700" />
            <div className="font-black text-slate-900">
              Programa de Capacitación Interna — Camino a Empresa B (2026)
            </div>
          </div>
          <p className="mt-3 text-slate-700">
            En paralelo, Agroconsulta implementará un programa interno de formación para fortalecer cultura,
            estándares de servicio y gestión del impacto. Parte de esta estructura se pondrá a disposición de{" "}
            <span className="font-black">clientes estratégicos</span> y{" "}
            <span className="font-black">empresas de la Comunidad +VOS</span> para elevar el nivel de trabajo conjunto.
          </p>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-700" />
                <div className="text-sm font-black text-slate-900">Eje 1 — Cultura y Ética</div>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Inducción (Onboarding) y Triple Impacto: misión y qué significa ser Empresa B.</li>
                <li>Código de Ética y Conducta: valores y compromisos asumidos.</li>
                <li>Políticas de No Discriminación y Antiacoso: protocolos y canales de denuncia.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Factory className="h-4 w-4 text-emerald-700" />
                <div className="text-sm font-black text-slate-900">Eje 2 — Bienestar y Desarrollo</div>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Seguridad e Higiene: prevención de riesgos y cuidado en el ambiente laboral.</li>
                <li>Evaluación de Desempeño: criterios técnicos, sociales y ambientales.</li>
                <li>Capacitación Continua: habilidades específicas por puesto y responsabilidad.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-emerald-700" />
                <div className="text-sm font-black text-slate-900">Eje 3 — Impacto Social y Ambiental</div>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Manual de Medio Ambiente: residuos, energía y reducción de huella de carbono.</li>
                <li>Diversidad, Equidad e Inclusión (DEI): sensibilización y prácticas internas.</li>
                <li>Voluntariado y Acción Social: 20 horas anuales para proyectos comunitarios.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <div className="text-sm font-black text-slate-900">Eje 4 — Calidad y Clientes</div>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Buenas Prácticas y Manual de Productos: estándares de calidad y sostenibilidad al cliente.</li>
                <li>Estándares de servicio: trazabilidad, seguimiento técnico y acompañamiento continuo.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cierre motivante */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-2">
            <MessageSquareText className="h-5 w-5 text-emerald-700" />
            <div className="font-black text-slate-900">Objetivo de esta encuesta</div>
          </div>
          <p className="mt-3 text-slate-700">
            Esta encuesta permite relevar foco comercial, soluciones técnicas y oportunidades de articulación para
            construir un plan 2026 con acciones complementarias a las iniciativas de Agroconsulta. Con las respuestas,
            vamos a:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-slate-700">
            <li>Coordinar intervenciones técnicas por cultivo y momento crítico.</li>
            <li>Alinear productos, mensajes y formatos (charla/demo/ensayo/pack) con roles claros.</li>
            <li>Sumar iniciativas para adelantarnos a la demanda y mejorar competitividad.</li>
            <li>Eficientizar recursos (equipo, logística, contenidos) y evitar superposiciones.</li>
            <li>Escalar a La Rioja acciones seleccionadas junto a empresas que quieran crecer allí.</li>
          </ul>
        </div>
      </div>
    </Card>
  );

  const StepPerfil = () => (
    <Card>
      <SectionHeader
        icon={Target}
        title="Bloque 1 — Perfil y foco comercial"
        subtitle="Identificación, objetivos 2026 y KPI esperados."
      />
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Empresa">
            <Input
              value={data.empresa}
              onChange={(v) => update("empresa", v)}
              placeholder="Nombre de la empresa"
            />
          </Field>
          <Field label="Zona principal de acción">
            <Select
              value={data.zona}
              onChange={(v) => update("zona", v)}
              options={["San Juan", "La Rioja", "Ambas"]}
            />
          </Field>
          <Field label="Responsable">
            <Input
              value={data.responsable}
              onChange={(v) => update("responsable", v)}
              placeholder="Nombre y apellido"
            />
          </Field>
          <Field label="Cargo">
            <Input value={data.cargo} onChange={(v) => update("cargo", v)} placeholder="Cargo / rol" />
          </Field>
          <Field label="Email">
            <Input value={data.email} onChange={(v) => update("email", v)} placeholder="correo@empresa.com" />
          </Field>
          <Field label="Teléfono">
            <Input
              value={data.telefono}
              onChange={(v) => update("telefono", v)}
              placeholder="Teléfono de contacto"
            />
          </Field>
        </div>

        <Divider />

        <Field
          label="Objetivos de la empresa para 2026 dentro de +VOS"
          hint="Marque varios. Si elige 'Otro', especifique."
        >
          <div className="flex flex-wrap gap-2">
            {objectiveOptions.map((o) => (
              <Chip
                key={o}
                active={data.objetivos.includes(o)}
                onClick={() => update("objetivos", toggleInArray(data.objetivos, o))}
              >
                {o}
              </Chip>
            ))}
          </div>
          {data.objetivos.includes("Otro") ? (
            <div className="mt-3">
              <Input
                value={data.objetivoOtro}
                onChange={(v) => update("objetivoOtro", v)}
                placeholder="Especifique..."
              />
            </div>
          ) : null}
        </Field>

        <Field label="Indicadores de éxito esperados (KPI)">
          <TextArea
            value={data.kpis}
            onChange={(v) => update("kpis", v)}
            placeholder="Ej: leads, ventas, adopción, ensayos, visibilidad, grandes cuentas..."
            rows={4}
          />
        </Field>
      </div>
    </Card>
  );

  const StepPortfolio = () => {
    const last = data.portfolio[data.portfolio.length - 1];
    const allowAdd = isFilled(last.producto) && isFilled(last.tipo);

    return (
      <Card>
        <SectionHeader
          icon={Leaf}
          title="Bloque 2 — Portfolio estratégico"
          subtitle="Productos/tecnologías foco 2026. Complete un producto por tarjeta (mínimo: Producto y Tipo)."
        />
        <div className="p-6 space-y-3">
          {data.portfolio.map((p, idx) => (
            <CardRow
              key={idx}
              title={`Producto estratégico #${idx + 1}`}
              subtitle="Luego podrá asociar productos a intervenciones puntuales (Bloque 4)."
              removable={data.portfolio.length > 1}
              onRemove={() => removeCard("portfolio", idx)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Producto">
                  <Input
                    value={p.producto}
                    onChange={(v) => updateCard("portfolio", idx, { producto: v })}
                    placeholder="Nombre comercial"
                  />
                </Field>
                <Field label="Tipo">
                  <Input
                    value={p.tipo}
                    onChange={(v) => updateCard("portfolio", idx, { tipo: v })}
                    placeholder="Fungicida / Insecticida / Fertilizante / Bio / Coadyuvante..."
                  />
                </Field>
                <Field label="Cultivos objetivo">
                  <Input
                    value={p.cultivosObjetivo}
                    onChange={(v) => updateCard("portfolio", idx, { cultivosObjetivo: v })}
                    placeholder="Vid, Olivo, Pistacho..."
                  />
                </Field>
                <Field label="Diferencial técnico">
                  <Input
                    value={p.diferencial}
                    onChange={(v) => updateCard("portfolio", idx, { diferencial: v })}
                    placeholder="Beneficio clave / posicionamiento"
                  />
                </Field>
                <Field label="Estado">
                  <Select
                    value={p.estado}
                    onChange={(v) => updateCard("portfolio", idx, { estado: v })}
                    options={["Lanzamiento", "Consolidado", "Reposicionamiento"]}
                  />
                </Field>
              </div>
            </CardRow>
          ))}

          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                if (!allowAdd) {
                  showToast("Para agregar otro, complete al menos Producto y Tipo del último.");
                  return;
                }
                addCard("portfolio", {
                  producto: "",
                  tipo: "",
                  cultivosObjetivo: "",
                  diferencial: "",
                  estado: "Consolidado",
                });
                showToast("Producto agregado. Complete la nueva tarjeta.");
              }}
              className={[
                "w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-black transition border",
                allowAdd
                  ? "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800"
                  : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-100",
              ].join(" ")}
            >
              <Plus className="h-5 w-5" />
              Agregar otro producto
            </button>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
              <BadgeInfo className="h-4 w-4" />
              Tip: complete el producto y tipo del último ítem para habilitar “Agregar”.
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const StepMatriz = () => {
    const last = data.matrizTecnica[data.matrizTecnica.length - 1];
    const allowAdd = isFilled(last.cultivo) && isFilled(last.problema);

    return (
      <Card>
        <SectionHeader
          icon={Calendar}
          title="Bloque 3 — Matriz técnica"
          subtitle="Guía: definimos dónde aparece el problema (cultivo + mes) y cuál es su solución y formato recomendado."
        />
        <div className="p-6 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <BadgeInfo className="h-4 w-4 text-emerald-700" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-600">
                ¿Para qué sirve este bloque?
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Este bloque permite ordenar la lógica agronómica: qué problema es prioritario, en qué mes se vuelve
              crítico y qué solución propone su empresa. Con todas las respuestas, Agroconsulta construirá el plan
              integrado 2026 (intervenciones, demos, ensayos y mensajes).
            </p>
          </div>

          {data.matrizTecnica.map((r, idx) => (
            <CardRow
              key={idx}
              title={`Fila técnica #${idx + 1}`}
              subtitle="Complete al menos Cultivo y Problema para poder agregar otra fila."
              removable={data.matrizTecnica.length > 1}
              onRemove={() => removeCard("matrizTecnica", idx)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Cultivo">
                  <Input
                    value={r.cultivo}
                    onChange={(v) => updateCard("matrizTecnica", idx, { cultivo: v })}
                    placeholder="Vid / Olivo / Pistacho / Tomate / Hortícolas..."
                  />
                </Field>
                <Field label="Mes crítico">
                  <Select
                    value={r.mesCritico}
                    onChange={(v) => updateCard("matrizTecnica", idx, { mesCritico: v })}
                    options={months}
                  />
                </Field>
                <Field label="Problema técnico prioritario">
                  <Input
                    value={r.problema}
                    onChange={(v) => updateCard("matrizTecnica", idx, { problema: v })}
                    placeholder="Oídio, trips, estrés hídrico..."
                  />
                </Field>
                <Field label="Solución que propone su empresa">
                  <Input
                    value={r.solucion}
                    onChange={(v) => updateCard("matrizTecnica", idx, { solucion: v })}
                    placeholder="Producto X + tecnología Y..."
                  />
                </Field>
                <Field label="Formato sugerido">
                  <Select
                    value={r.formato}
                    onChange={(v) => updateCard("matrizTecnica", idx, { formato: v })}
                    options={["Charla", "Demo", "Ensayo", "Pack"]}
                  />
                </Field>
              </div>
            </CardRow>
          ))}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                if (!allowAdd) {
                  showToast("Para agregar otra fila, complete al menos Cultivo y Problema del último ítem.");
                  return;
                }
                addCard("matrizTecnica", {
                  cultivo: "",
                  problema: "",
                  mesCritico: "Septiembre",
                  solucion: "",
                  formato: "Charla",
                });
                showToast("Fila técnica agregada.");
              }}
              className={[
                "w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-black transition border",
                allowAdd
                  ? "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800"
                  : "bg-slate-100 text-slate-500 border-slate-200",
              ].join(" ")}
            >
              <Plus className="h-5 w-5" />
              Agregar otra fila técnica
            </button>
          </div>
        </div>
      </Card>
    );
  };

  const StepIntervenciones = () => {
    const last = data.intervenciones[data.intervenciones.length - 1];
    const temaOk = last.tema === "Otro" ? isFilled(last.temaOtro) : isFilled(last.tema);
    const allowAdd = isFilled(last.mes) && isFilled(last.cultivo) && temaOk;

    const themeOptions = [
      "MIP",
      "Monitoreo y Control",
      "Calibración Pulverización",
      "Mezclas y Compatibilidad",
      "Coadyuvantes",
      "Sustentabilidad y Protocolos",
      "Otro",
    ];

    return (
      <Card>
        <SectionHeader
          icon={ClipboardList}
          title="Bloque 4 — Intervenciones propuestas"
          subtitle="Guía: propuestas concretas de presencia +VOS (mes + cultivo + tema + formato) y el producto/paquete asociado."
        />
        <div className="p-6 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <BadgeInfo className="h-4 w-4 text-emerald-700" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-600">
                ¿Qué es una intervención?
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Una intervención es una acción propuesta (técnica o estratégica) para aparecer en un mes y cultivo
              específico, con un tema y formato. Esto ayuda a coordinar giras, contenidos, demos y ensayos evitando
              superposiciones y optimizando recursos.
            </p>
          </div>

          {data.intervenciones.map((r, idx) => (
            <CardRow
              key={idx}
              title={`Intervención #${idx + 1}`}
              subtitle="Complete al menos Mes + Cultivo + Tema para agregar otra intervención."
              removable={data.intervenciones.length > 1}
              onRemove={() => removeCard("intervenciones", idx)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Mes">
                  <Select
                    value={r.mes}
                    onChange={(v) => updateCard("intervenciones", idx, { mes: v })}
                    options={months}
                  />
                </Field>
                <Field label="Cultivo">
                  <Input
                    value={r.cultivo}
                    onChange={(v) => updateCard("intervenciones", idx, { cultivo: v })}
                    placeholder="Ej: Vid"
                  />
                </Field>

                <Field label="Tema">
                  <Select
                    value={r.tema}
                    onChange={(v) => {
                      updateCard("intervenciones", idx, { tema: v });
                      if (v !== "Otro") updateCard("intervenciones", idx, { temaOtro: "" });
                    }}
                    options={themeOptions}
                  />
                </Field>

                {r.tema === "Otro" ? (
                  <Field label="Tema (Otro)">
                    <Input
                      value={r.temaOtro}
                      onChange={(v) => updateCard("intervenciones", idx, { temaOtro: v })}
                      placeholder="Escriba el tema..."
                    />
                  </Field>
                ) : (
                  <div className="hidden md:block" />
                )}

                <Field label="Producto / Paquete">
                  <Input
                    value={r.producto}
                    onChange={(v) => updateCard("intervenciones", idx, { producto: v })}
                    placeholder="Producto o paquete"
                  />
                </Field>
                <Field label="Formato">
                  <Input
                    value={r.formato}
                    onChange={(v) => updateCard("intervenciones", idx, { formato: v })}
                    placeholder="Charla / Taller / Demo / Ensayo..."
                  />
                </Field>

                <Field
                  label="Origen"
                  hint="Etiqueta para clasificar (no hay lógica automática)."
                >
                  <Select
                    value={r.origen}
                    onChange={(v) => updateCard("intervenciones", idx, { origen: v })}
                    options={["Estratégico", "Técnico"]}
                  />
                </Field>
              </div>
            </CardRow>
          ))}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                if (!allowAdd) {
                  showToast("Para agregar otra, complete Mes + Cultivo + Tema (y Tema Otro si aplica) del último.");
                  return;
                }
                addCard("intervenciones", {
                  mes: "Septiembre",
                  cultivo: "",
                  tema: "MIP",
                  temaOtro: "",
                  producto: "",
                  formato: "Charla técnica",
                  origen: "Estratégico",
                });
                showToast("Intervención agregada.");
              }}
              className={[
                "w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-black transition border",
                allowAdd
                  ? "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800"
                  : "bg-slate-100 text-slate-500 border-slate-200",
              ].join(" ")}
            >
              <Plus className="h-5 w-5" />
              Agregar otra intervención
            </button>
          </div>
        </div>
      </Card>
    );
  };

  const StepSinergias = () => {
    const lastCombo = data.combosTecnicos[data.combosTecnicos.length - 1];
    const allowAddCombo = isFilled(lastCombo.componentes) && isFilled(lastCombo.beneficio);

    return (
      <Card>
        <SectionHeader
          icon={Handshake}
          title="Bloque 5 — Sinergias (técnicas y comerciales)"
          subtitle="Objetivo: diseñar acciones conjuntas concretas que sumen demanda, mejoren eficiencia y potencien soluciones integrales."
        />
        <div className="p-6 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <BadgeInfo className="h-4 w-4 text-emerald-700" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-600">
                ¿Qué buscamos relevar?
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              En +VOS trabajamos como una unidad estratégica: buscamos construir paquetes técnicos integrados y, a la
              vez, definir acciones de co-marketing para generar demanda, mejorar adopción y optimizar recursos. Este
              bloque define <span className="font-black">con quién</span> y <span className="font-black">cómo</span> conviene
              trabajar en conjunto (incluyendo expansión a La Rioja).
            </p>
          </div>

          {/* 5A Tecnicas */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <div className="font-black text-slate-900">5A) Sinergias técnicas (paquetes y validación)</div>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Seleccione tipos de sinergia y proponga combos concretos (componentes + beneficio + cultivo + formato).
            </p>

            <div className="mt-4">
              <Field label="Tipos de sinergia técnica" hint="Marque varios. Si elige 'Otro', especifique.">
                <div className="flex flex-wrap gap-2">
                  {synergyTechTypes.map((s) => (
                    <Chip
                      key={s}
                      active={data.sinergiasTecnicasTipos.includes(s)}
                      onClick={() => update("sinergiasTecnicasTipos", toggleInArray(data.sinergiasTecnicasTipos, s))}
                    >
                      {s}
                    </Chip>
                  ))}
                </div>
                {data.sinergiasTecnicasTipos.includes("Otro") ? (
                  <div className="mt-3">
                    <Input
                      value={data.sinergiaTecnicaOtro}
                      onChange={(v) => update("sinergiaTecnicaOtro", v)}
                      placeholder="Especifique..."
                    />
                  </div>
                ) : null}
              </Field>
            </div>

            <div className="mt-5 space-y-3">
              {data.combosTecnicos.map((c, idx) => (
                <CardRow
                  key={idx}
                  title={`Combo técnico #${idx + 1}`}
                  subtitle="Ej: Fungicida A + coadyuvante B + calibración + monitoreo."
                  removable={data.combosTecnicos.length > 1}
                  onRemove={() => removeCard("combosTecnicos", idx)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field label="Componentes (productos/tecnologías)">
                      <Input
                        value={c.componentes}
                        onChange={(v) => updateCard("combosTecnicos", idx, { componentes: v })}
                        placeholder="Componentes del combo"
                      />
                    </Field>
                    <Field label="Beneficio / propuesta de valor">
                      <Input
                        value={c.beneficio}
                        onChange={(v) => updateCard("combosTecnicos", idx, { beneficio: v })}
                        placeholder="Qué mejora y por qué"
                      />
                    </Field>
                    <Field label="Cultivo objetivo">
                      <Input
                        value={c.cultivo}
                        onChange={(v) => updateCard("combosTecnicos", idx, { cultivo: v })}
                        placeholder="Vid, Olivo, Pistacho..."
                      />
                    </Field>
                    <Field label="Formato sugerido">
                      <Select
                        value={c.formato}
                        onChange={(v) => updateCard("combosTecnicos", idx, { formato: v })}
                        options={["Demo", "Ensayo", "Pack", "Charla"]}
                      />
                    </Field>
                  </div>
                </CardRow>
              ))}

              <button
                type="button"
                onClick={() => {
                  if (!allowAddCombo) {
                    showToast("Para agregar otro combo, complete Componentes y Beneficio del último.");
                    return;
                  }
                  addCard("combosTecnicos", {
                    componentes: "",
                    beneficio: "",
                    cultivo: "",
                    formato: "Demo",
                  });
                  showToast("Combo técnico agregado.");
                }}
                className={[
                  "w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-black transition border",
                  allowAddCombo
                    ? "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-800"
                    : "bg-slate-100 text-slate-500 border-slate-200",
                ].join(" ")}
              >
                <Plus className="h-5 w-5" />
                Agregar otro combo técnico
              </button>
            </div>
          </div>

          {/* 5B Comerciales */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-700" />
              <div className="font-black text-slate-900">5B) Sinergias comerciales (co-marketing y demanda)</div>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Seleccione acciones de articulación comercial y deje notas (recursos, restricciones, foco territorial).
            </p>

            <div className="mt-4">
              <Field label="Acciones conjuntas" hint="Incluye expansión a La Rioja. Si elige 'Otro', especifique.">
                <div className="flex flex-wrap gap-2">
                  {synergyCommercialActions.map((a) => (
                    <Chip
                      key={a}
                      active={data.sinergiasComercialesAcciones.includes(a)}
                      onClick={() =>
                        update("sinergiasComercialesAcciones", toggleInArray(data.sinergiasComercialesAcciones, a))
                      }
                    >
                      {a}
                    </Chip>
                  ))}
                </div>
                {data.sinergiasComercialesAcciones.includes("Otro") ? (
                  <div className="mt-3">
                    <Input
                      value={data.sinergiaComercialOtro}
                      onChange={(v) => update("sinergiaComercialOtro", v)}
                      placeholder="Especifique..."
                    />
                  </div>
                ) : null}
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Notas / recursos / restricciones">
                <TextArea
                  value={data.sinergiasComercialesNotas}
                  onChange={(v) => update("sinergiasComercialesNotas", v)}
                  placeholder="Ej: disponibilidad de especialistas, materiales, foco en cuentas clave, interés de replicar en La Rioja..."
                  rows={4}
                />
              </Field>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const StepCharlas = () => (
    <Card>
      <SectionHeader
        icon={Users}
        title="Bloque 6 — Participación en charlas +VOS"
        subtitle="Defina interés, rol y comentarios por temática (disertante, sponsor, validación, ensayo)."
      />
      <div className="p-6 space-y-3">
        {data.participacionCharlas.map((p, idx) => (
          <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-black text-slate-900">{p.tema}</div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Interés">
                <Select
                  value={p.interes}
                  onChange={(v) => updateCard("participacionCharlas", idx, { interes: v })}
                  options={["Sí", "No", "A evaluar"]}
                />
              </Field>
              <Field label="Rol">
                <Select
                  value={p.rol}
                  onChange={(v) => updateCard("participacionCharlas", idx, { rol: v })}
                  options={["Disertante", "Sponsor", "Validación", "Ensayo", "A evaluar"]}
                />
              </Field>
              <Field label="Comentarios">
                <Input
                  value={p.comentarios}
                  onChange={(v) => updateCard("participacionCharlas", idx, { comentarios: v })}
                  placeholder="Especialista, formato sugerido, etc."
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const StepSello = () => (
    <Card>
      <SectionHeader
        icon={BadgeCheck}
        title="Bloque 7 — Protocolo, sello y sostenibilidad"
        subtitle="Dividido en dos partes: lo que su empresa puede aportar y lo que necesita para sumarse."
      />
      <div className="p-6 space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <BadgeInfo className="h-4 w-4 text-emerald-700" />
            <div className="text-xs font-black uppercase tracking-widest text-slate-600">
              ¿Qué buscamos en este bloque?
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-700">
            El protocolo + sello busca transformar buenas prácticas en ventajas competitivas: orden técnico,
            evidencia, trazabilidad y acceso a mercados/finanzas. Aquí relevamos qué puede aportar su empresa y qué
            necesita para integrarse de forma clara y sostenible.
          </p>
        </div>

        {/* 7A */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-700" />
            <div className="font-black text-slate-900">7A) ¿Qué puede aportar su empresa?</div>
          </div>

          <div className="mt-4 space-y-4">
            <Field label="Productos/tecnologías que podrían integrar el Protocolo +VOS">
              <TextArea
                value={data.aporteProductos}
                onChange={(v) => update("aporteProductos", v)}
                placeholder="Liste productos/tecnologías y condiciones (cultivo, uso, respaldo)."
                rows={4}
              />
            </Field>

            <Field label="Evidencias / soporte técnico disponible">
              <TextArea
                value={data.aporteEvidencias}
                onChange={(v) => update("aporteEvidencias", v)}
                placeholder="Ensayos, bibliografía, soporte de especialistas, capacitaciones, monitoreo, etc."
                rows={4}
              />
            </Field>

            <Field label="Indicadores de impacto" hint="Marque varios. Si elige 'Otro', especifique.">
              <div className="flex flex-wrap gap-2">
                {impactIndicators.map((i) => (
                  <Chip
                    key={i}
                    active={data.indicadoresImpacto.includes(i)}
                    onClick={() => update("indicadoresImpacto", toggleInArray(data.indicadoresImpacto, i))}
                  >
                    {i}
                  </Chip>
                ))}
              </div>
              {data.indicadoresImpacto.includes("Otro") ? (
                <div className="mt-3">
                  <Input
                    value={data.indicadorOtro}
                    onChange={(v) => update("indicadorOtro", v)}
                    placeholder="Especifique..."
                  />
                </div>
              ) : null}
            </Field>

            <Field label="Condiciones / límites (si aplica)">
              <TextArea
                value={data.condicionesLimites}
                onChange={(v) => update("condicionesLimites", v)}
                placeholder="Restricciones técnicas, logísticas, comerciales, etc."
                rows={3}
              />
            </Field>
          </div>
        </div>

        {/* 7B */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-emerald-700" />
            <div className="font-black text-slate-900">7B) ¿Qué necesita su empresa para sumarse?</div>
          </div>

          <div className="mt-4 space-y-4">
            <Field label="Requisitos de validación">
              <TextArea
                value={data.necesitaRequisitosValidacion}
                onChange={(v) => update("necesitaRequisitosValidacion", v)}
                placeholder="Qué necesita para validar técnica y comercialmente su aporte (ensayos, comparativos, etc.)."
                rows={3}
              />
            </Field>

            <Field label="Auditoría / registro / trazabilidad">
              <TextArea
                value={data.necesitaAuditoriaRegistro}
                onChange={(v) => update("necesitaAuditoriaRegistro", v)}
                placeholder="Tipo de registros, auditorías o plataforma requerida."
                rows={3}
              />
            </Field>

            <Field label="Uso de marca / sello">
              <TextArea
                value={data.necesitaUsoMarcaSello}
                onChange={(v) => update("necesitaUsoMarcaSello", v)}
                placeholder="Expectativas sobre uso de sello, co-branding, materiales, etc."
                rows={3}
              />
            </Field>

            <Field label="Valor esperado del sello">
              <TextArea
                value={data.necesitaValorEsperado}
                onChange={(v) => update("necesitaValorEsperado", v)}
                placeholder="Mercados, grandes cuentas, financiamiento, bonificaciones, posicionamiento, etc."
                rows={3}
              />
            </Field>
          </div>
        </div>
      </div>
    </Card>
  );

  const StepServicios = () => (
    <Card>
      <SectionHeader
        icon={Leaf}
        title="Bloque 8 — Servicios a construir en comunidad"
        subtitle="En qué servicios le interesa invertir/desarrollar junto a +VOS."
      />
      <div className="p-6 space-y-5">
        <Field label="Servicios estratégicos" hint="Marque varios. Si elige 'Otro', especifique.">
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((s) => (
              <Chip
                key={s}
                active={data.serviciosComunidad.includes(s)}
                onClick={() => update("serviciosComunidad", toggleInArray(data.serviciosComunidad, s))}
              >
                {s}
              </Chip>
            ))}
          </div>
          {data.serviciosComunidad.includes("Otro") ? (
            <div className="mt-3">
              <Input
                value={data.servicioOtro}
                onChange={(v) => update("servicioOtro", v)}
                placeholder="Especifique..."
              />
            </div>
          ) : null}
        </Field>
      </div>
    </Card>
  );

  const StepFinal = () => (
    <Card>
      <SectionHeader
        icon={Send}
        title="Bloques 9 y 10 — Expectativas, compromiso y visión"
        subtitle="Cierre final. Luego podrá enviar todo a WhatsApp."
        right={
          <button
            type="button"
            onClick={sendToWhatsApp}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white hover:bg-emerald-800"
          >
            <Send className="h-4 w-4" /> Enviar a WhatsApp
          </button>
        }
      />
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="¿Qué espera recibir de +VOS?">
            <TextArea
              value={data.esperaRecibir}
              onChange={(v) => update("esperaRecibir", v)}
              placeholder="Ej: planificación ordenada, leads, ensayos, datos, certificación, llegada a cuentas clave..."
              rows={4}
            />
          </Field>
          <Field label="¿Qué está dispuesto a aportar?">
            <TextArea
              value={data.dispuestoAportar}
              onChange={(v) => update("dispuestoAportar", v)}
              placeholder="Ej: especialistas, logística, productos para ensayos, contenidos, campañas..."
              rows={4}
            />
          </Field>
        </div>

        <Field label="Nivel de compromiso">
          <Select
            value={data.compromiso}
            onChange={(v) => update("compromiso", v)}
            options={["Participación puntual", "Participación anual", "Socio estratégico", "Empresa ancla por cultivo"]}
          />
        </Field>

        <Field label='Visión de alianza (3 años): ¿Qué debería lograr para que diga "valió la pena sumarnos"?'>
          <TextArea
            value={data.vision3Anios}
            onChange={(v) => update("vision3Anios", v)}
            placeholder="Ej: estándar regional, adopción de protocolos, expansión SJ-LR, financiamiento verde..."
            rows={5}
          />
        </Field>

        <Divider />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50"
          >
            <Trash2 className="h-4 w-4" /> Reiniciar
          </button>
          <button
            type="button"
            onClick={sendToWhatsApp}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white hover:bg-emerald-800"
          >
            <Send className="h-4 w-4" /> Enviar todo a WhatsApp
          </button>
        </div>
      </div>
    </Card>
  );

  const stepContent = () => {
    switch (steps[step].key) {
      case "intro":
        return <StepIntro />;
      case "perfil":
        return <StepPerfil />;
      case "portfolio":
        return <StepPortfolio />;
      case "matriz":
        return <StepMatriz />;
      case "interv":
        return <StepIntervenciones />;
      case "sinergias":
        return <StepSinergias />;
      case "charlas":
        return <StepCharlas />;
      case "sello":
        return <StepSello />;
      case "servicios":
        return <StepServicios />;
      case "final":
        return <StepFinal />;
      default:
        return <StepIntro />;
    }
  };

  return (
    <Container>
      <Header />
      <StepBar />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {stepContent()}

        <div className="pb-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => (canPrev ? setStep((s) => s - 1) : null)}
            disabled={!canPrev}
            className={[
              "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black border transition",
              canPrev
                ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed",
            ].join(" ")}
          >
            <ChevronLeft className="h-4 w-4" />
            Atrás
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={sendToWhatsApp}
              className="hidden md:inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-black text-white hover:bg-emerald-800"
              title={`Enviar todo a WhatsApp ${WHATSAPP_NUMBER}`}
            >
              <Send className="h-4 w-4" />
              Enviar
            </button>

            <button
              type="button"
              onClick={() => (canNext ? setStep((s) => s + 1) : null)}
              disabled={!canNext}
              className={[
                "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black border transition",
                canNext
                  ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                  : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed",
              ].join(" ")}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      <footer className="py-10 text-center text-[11px] font-black uppercase tracking-[0.35em] text-slate-300">
        © 2026 Comunidad +VOS | Formulario Estratégico
      </footer>
    </Container>
  );
}
