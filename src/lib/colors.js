// Central place mapping a project's `color` key to Tailwind class sets, so
// every card/badge/progress bar stays visually consistent per subject.
export const COLOR_THEME = {
  sky: { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-300", solid: "bg-sky-500", chip: "bg-sky-100 text-sky-700" },
  sunshine: {
    bg: "bg-sunshine-100",
    text: "text-sunshine-600",
    border: "border-sunshine-300",
    solid: "bg-sunshine-400",
    chip: "bg-sunshine-100 text-sunshine-600",
  },
  grass: { bg: "bg-grass-100", text: "text-grass-700", border: "border-grass-300", solid: "bg-grass-500", chip: "bg-grass-100 text-grass-700" },
  coral: { bg: "bg-coral-100", text: "text-coral-600", border: "border-coral-300", solid: "bg-coral-500", chip: "bg-coral-100 text-coral-600" },
  grape: { bg: "bg-grape-100", text: "text-grape-600", border: "border-grape-300", solid: "bg-grape-500", chip: "bg-grape-100 text-grape-600" },
};

export function theme(color) {
  return COLOR_THEME[color] || COLOR_THEME.sky;
}
