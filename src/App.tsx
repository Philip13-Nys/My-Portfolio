import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Globe,
  Mail,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
  Github,
  Linkedin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from "./data";
import profilePhoto from "./assets/philip-profile-cutout.png";
import coverLetter from "./assets/philip-miguel-cover-letter.pdf";
import resume from "./assets/philip-miguel-resume.pdf";
import MusicPlayer from "./MusicPlayer";

const nav = [
  ["Home", "#home"],
  ["GitHub", "#github-activity"],
  ["Work", "#projects"],
  ["What I can do", "#skills"],
  ["About", "#about"],
  ["Awards", "#awards"],
  ["Experience", "#experience"],
  ["Documents", "#Documents"],
];

type GitHubContribution = {
  date: string;
  count: number;
  level: number;
};

type GitHubContributionsResponse = {
  contributions: GitHubContribution[];
};

function PixelLabel({ children }: { children: React.ReactNode }) {
  return <span className="pixel-label">{children}</span>;
}

type PetKind = "cat" | "dog";
type PetActivity =
  | "walk"
  | "run"
  | "turn"
  | "sit"
  | "stand"
  | "stretch"
  | "groom"
  | "lie"
  | "sleep"
  | "jump"
  | "play"
  | "sniff"
  | "wag"
  | "follow";

type PetAgent = {
  x: number;
  direction: -1 | 1;
  activity: PetActivity;
  until: number;
  mouseCooldown: number;
};

function MovingPet({
  kind,
  activity,
  sound,
  onInteract,
  actorRef,
}: {
  kind: PetKind;
  activity: PetActivity;
  sound: string;
  onInteract: (kind: PetKind) => void;
  actorRef: (element: HTMLDivElement | null) => void;
}) {
  const [reacting, setReacting] = useState(false);
  const [showSound, setShowSound] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const interact = () => {
    setReacting(true);
    setShowSound(true);
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setReacting(false);
      setShowSound(false);
    }, 1150);
    onInteract(kind);
  };

  return (
    <div
      ref={actorRef}
      className={`pet-actor pet-actor--${kind}`}
      data-activity={activity}
    >
      <span className={`pet-sound${showSound ? " is-visible" : ""}`} aria-hidden="true">
        {sound}
      </span>
      <span className="pet-status" aria-hidden="true">
        {activity === "sleep" ? "Zzz" : activity === "sniff" ? "..." : activity === "play" ? "♥" : ""}
      </span>
      <button
        className={`pet-button${reacting ? " is-reacting" : ""}`}
        type="button"
        aria-label={`Pet the ${kind}`}
        title={`Pet the ${kind}`}
        onClick={interact}
      >
        <span className="pet-ground-shadow" aria-hidden="true" />
        <span className="pet-facing" aria-hidden="true">
          <PetArt kind={kind} />
        </span>
      </button>
    </div>
  );
}

function PetArt({ kind }: { kind: "cat" | "dog" }) {
  const isCat = kind === "cat";

  return (
    <svg className={`pet-art pet-art--${kind}`} viewBox="0 0 100 72" aria-hidden="true">
      <g className="pet-tail" fill="none">
        {isCat ? (
          <path d="M24 43C10 45 8 31 19 24" />
        ) : (
          <path d="M24 43C13 42 13 35 8 34" />
        )}
      </g>
      <g className="pet-legs">
        <path className="pet-leg pet-leg--one pet-leg--hind" d="M32 48l-3 20" />
        <path className="pet-leg pet-leg--two pet-leg--hind" d="M43 49l1 19" />
        <path className="pet-leg pet-leg--three pet-leg--front" d="M58 48l-1 20" />
        <path className="pet-leg pet-leg--four pet-leg--front" d="M68 46l4 22" />
      </g>
      <g className="pet-body">
        {isCat ? (
          <path
            className="pet-torso"
            d="M20 43c2-11 12-15 24-13l15 3c9 2 14 8 14 16-9 8-36 8-50 3-4-2-5-5-3-9Z"
          />
        ) : (
          <path
            className="pet-torso"
            d="M18 41c3-11 15-14 29-12l13 2c10 2 16 8 15 17-10 8-37 8-51 4-5-2-7-6-6-11Z"
          />
        )}
        <path className="pet-collar" d="M61 36q5 3 9 1l-2 7q-5 2-9-1Z" />
      </g>
      <g className="pet-head">
        {isCat ? (
          <>
            <path className="pet-ear" d="m59 25 1-14 11 9m-4 4 9-12 4 16" />
            <path className="pet-face" d="M58 29c2-8 14-10 22-4 7 5 5 16-3 19-9 4-20-2-19-15Z" />
            <path className="pet-face-detail" d="M64 30v1m10-1v1m-6 5q2 2 4 0m-10 1-8-2m8 5-8 2m21-5 7-2m-7 5 7 2" />
            <path className="pet-nose" d="m68 34 2 1-2 2-2-2Z" />
            <path className="pet-lick" d="M69 37q1 4 3 0" />
          </>
        ) : (
          <>
            <path className="pet-ear" d="M63 25c-7-2-8-12-3-15 6-3 10 6 8 13Z" />
            <path className="pet-face" d="M62 25c1-8 11-11 19-7 6 3 8 10 5 15-2 4-7 7-13 6-8 0-13-6-11-14Z" />
            <path className="pet-muzzle" d="M78 31c5-5 13-3 16 1 1 3-3 7-9 7-5 0-8-3-7-8Z" />
            <path className="pet-ear-inner" d="M63 16c-2 1-2 6 1 8l2-7Z" />
            <path className="pet-face-detail" d="M69 25v1m10-1v1m-6 5q2 2 4 0" />
            <circle className="pet-nose" cx="92" cy="33" r="2" />
            <path className="pet-lick" d="M85 37q2 5 5 0" />
          </>
        )}
      </g>
      <g className="pet-markings" aria-hidden="true">
        {isCat ? (
          <path d="M31 37q7-7 12-4" />
        ) : (
          <path d="M29 35q7-6 12-3" />
        )}
      </g>
    </svg>
  );
}

function PetCompanions() {
  const [activities, setActivities] = useState<Record<PetKind, PetActivity>>({
    cat: "walk",
    dog: "walk",
  });
  const actors = useRef<Record<PetKind, PetAgent>>({
    cat: { x: 28, direction: 1, activity: "walk", until: 0, mouseCooldown: 0 },
    dog: { x: 72, direction: -1, activity: "walk", until: 0, mouseCooldown: 0 },
  });
  const actorElements = useRef<Record<PetKind, HTMLDivElement | null>>({
    cat: null,
    dog: null,
  });

  useEffect(() => {
    const now = performance.now();
    const cat = actors.current.cat;
    const dog = actors.current.dog;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cat.x = 20;
      dog.x = 80;
      cat.activity = "stand";
      dog.activity = "stand";
      setActivities({ cat: "stand", dog: "stand" });
      return;
    }
    cat.until = now + 1500;
    dog.until = now + 2200;
    let nextPlay = now + 12000;
    let nextFollow = now + 6000;
    let previousFrame = now;
    let frame = 0;
    let changed = false;

    const pickAction = (kind: PetKind): [PetActivity, number] => {
      const choices: Record<PetKind, Array<[PetActivity, number]>> = {
        cat: [
          ["walk", 5], ["walk", 5], ["walk", 5], ["run", 2], ["sit", 3],
          ["stretch", 2], ["groom", 3], ["lie", 2], ["sleep", 2],
          ["stand", 2], ["jump", 1],
        ],
        dog: [
          ["walk", 5], ["walk", 5], ["walk", 5], ["run", 3], ["sit", 3],
          ["jump", 2], ["play", 2], ["sniff", 3], ["wag", 3], ["stand", 2],
        ],
      };
      const [activity] = choices[kind][Math.floor(Math.random() * choices[kind].length)];
      const durations: Record<PetActivity, [number, number]> = {
        walk: [1500, 3400], run: [900, 1900], turn: [280, 420],
        sit: [1500, 2800], stand: [900, 1800], stretch: [1100, 1900],
        groom: [1500, 2600], lie: [1300, 2200], sleep: [2200, 3800],
        jump: [700, 1100], play: [1200, 2000], sniff: [1200, 2100],
        wag: [1000, 1900], follow: [1300, 2100],
      };
      const [min, max] = durations[activity];
      return [activity, min + Math.random() * (max - min)];
    };

    const setAction = (
      actor: PetAgent,
      activity: PetActivity,
      time: number,
      duration: number,
    ) => {
      actor.activity = activity;
      actor.until = time + duration;
      changed = true;
    };

    const tick = (time: number) => {
      const delta = Math.min((time - previousFrame) / 1000, 0.05);
      previousFrame = time;
      changed = false;

      for (const kind of ["cat", "dog"] as const) {
        const actor = actors.current[kind];
        if (time >= actor.until) {
          const [activity, duration] = pickAction(kind);
          setAction(actor, activity, time, duration);
        }

        const element = actorElements.current[kind];
        const margin = element
          ? Math.min(18, (element.offsetWidth / window.innerWidth) * 50 + 1)
          : 10;
        const minX = margin;
        const maxX = 100 - margin;
        const speeds: Partial<Record<PetActivity, number>> = {
          walk: kind === "cat" ? 3.2 : 3.9,
          run: kind === "cat" ? 8 : 10,
          follow: 5.1,
        };
        const speed = speeds[actor.activity];
        if (speed) {
          actor.x += actor.direction * speed * delta;
          if (actor.x <= minX || actor.x >= maxX) {
            actor.x = Math.max(minX, Math.min(maxX, actor.x));
            actor.direction = actor.direction === 1 ? -1 : 1;
            setAction(actor, "turn", time, 360);
          }
        }

        if (element) {
          element.style.setProperty("--pet-x", `${actor.x}%`);
          element.style.setProperty("--pet-facing", String(actor.direction));
        }
      }

      const distance = Math.abs(cat.x - dog.x);
      if (distance < 8 && time >= nextPlay) {
        cat.direction = cat.x <= dog.x ? 1 : -1;
        dog.direction = cat.x <= dog.x ? -1 : 1;
        setAction(cat, "play", time, 2300);
        setAction(dog, "play", time, 2300);
        nextPlay = time + 26000 + Math.random() * 14000;
      } else if (
        distance < 22 && time >= nextFollow &&
        ["walk", "run", "stand", "sniff", "wag"].includes(dog.activity)
      ) {
        dog.direction = cat.x < dog.x ? -1 : 1;
        setAction(dog, "follow", time, 1900);
        nextFollow = time + 18000 + Math.random() * 12000;
      }

      if (changed) {
        setActivities({ cat: cat.activity, dog: dog.activity });
      }
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const time = performance.now();
      for (const kind of ["cat", "dog"] as const) {
        const actor = actors.current[kind];
        const element = actorElements.current[kind];
        if (!element || time < actor.mouseCooldown) continue;
        const bounds = element.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        if (Math.hypot(event.clientX - centerX, event.clientY - centerY) < 76) {
          const activity: PetActivity = kind === "cat" ? "stretch" : "wag";
          setAction(actor, activity, time, 1200);
          actor.mouseCooldown = time + 8500;
          setActivities((current) => ({ ...current, [kind]: activity }));
          break;
        }
      }
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const interact = (kind: PetKind) => {
    const actor = actors.current[kind];
    const activity: PetActivity = kind === "cat"
      ? ["jump", "stretch", "groom"][Math.floor(Math.random() * 3)] as PetActivity
      : ["jump", "play", "wag"][Math.floor(Math.random() * 3)] as PetActivity;
    actor.activity = activity;
    actor.until = performance.now() + (activity === "jump" ? 1100 : 1800);
    setActivities((current) => ({ ...current, [kind]: activity }));
  };

  return (
    <div className="pet-companions" role="group" aria-label="Interactive pets">
      <MovingPet
        kind="cat"
        activity={activities.cat}
        sound="Meow!"
        onInteract={interact}
        actorRef={(element) => { actorElements.current.cat = element; }}
      />
      <MovingPet
        kind="dog"
        activity={activities.dog}
        sound="Woof!"
        onInteract={interact}
        actorRef={(element) => { actorElements.current.dog = element; }}
      />
    </div>
  );
}

function SectionHead({
  kicker,
  title,
  note,
}: {
  kicker: string;
  title: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="section-head" data-reveal>
      <div>
        <PixelLabel>{kicker}</PixelLabel>
        <h2>{title}</h2>
      </div>
      {note && <p>{note}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [peachMode, setPeachMode] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [showStartup, setShowStartup] = useState(true);
  const [startupLeaving, setStartupLeaving] = useState(false);
  const [startupProgress, setStartupProgress] = useState(0);
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState(false);
  const [activityUpdatedAt, setActivityUpdatedAt] = useState<Date | null>(null);
  const [activeContribution, setActiveContribution] =
    useState<GitHubContribution | null>(null);
  const [activityReload, setActivityReload] = useState(0);
  const project = projects[activeProject];
  const previousProject =
    projects[(activeProject + projects.length - 1) % projects.length];
  const nextProject = projects[(activeProject + 1) % projects.length];
  const moveProject = (direction: number) =>
    setActiveProject(
      (activeProject + direction + projects.length) % projects.length,
    );
  const heroName = profile.name.replace(/[\[\]]/g, "").toUpperCase();
  const githubUsername =
    new URL(profile.github).pathname.split("/").filter(Boolean).at(-1) ?? "";
  const contributionCells: (GitHubContribution | null)[] = contributions.length
    ? [
        ...Array(new Date(`${contributions[0].date}T12:00:00`).getDay()).fill(
          null,
        ),
        ...contributions,
      ]
    : [];
  while (contributionCells.length > 0 && contributionCells.length % 7 !== 0) {
    contributionCells.push(null);
  }
  const contributionWeeks = Array.from(
    { length: contributionCells.length / 7 },
    (_, week) => contributionCells.slice(week * 7, week * 7 + 7),
  );
  const monthLabels = contributionWeeks.map((week, index) => {
    const firstOfMonth = week.find(
      (day) => day && new Date(`${day.date}T12:00:00`).getDate() === 1,
    );
    const firstDay = week.find((day) => day);
    const labelDay = firstOfMonth ?? (index === 0 ? firstDay : null);
    return labelDay
      ? new Date(`${labelDay.date}T12:00:00`).toLocaleDateString("en", {
          month: "short",
        })
      : "";
  });
  const contributionTotal = contributions.reduce(
    (sum, day) => sum + day.count,
    0,
  );
  const summaryContribution =
    activeContribution ?? contributions[contributions.length - 1] ?? null;

  useEffect(() => {
    const controller = new AbortController();
    setActivityLoading(true);
    setActivityError(false);

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(githubUsername)}?y=last`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Contribution data is unavailable");
        return response.json() as Promise<GitHubContributionsResponse>;
      })
      .then((data) => {
        if (!Array.isArray(data.contributions)) {
          throw new Error("Contribution data has an unexpected format");
        }
        const sorted = data.contributions
          .filter(
            (day) =>
              /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
              Number.isFinite(day.count) &&
              Number.isFinite(day.level),
          )
          .sort((a, b) => a.date.localeCompare(b.date));
        setContributions(sorted);
        setActivityUpdatedAt(new Date());
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setActivityError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setActivityLoading(false);
      });

    return () => controller.abort();
  }, [activityReload, githubUsername]);

  useEffect(() => {
    let cancelled = false;
    let finished = 0;
    let fadeTimer = 0;
    const imageUrls = Array.from(
      new Set(
        [
          profilePhoto,
          ...projects.map((item) => item.image),
          ...certifications.map((item) => item.image),
        ].filter((url): url is string => Boolean(url)),
      ),
    );

    const imageLoads = imageUrls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const image = new Image();
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            finished += 1;
            if (!cancelled) {
              setStartupProgress(
                Math.round((finished / imageUrls.length) * 100),
              );
            }
            resolve();
          };
          image.addEventListener("load", finish, { once: true });
          image.addEventListener("error", finish, { once: true });
          image.src = url;
          if (image.complete) finish();
        }),
    );

    let minimumTimer = 0;
    const minimumDisplayTime = new Promise<void>((resolve) => {
      minimumTimer = window.setTimeout(resolve, 1800);
    });

    Promise.all([...imageLoads, minimumDisplayTime]).then(() => {
      if (cancelled) return;
      setStartupProgress(100);
      setStartupLeaving(true);
      fadeTimer = window.setTimeout(() => setShowStartup(false), 720);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setEmailStatus("Sending your message…");
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.get("name"),
            email: form.get("email"),
            _replyto: form.get("email"),
            message: form.get("message"),
            _subject: `Portfolio message from ${form.get("name")}`,
            _template: "table",
          }),
        },
      );
      const result = await response.json();
      if (
        !response.ok ||
        result.success === false ||
        result.success === "false"
      ) {
        throw new Error(
          result.message || "The email service rejected the message.",
        );
      }
      setEmailStatus(
        "Message submitted. If this is the first submission, check your inbox to activate delivery.",
      );
      formElement.reset();
    } catch {
      setEmailStatus(
        "Couldn’t submit online. You can send it through your email app instead.",
      );
    }
  };

  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], .skills-layout, .about-profile, .awards-grid, .awards-showcase, .education-strip, .training-row, .experience-list, .technical-list, .beyond-wrap, .contact-wrap",
      ),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    document.documentElement.classList.add("js-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);

  return (
    <div className={peachMode ? "site-shell peach-mode" : "site-shell"}>
      {showStartup && (
        <div
          className={`startup-screen${startupLeaving ? " is-leaving" : ""}`}
          role="status"
          aria-live="polite"
          aria-label={`Loading portfolio, ${startupProgress}%`}
        >
          <div className="startup-content">
            <div className="startup-icons" aria-hidden="true">
              <span>
                <Code2 size={14} />
              </span>
              <span>
                <UserRound size={14} />
              </span>
              <span>
                <Globe size={14} />
              </span>
            </div>
            <h1>
              <span>Welcome to my</span>
              <strong>Portfolio Website</strong>
            </h1>

            <div className="startup-track" aria-hidden="true">
              <span style={{ width: `${startupProgress}%` }} />
            </div>
            <div className="startup-meta">
              <span>{profile.name.toUpperCase()} / WEB DEVELOPER</span>
              <span>{String(startupProgress).padStart(2, "0")}%</span>
            </div>
          </div>
          <span className="startup-corner" aria-hidden="true">
            01&nbsp; /&nbsp; 07
          </span>
        </div>
      )}
      {!showStartup && <PetCompanions />}
      <MusicPlayer />
      <header className="header-wrap">
        <a className="brand" href="#home">
          <span className="brand-icon">
            {profile.name
              .replace(/[\[\]]/g, "")
              .trim()
              .charAt(0) || "P"}
          </span>
          <span>{profile.name}</span>
        </a>
        <nav
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
        >
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setPeachMode(!peachMode)}
            aria-label={
              peachMode ? "Switch to inkberry theme" : "Switch to peach theme"
            }
          >
            {peachMode ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <a className="hire-button" href="#contact">
            HIRE ME <ArrowUpRight size={13} />
          </a>
        </div>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-background-grid" />
          <div className="hero-outline-name" aria-hidden="true">
            <div className="hero-name-track">
              <span>{heroName}</span>
              <span>{heroName}</span>
            </div>
          </div>
          <div className="hero-caption" data-reveal>
            <PixelLabel>PORTFOLIO / DEV</PixelLabel>
          </div>
          <div className="portrait-stage" data-reveal>
            <div className="portrait-glow" />
            <img
              className="portrait-photo"
              src={profilePhoto}
              alt={`Portrait of ${profile.name}`}
            />
            <div className="portrait-note">PHILIP / WEB DEVELOPER</div>
            <span className="hero-cross cross-a" />
            <span className="hero-cross cross-b" />
          </div>
          <div className="hero-bottom" data-reveal>
            <div className="hero-person">
              <span className="hero-person-number">01</span>
              <div>
                <strong>{profile.name}</strong>
                <span>{profile.role}</span>
              </div>
            </div>
            <p>{profile.intro}</p>
            <a href="#projects" className="scroll-link">
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <section className="github-section" id="github-activity">
          <div className="section-rule" />
          <div className="content-wrap github-wrap">
            <div className="github-panel" data-reveal>
              <div className="github-panel-header">
                <span className="github-panel-title">
                  <Github size={17} /> BUILD LOG / GITHUB
                </span>
                <a
                  className="github-profile-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{githubUsername} <ArrowUpRight size={13} />
                </a>
              </div>

              <div className="github-panel-divider" />
              <div className="github-activity-heading">
                <p>
                  <strong>
                    {activityLoading || activityError
                      ? "—"
                      : contributionTotal.toLocaleString()}
                  </strong>
                  <span>contributions in the past year</span>
                </p>
                <span className="github-public-label">
                  PUBLIC GITHUB ACTIVITY
                </span>
              </div>

              {contributionWeeks.length > 0 ? (
                <div className="github-calendar-wrap">
                  <div className="github-weekday-labels" aria-hidden="true">
                    {(["", "Mon", "", "Wed", "", "Fri", ""] as const).map(
                      (label, index) => (
                        <span key={index}>{label}</span>
                      ),
                    )}
                  </div>
                  <div
                    className="github-calendar-scroll"
                    role="group"
                    aria-label="GitHub contribution calendar for the past year"
                    tabIndex={0}
                  >
                    <div
                      className="github-month-labels"
                      style={{
                        gridTemplateColumns: `repeat(${contributionWeeks.length}, var(--github-cell))`,
                      }}
                      aria-hidden="true"
                    >
                      {monthLabels.map((month, index) => (
                        <span key={index}>{month}</span>
                      ))}
                    </div>
                    <div
                      className="github-contribution-grid"
                      style={{
                        gridTemplateColumns: `repeat(${contributionWeeks.length}, var(--github-cell))`,
                      }}
                    >
                      {contributionWeeks.flatMap((week, weekIndex) =>
                        week.map((day, dayIndex) => {
                          if (!day) {
                            return (
                              <span
                                className="github-day github-day-empty"
                                key={`${weekIndex}-${dayIndex}`}
                                aria-hidden="true"
                              />
                            );
                          }
                          const dateLabel = new Date(
                            `${day.date}T12:00:00`,
                          ).toLocaleDateString("en", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          });
                          return (
                            <button
                              className={`github-day level-${Math.max(0, Math.min(4, day.level))}`}
                              key={`${weekIndex}-${dayIndex}`}
                              type="button"
                              title={`${day.count} contributions on ${dateLabel}`}
                              aria-label={`${day.count} contributions on ${dateLabel}`}
                              aria-pressed={
                                summaryContribution?.date === day.date
                              }
                              onMouseEnter={() => setActiveContribution(day)}
                              onMouseLeave={() => setActiveContribution(null)}
                              onFocus={() => setActiveContribution(day)}
                              onBlur={() => setActiveContribution(null)}
                              onClick={() => setActiveContribution(day)}
                            />
                          );
                        }),
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="github-empty-state" aria-live="polite">
                  {activityLoading
                    ? "Loading public contribution activity…"
                    : "Contribution activity is unavailable right now."}
                </div>
              )}

              <div className="github-calendar-summary">
                <p aria-live="polite">
                  {summaryContribution
                    ? `${summaryContribution.count} contributions on ${new Date(`${summaryContribution.date}T12:00:00`).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}`
                    : activityError
                      ? "Open GitHub to view public activity."
                      : "Hover over a day to view contributions."}
                </p>
                <div
                  className="github-legend"
                  aria-label="Contribution intensity legend"
                >
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      className={`github-day level-${level}`}
                      key={level}
                      aria-hidden="true"
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>

              <div className="github-panel-footer">
                <p>
                  {activityUpdatedAt
                    ? `Checked · ${activityUpdatedAt.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}`
                    : "Public contribution activity"}
                  <br />
                  Public calendar via GitHub Contributions API. Updates may take
                  an hour.
                </p>
                <button
                  type="button"
                  className="github-refresh"
                  onClick={() => setActivityReload((value) => value + 1)}
                  disabled={activityLoading}
                >
                  {activityLoading ? "Loading…" : "Refresh"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="work-section" id="projects">
          <div className="section-rule" />
          <div className="content-wrap work-wrap">
            <div data-reveal>
              <SectionHead
                kicker="01 / SELECTED PROJECTS"
                title="Work Gallery"
              />
            </div>
            <div className="gallery-frame" data-reveal>
              <button
                className="gallery-arrow gallery-prev"
                onClick={() => moveProject(-1)}
                aria-label="Previous project"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                className="gallery-arrow gallery-next"
                onClick={() => moveProject(1)}
                aria-label="Next project"
              >
                <ArrowRight size={17} />
              </button>
              <button
                className="side-project side-left"
                onClick={() => moveProject(-1)}
                aria-label={`Show ${previousProject.title}`}
              >
                <span className="mini-site mini-left">
                  {previousProject.image ? (
                    <img
                      className="side-project-image"
                      src={previousProject.image}
                      alt=""
                    />
                  ) : (
                    <>
                      <i />
                      <i />
                      <i />
                      <b />
                    </>
                  )}
                </span>
                <span>{previousProject.title}</span>
              </button>
              <article className="featured-project" key={project.number}>
                <div
                  className={`project-screen ${project.art} ${project.image ? "has-image" : ""}`}
                >
                  {project.image ? (
                    <img
                      className="project-preview-image"
                      src={project.image}
                      alt={`${project.title} website preview`}
                    />
                  ) : (
                    <>
                      <div className="screen-top">
                        <span className="screen-logo">[ PROJECT ]</span>
                        <span>OVERVIEW &nbsp; ABOUT &nbsp; CONTACT</span>
                        <span className="screen-dots">● ● ●</span>
                      </div>
                      <div className="screen-body">
                        <div className="screen-copy">
                          <PixelLabel>
                            FEATURED PROJECT / {project.number}
                          </PixelLabel>
                          <b>{project.title}</b>
                          <i />
                          <i />
                          <i />
                          <span className="screen-cta">EXPLORE PROJECT ↗</span>
                        </div>
                        <div className="screen-visual">
                          <div className="screen-shape shape-one" />
                          <div className="screen-shape shape-two" />
                          <div className="screen-shape shape-three" />
                        </div>
                      </div>
                      <div className="screen-bottom">
                        <span>{project.type}</span>
                        <span>
                          {String(activeProject + 1).padStart(2, "0")} —{" "}
                          {String(projects.length).padStart(2, "0")}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div className="featured-caption">
                  <div>
                    <span className="project-type">{project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a
                    className="project-open"
                    href={project.href}
                    target={
                      project.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      project.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    aria-label={`Ask about ${project.title}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </article>
              <button
                className="side-project side-right"
                onClick={() => moveProject(1)}
                aria-label={`Show ${nextProject.title}`}
              >
                <span className="mini-site mini-right">
                  {nextProject.image ? (
                    <img
                      className="side-project-image"
                      src={nextProject.image}
                      alt=""
                    />
                  ) : (
                    <>
                      <i />
                      <i />
                      <i />
                      <b />
                    </>
                  )}
                </span>
                <span>{nextProject.title}</span>
              </button>
            </div>
            <div className="gallery-footer">
              <div
                className="gallery-dots"
                aria-label={`Project ${activeProject + 1} of ${projects.length}`}
              >
                {projects.map((item, i) => (
                  <button
                    key={item.number}
                    className={i === activeProject ? "active" : ""}
                    onClick={() => setActiveProject(i)}
                    aria-label={`Show project ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-rule" />
          <div className="content-wrap skills-wrap">
            <SectionHead kicker="02 / MY TOOLKIT" title="What I can do" />
            <div className="skill-groups" data-reveal>
              {skills.map((group) => (
                <article className="skill-group" key={group.category}>
                  <h3>{group.category}</h3>
                  <ul>
                    {group.items.map((item) => {
                      const label = item.replace(/[\[\]]/g, "");
                      const icon = /html/i.test(label)
                        ? "5"
                        : label === "CSS"
                          ? "3"
                          : /javascript/i.test(label)
                            ? "JS"
                            : /react/i.test(label)
                              ? "⚛"
                              : /typescript/i.test(label)
                                ? "TS"
                                : /vite/i.test(label)
                                  ? "V"
                                  : /tailwind/i.test(label)
                                    ? "≈"
                                    : /figma/i.test(label)
                                      ? "●"
                                      : /blender/i.test(label)
                                        ? "✿"
                                        : /electron/i.test(label)
                                          ? "EB"
                                          : /sqlite/i.test(label)
                                            ? "▤"
                                            : "⌘";
                      return (
                        <li
                          key={item}
                          className={`skill-chip skill-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        >
                          <span className="skill-chip-icon" aria-hidden="true">
                            {icon}
                          </span>
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-rule" />
          <div className="content-wrap about-wrap">
            <SectionHead
              kicker="03 / A LITTLE ABOUT ME"
              title={
                <>
                  Problem Solver.
                  <br />
                  <span>Web Developer.</span>
                </>
              }
            />
            <div className="about-profile">
              <div className="about-avatar">
                <img src={profilePhoto} alt={`Portrait of ${profile.name}`} />
              </div>
              <div className="about-details">
                <div className="about-facts">
                  <div>
                    <span>NAME</span>
                    <strong>{profile.name}</strong>
                  </div>
                  <div>
                    <span>FOCUS</span>
                    <strong>{profile.role}</strong>
                  </div>
                  <div>
                    <span>LOCATION</span>
                    <strong>{profile.location}</strong>
                  </div>
                </div>
                <div className="about-bio">
                  <p>{profile.about}</p>
                  <p>
                    I enjoy learning how things work, finding a thoughtful way
                    to bring an idea to life, and sharing what I make.
                  </p>
                  <a href="#contact">
                    MORE ABOUT ME <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="awards-section" id="awards">
          <div className="section-rule" />
          <div className="content-wrap awards-wrap">
            <SectionHead
              kicker="04 / RECOGNITION"
              title="Awards & Achievements"
            />
            <div className="awards-showcase">
              <div className="award-collage" aria-label="Certificate previews">
                {certifications
                  .filter((cert) => cert.image)
                  .map((cert) => (
                    <a
                      className="award-collage-item"
                      href={cert.image}
                      target="_blank"
                      rel="noreferrer"
                      key={cert.title}
                      aria-label={`View ${cert.title} certificate`}
                    >
                      <img
                        src={cert.image}
                        alt={`${cert.title} certificate preview`}
                      />
                    </a>
                  ))}
              </div>
              <div className="awards-grid">
                {certifications.map((cert, i) => (
                  <article className="award-card" key={i}>
                    {cert.image && (
                      <a
                        className="award-preview"
                        href={cert.image}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${cert.title} certificate`}
                      >
                        <img
                          src={cert.image}
                          alt={`${cert.title} certificate`}
                        />
                      </a>
                    )}
                    <div className="award-icon">
                      <Award size={19} />
                    </div>
                    <div className="award-copy">
                      <span>
                        ACHIEVEMENT / {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3>{cert.title}</h3>
                      <p>
                        {cert.issuer} <i /> {cert.year}
                      </p>
                    </div>
                    <ArrowUpRight className="award-arrow" size={15} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="experience-section journey-training-section"
          id="experience"
        >
          <div className="section-rule" />
          <div className="content-wrap journey-training-wrap">
            <div className="journey-panel" data-reveal>
              <div className="journey-panel-heading">
                <span className="journey-panel-index">04</span>
                <BriefcaseBusiness size={16} />
                <h2>Journey</h2>
                <span className="journey-heading-rule" />
              </div>
              <div className="journey-panel-card">
                <div className="journey-timeline">
                  {experience.map((item, index) => (
                    <article className="journey-entry" key={index}>
                      <span className="journey-marker" />
                      <span className="journey-date">{item.period}</span>
                      <h3>{item.role}</h3>
                      <strong>{item.organization}</strong>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="journey-panel training-panel"
              id="education"
              data-reveal
            >
              <div className="journey-panel-heading">
                <span className="journey-panel-index">05</span>
                <Code2 size={17} />
                <h2>Educational Attainment</h2>
                <span className="journey-heading-rule" />
              </div>
              <div className="journey-panel-card">
                <div className="journey-timeline">
                  {education.map((item) => (
                    <article
                      className="journey-entry education-entry"
                      key={item.level}
                    >
                      <span className="journey-marker" />
                      <span className="journey-date">{item.period}</span>
                      <h3>{item.level}</h3>
                      <strong>{item.school}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="resume-section" id="Documents">
          <div className="section-rule" />
          <div className="content-wrap resume-wrap">
            <div className="resume-copy">
              <PixelLabel>08 / Documents</PixelLabel>
              <h2>My Documents</h2>
              <p>
                View my résumé and cover letter for an overview of my education,
                skills, and project experience.
              </p>
            </div>
            <a
              className="resume-placeholder cover-placeholder"
              href={resume}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Philip Miguel's résumé PDF in a new tab"
            >
              <span className="resume-file-icon">
                <BriefcaseBusiness size={20} />
              </span>
              <div>
                <strong>RESUME</strong>
                <small>Open the PDF in a new tab</small>
              </div>
              <span className="resume-status">VIEW PDF ↗</span>
            </a>

            <a
              className="cover-placeholder"
              href={coverLetter}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Philip Miguel's cover letter PDF in a new tab"
            >
              <span className="resume-file-icon">
                <BriefcaseBusiness size={20} />
              </span>
              <div>
                <strong>COVER LETTER</strong>
                <small>Open the PDF in a new tab</small>
              </div>
              <span className="cover-status">VIEW PDF ↗</span>
            </a>
          </div>
        </section>

        <section className="technical-section" id="technical">
          <div className="section-rule" />
          <div className="content-wrap experience-wrap">
            <SectionHead
              kicker="09 / SELECTED WORK"
              title="Technical Projects"
            />
            <div className="technical-list">
              {projects.map((item, i) => (
                <article key={item.number}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="project-tags">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    aria-label={`Open ${item.title}`}
                  >
                    <ArrowUpRight size={17} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="beyond-section" id="beyond">
          <div className="section-rule" />
          <div className="content-wrap beyond-wrap">
            <div>
              <PixelLabel>10 / OFF THE SCREEN</PixelLabel>
              <h2>Beyond Code</h2>
              <p>
                Gaming, technology, and the curiosity that keeps me learning.
              </p>
            </div>
            <div className="beyond-strip">
              <span>GAMING</span>
              <span>TECHNOLOGY</span>
              <span>CREATIVE WORK</span>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-rule" />
          <div className="content-wrap contact-wrap">
            <div className="contact-intro">
              <PixelLabel>11 / GET IN TOUCH</PixelLabel>
              <h2>
                LET’S
                <br />
                WORK
                <br />
                TOGETHER
              </h2>
              <p>
                Looking for the next problem worth solving? Tell me a little
                about it.
              </p>
            </div>
            <div className="contact-details">
              <a className="contact-card" href={`mailto:${profile.email}`}>
                <Mail size={15} />
                <span>
                  <small>EMAIL</small>
                  <strong>{profile.email}</strong>
                </span>
                <ArrowUpRight size={13} />
              </a>
              <a
                className="contact-card"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={15} />
                <span>
                  <small>LINKEDIN</small>
                  <strong>
                    {profile.linkedin.replace("https://www.", "")}
                  </strong>
                </span>
                <ArrowUpRight size={13} />
              </a>
              <a
                className="contact-card"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={15} />
                <span>
                  <small>GITHUB</small>
                  <strong>{profile.github.replace("https://", "")}</strong>
                </span>
                <ArrowUpRight size={13} />
              </a>
              <form className="contact-form" onSubmit={sendMessage}>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  aria-label="Your name"
                />
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Your email"
                  aria-label="Your email"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your message"
                  aria-label="Your message"
                  rows={3}
                />
                <button
                  className="contact-button"
                  type="submit"
                  disabled={emailStatus === "Sending your message…"}
                >
                  <Mail size={14} />{" "}
                  {emailStatus === "Sending your message…"
                    ? "SENDING…"
                    : "SEND A MESSAGE"}{" "}
                  <ArrowUpRight size={14} />
                </button>
                <small aria-live="polite">
                  {emailStatus || "Your message will be emailed directly."}
                </small>
                {emailStatus.startsWith("Couldn’t submit") && (
                  <a
                    className="email-fallback"
                    href={`mailto:${profile.email}`}
                  >
                    Open email app <ArrowUpRight size={11} />
                  </a>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="content-wrap footer-inner">
          <a className="brand" href="#home">
            <span className="brand-icon">
              {profile.name
                .replace(/[\[\]]/g, "")
                .trim()
                .charAt(0) || "P"}
            </span>
            {profile.name}
          </a>

          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
