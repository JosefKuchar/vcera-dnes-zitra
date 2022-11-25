import { Component, createSignal, For, onMount } from "solid-js";

import Day from "./Day";

const getLimit = () =>
  Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

const App: Component = () => {
  const [days, setDays] = createSignal<number[]>([
    -4, -3, -2, -1, 0, 1, 2, 3, 4,
  ]);

  onMount(() => {
    document.addEventListener("scroll", () => {
      const limit = getLimit();
      const offset = 50;
      // Add more days when we are close to the top
      if (window.scrollY <= offset) {
        setDays((days) => [
          ...new Array(20)
            .fill(0)
            .map((_, i) => days[0] - i - 1)
            .reverse(),
          ...days,
        ]);
        // Adjust scroll position to keep the same content visible
        window.scrollTo(0, getLimit() - limit);
        // Add more days when we are close to the bottom
      } else if (window.innerHeight + window.scrollY >= limit - offset) {
        setDays((days) => [
          ...days,
          ...new Array(20).fill(0).map((_, i) => days[days.length - 1] + i + 1),
        ]);
      }
    });
  });

  return <For each={days()}>{(day) => <Day index={day} />}</For>;
};

export default App;
