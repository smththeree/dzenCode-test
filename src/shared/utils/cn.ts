type ClassValue = string | false | null | undefined | Record<string, boolean>;

export function cn(...classes: ClassValue[]): string {
  return classes
    .map((cls) => {
      if (!cls) return "";
      if (typeof cls === "string") return cls;
      return Object.keys(cls)
        .filter((key) => cls[key])
        .join(" ");
    })
    .filter(Boolean)
    .join(" ");
}
