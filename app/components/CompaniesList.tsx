import { Link } from "@remix-run/react";

export const CompaniesList = (props: {
  list: { id: number; name: string }[];
}) => {
  const { list } = props;
  return (
    <>
      <div className="text-center w-max mx-auto p-4 m-10 flex gap-3 flex-col">
        <h1 className=" text-yellow-700 text-5xl">Companies and Businesses</h1>
        <h2 className="text-3xl">
          These are <em>Companies and Businesses</em> you manage
        </h2>
        <h3 className="text-2xl">Click on any to enter</h3>
      </div>
      <div className="flex flex-wrap gap-4 justify-around text-center">
        {list.map((company, i) => (
          <Link
            key={i}
            to={`${company.id}`}
            className="bg-white shadow p-4 rounded"
          >
            <h3 className="text-3xl text-blue-500 m-2">{company.name}</h3>
            <p>
              Share{" "}
              <code className="text-2xl text-indigo-900 m-2">{company.id}</code>
              with staff to sign up
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};
