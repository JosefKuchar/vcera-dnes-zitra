import { Component, createSignal, For, onMount } from "solid-js";

import Day from "./Day";

// Get max scroll position
const getLimit = () =>
  Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

// Main component
const App: Component = () => {
  const [days, setDays] = createSignal<number[]>(
    // -25 to 25 days
    new Array(51).fill(0).map((_, i) => i - 25)
  );

  onMount(() => {
    // Scroll to the middle of the page
    window.scrollTo(0, getLimit() / 2 - window.innerHeight / 2);

    // Update days when scrolling
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

  // Render days
  return (
    <div class="bg-gray-800 text-white">
      <For each={days()}>{(day) => <Day index={day} />}</For>
    </div>
  );
};

export default App;
