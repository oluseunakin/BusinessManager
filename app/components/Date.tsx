export const MyDate = (props: { day: number; month: number; year: number }) => {
  const { day, month, year } = props;
  return (
    <p>
      <span>{day}</span>
      <span>/</span>
      <span>{month}</span>
      <span>/</span>
      <span>{year}</span>
    </p>
  );
};
