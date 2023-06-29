export const formatDateJoined = (dateString: string) => {
  const date = dateString ? new Date(dateString) : new Date();

  const monthJoined = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);
  const yearJoined = date.getFullYear();

  return `${monthJoined}, ${yearJoined}`;
};
