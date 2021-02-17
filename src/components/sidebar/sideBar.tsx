import React from "react";
import { NavLink } from "react-router-dom";
import { sideBar } from "../../utils/sideBar";

export const SideBar = () => {
  return (
    <aside
      id="sideBar"
      className="flex-shirink-0 p-2 w-22 bg-gray-700 text-white"
    >
      <nav>
        <div className="sidebarLists">
          <ul>
            {sideBar.map((v) => {
              return (
                <NavLink
                  key={v.listsId}
                  to={`${v.listsUrl}`}
                  // onClick={() => console.log(`match.url:`, v.listsUrl)}
                >
                  <li className="py-2">{v.listsTitle}</li>
                </NavLink>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
