import { MyDate } from "./Date";

export const PMC = (props: { p: any }) => {
  const { p } = props;
  const time = new Date(p.time);

  return (
    <div className="grid grid-cols-4 text-center shadow p-2 bg-white mx-1">
      <h2>{p.productName}</h2>
      <h4>{p.quantity}</h4>
      <p>{p.type}</p>
      <MyDate
        day={time.getDate()}
        month={time.getMonth() + 1}
        year={time.getFullYear()}
      />
    </div>
  );
};
