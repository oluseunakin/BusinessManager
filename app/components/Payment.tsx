export const Payment = (props: {
  setToShow: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setToShow } = props;
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl">Payment Methods</h3>
      <div className="flex flex-wrap gap-2">
        <button
        className="bg-red-700 px-4 py-2 text-white rounded"
          onClick={() => {
            setToShow("cash");
          }}
        >
          Cash
        </button>
      </div>
    </div>
  );
};
