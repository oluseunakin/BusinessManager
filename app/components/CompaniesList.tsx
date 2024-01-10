import { Link } from "@remix-run/react";

export const CompaniesList = (props: { list: {id: number, name: string}[] }) => {
  const { list } = props;
  return (
    <>
      <h1 className="text-center text-yellow-900 text-3xl mb-10 w-max mx-auto">
        Companies
      </h1>
      <div className="flex flex-wrap gap-4 justify-around text-center">
        {list.map((company, i) => (
          <Link
            key={i}
            to={`${company.id}`}
            className="bg-white shadow p-4 rounded"
          >
            <h3 className="text-3xl text-blue-500 m-2">{company.name}</h3>
            <p>Share <code className="text-2xl text-indigo-900 m-2">{company.id}</code>with staff to sign up</p>
          </Link>
        ))}
      </div>
    </>
  );
};
