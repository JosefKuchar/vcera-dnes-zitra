import { Component, createSignal } from "solid-js";

interface IProps {
  index: number;
}

// Get name of the day
const getName = (index: number) => {
  if (index <= -2) {
    return `Před${"před".repeat(-index - 2)}evčírem`;
  } else if (index === -1) {
    return "Včera";
  } else if (index === 0) {
    return "Dnes";
  } else if (index === 1) {
    return "Zítra";
  } else {
    return `Po${"po".repeat(index - 2)}zítří`;
  }
};

// Get datestring based on index
const getDate = (index: number) => {
  const date = new Date();
  // Add index days to today's date
  date.setDate(date.getDate() + index);
  return date.toLocaleDateString("cs-CZ");
};

// Day component
const Day: Component<IProps> = ({ index }) => {
  const [date, setDate] = createSignal(getDate(index));

  setInterval(() => {
    setDate(getDate(index));
  }, 1000); // Update date every second

  return (
    <div class="text-center p-4 border-gray-700 border-2 rounded m-4">
      <div class="text-gray-300">{date()}</div>
      <div class="text-xl break-all">{getName(index)}</div>
    </div>
  );
};

export default Day;
