import { Component } from "solid-js";

interface IProps {
  index: number;
}

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

const getDate = (index: number) => {
  const date = new Date();
  // Add index days to today's date
  date.setDate(date.getDate() + index);
  return date.toLocaleDateString("cs-CZ");
};

const Day: Component<IProps> = ({ index }) => {
  return (
    <div class="text-center p-4 border-gray-50 border-2 m-4">
      <div>{getDate(index)}</div>
      <div class="text-xl break-all">{getName(index)}</div>
    </div>
  );
};

export default Day;
