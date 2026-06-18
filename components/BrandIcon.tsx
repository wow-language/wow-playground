import {
  Brain,
  MessageSquare,
  Archive,
  GitBranch,
  RefreshCw,
  Hammer,
  Wrench,
  Workflow,
  LifeBuoy,
  Package,
  Hand,
  Hash,
  Monitor,
  Globe,
  Target,
  Languages,
  MessageCircle,
  Lightbulb,
  Rocket,
  Terminal,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

// ── Minimal inline SVG brand icons ──────────────────────────────────────────

export function AppleIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

// Linux: use Lucide Terminal as a recognizable dev/Linux symbol
export function LinuxIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return <Terminal className={className} width={size} height={size} />;
}

export function ArduinoIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.087 6.146c-.3 0-.607.017-.907.069-2.532.367-4.23 2.239-5.18 3.674-.95-1.435-2.648-3.307-5.18-3.674a6.49 6.49 0 0 0-.907-.069C2.648 6.146 0 8.77 0 12s2.656 5.854 5.913 5.854c.3 0 .607-.017.916-.069 2.531-.376 4.23-2.247 5.18-3.683.949 1.436 2.647 3.307 5.18 3.683.299.043.607.069.915.069C21.344 17.854 24 15.23 24 12s-2.656-5.854-5.913-5.854zM6.53 15.734a3.837 3.837 0 0 1-.625.043c-2.148 0-3.889-1.7-3.889-3.777 0-2.085 1.749-3.777 3.898-3.777.208 0 .416.017.624.043 2.39.35 3.847 2.768 4.347 3.734-.508.974-1.974 3.384-4.355 3.734zm11.558.043c-.208 0-.416-.017-.624-.043-2.39-.35-3.856-2.768-4.347-3.734.491-.966 1.957-3.384 4.347-3.734.208-.026.416-.043.624-.043 2.149 0 3.89 1.7 3.89 3.777 0 2.085-1.75 3.777-3.89 3.777zm1.65-4.404v1.134h-1.205v1.182h-1.156v-1.182H16.17v-1.134h1.206V10.19h1.156v1.183h1.206zM4.246 12.498H7.82v-1.125H4.245v1.125z" />
    </svg>
  );
}

export function WindowsIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.628h11.377V24H0zm12.623 0H24V24H12.623z" />
    </svg>
  );
}

// ── WowIcon: maps string names to Lucide components ─────────────────────────

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Brain,
  MessageSquare,
  Archive,
  GitBranch,
  RefreshCw,
  Hammer,
  Wrench,
  Workflow,
  LifeBuoy,
  Package,
  Hand,
  Hash,
  Monitor,
  Globe,
  Target,
  Languages,
  MessageCircle,
  Lightbulb,
  Rocket,
  Terminal,
};

export function WowIcon({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
}
