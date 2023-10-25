import React from "react";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/PeopleSlice";

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector((state) => state.people.limit);
  const currentPage = useAppSelector((state) => state.people.currentPage);
  const offset = useAppSelector((state) => state.people.offset);

  const buttons = Array.from({ length: 28 }, (_, index) => index + 1);

  const visibleButtons = buttons.slice(currentPage - 1, currentPage + 5);

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous"
        disabled={currentPage === 1}
        onClick={() => {
          dispatch(actions.updatePagination(offset - limit));
          dispatch(actions.previousPage());
        }}
      >
        Previous
      </button>
      <button
        className="pagination-next"
        disabled={currentPage === 25}
        onClick={() => {
          dispatch(actions.updatePagination(limit + offset));
          dispatch(actions.nextPage());
        }}
      >
        Next page
      </button>

      <ul className="pagination-list">
        {visibleButtons.map((button) => (
          <li key={button}>
            <button
              className={cn("pagination-link", "is-link", {
                "is-current": currentPage === button,
              })}
              onClick={() => {
                dispatch(actions.updatePagination(button * limit - limit));
                dispatch(actions.updateCurrentPage(button));
              }}
            >
              {button}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
