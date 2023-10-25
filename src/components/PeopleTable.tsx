import React, { useState } from "react";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { actions } from "../features/PeopleSlice";
import { getPreparedTable } from "../utils/getPreparedTable";
import { updatePerson } from "../services/peopleService";
import { Person } from "../types/Person";

export const PeopleTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector((state) => state.people.people);
  const selectedPerson = useAppSelector((state) => state.people.selectedPerson);

  const [sortField, setSortField] = useState<keyof Person | "">("");
  const [isEditing, setIsEditing] = useState(false);
  const [personEdit, setPersonEdit] = useState<Person>(selectedPerson!);

  const preparedPeople = getPreparedTable(people, sortField);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = event.target;
    if (personEdit) {
      setPersonEdit((current) => ({ ...current, [field]: value }));
    }
  };

  const updatedPerson = async() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const newPerson: Omit<Person, 'id'> = {
      name: personEdit.name,
      email: personEdit.email,
      birthday_date: formattedDate,
      phone_number: personEdit.phone_number,
      address: personEdit.address,
    }

    try {
      const editPerson = await updatePerson(personEdit.id, newPerson);
      dispatch(actions.updatePerson(editPerson));
    } catch (error) {
      dispatch(actions.setError(`${error}`));
    } finally {
      setTimeout(() => {
        dispatch(actions.setError(``));
        setIsEditing(false);
      }, 3000);
    }
    
  }

  return (
    <div className="content">
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th onClick={() => setSortField("id")}>#</th>
            <th onClick={() => setSortField("name")}>Name</th>
            <th onClick={() => setSortField("email")}>Email</th>
            <th onClick={() => setSortField("phone_number")}>Phone</th>
            <th onClick={() => setSortField("address")}>Address</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {preparedPeople.map((person) => (
            <tr
              key={person.id}
              className={cn({
                "has-text-grey-light": isEditing && person.id === selectedPerson?.id,
              })}
            >
              <td>{person.id}</td>
              <td>
                {isEditing && person.id === selectedPerson?.id ? (
                  <input
                    name="name"
                    type="text"
                    className="edit"
                    value={personEdit?.name}
                    onChange={handleChange}
                  />
                ) : (
                  person.name
                )}
              </td>
              <td>
                {isEditing && person.id === selectedPerson?.id ? (
                  <input
                    name="email"
                    type="text"
                    className="edit"
                    value={personEdit?.email}
                    onChange={handleChange}
                  />
                ) : (
                  person.email
                )}
              </td>
              <td>
                {isEditing && person.id === selectedPerson?.id ? (
                  <input
                    name="phone_number"
                    type="text"
                    className="edit"
                    value={personEdit?.phone_number}
                    onChange={handleChange}
                  />
                ) : (
                  person.phone_number
                )}
              </td>
              <td>
                {isEditing && person.id === selectedPerson?.id ? (
                  <input
                    name="birthday_date"
                    type="text"
                    className="edit"
                    value={personEdit?.address}
                    onChange={handleChange}
                  />
                ) : (
                  person.name
                )}
              </td>
              <td className="has-text-success is-vcentered">
                {isEditing && person.id === selectedPerson?.id ? (
                  <button
                    type="button"
                    className="icon button is-inverted is-info"
                    onClick={updatedPerson}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                ) : null}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  className="icon button is-inverted is-info"
                  onClick={() => {
                    dispatch(
                      actions.selectedPerson(
                        person === selectedPerson ? null : person
                      )
                    );
                    setIsEditing(true);
                    setPersonEdit(person);
                  }}
                >
                  <i className="fas fa-pen"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
