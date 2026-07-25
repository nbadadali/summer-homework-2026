export const MOTIVATIONAL_QUOTES = [
  "Every big project starts with one small step. You've got this! 🌟",
  "Mistakes help your brain grow stronger — keep trying!",
  "You don't have to be perfect, you just have to try your best. 💪",
  "Learning a little every day adds up to something amazing.",
  "Be proud of how far you've come, not just how far you have to go.",
  "Great explorers ask questions. Curious minds learn the most!",
  "Reading, writing, building, drawing — every activity makes you smarter.",
  "Slow and steady finishes the summer homework race!",
  "You are capable of amazing things. Now go show it!",
  "A little progress each day adds up to big results.",
];

export function quoteForToday() {
  const day = new Date().getDate();
  return MOTIVATIONAL_QUOTES[day % MOTIVATIONAL_QUOTES.length];
}

export const FUN_FACTS = [
  "The UAE's national bird, the Falcon, can dive at over 300 km/h!",
  "Water covers about 70% of the Earth's surface.",
  "A rainbow always has 7 colours, even if some are hard to see.",
  "The Sun is so big that about 1.3 million Earths could fit inside it.",
  "Honeybees communicate by dancing!",
  "Your brain uses about 20% of your body's energy, even though it's small.",
  "A group of stars that makes a picture in the sky is called a constellation.",
  "Giraffes are the tallest animals on Earth.",
];

export function factForToday() {
  const day = new Date().getDate();
  return FUN_FACTS[day % FUN_FACTS.length];
}
