import moment from "moment";

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));
  if (!parsed.isValid()) {
    return dateString;
  }
  return parsed.format("H A on D MMM YYYY");
}

export function dueDateChecker(t) {
  let timeLeft = t.dueDate - Date.now();
  if (timeLeft <= 86400000 && timeLeft >= 0) {
    alert(`${t.title} is almost approaching`);
  }
}
