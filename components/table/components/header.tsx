import { FC } from "react";
import { HeaderProps } from "../type";

const Header: FC<HeaderProps> = ({
  columns,
  handleSortChange,
  sortBy,
  sortOrder,
  actions,
}) => {
  return (
    <>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name}>
              {column.label}
              {sortBy === column.name && (
                <span
                  onClick={() => handleSortChange(column.name)}
                  className="cursor-pointer"
                >
                  {sortOrder === "asc" ? " ▲" : " ▼"}
                </span>
              )}
              <span
                onClick={() => handleSortChange(column.name)}
                className="cursor-pointer"
              >
                {sortBy !== column.name && " ▲"}
              </span>
            </th>
          ))}
          {actions && actions.length > 0 && (
            <th className="text-center">Actions</th>
          )}
        </tr>
      </thead>
    </>
  );
};

export default Header;
