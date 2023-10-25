import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { peopleAsync } from "../features/PeopleSlice";

import { Pagination } from "../components/Pagination";
import { PeopleTable } from "../components/PeopleTable";
import { Loader } from "../components/Loader";

export const PeoplePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.people.error);
  const limit = useAppSelector((state) => state.people.limit);
  const offset = useAppSelector((state) => state.people.offset);
  const loading = useAppSelector((state) => state.people.loading);

  useEffect(() => {
    dispatch(peopleAsync({ limit, offset }));
  }, []);

  useEffect(() => {
    dispatch(peopleAsync({ limit, offset }));
  }, [offset]);

  return (
    <div className="content">
      <h1 className="title">People</h1>

      {loading ? <Loader /> : <PeopleTable />}

      <Pagination />

      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
