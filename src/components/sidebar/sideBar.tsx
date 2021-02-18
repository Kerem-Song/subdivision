import React from "react";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  const sideBar = [
    {
      listsId: 1,
      listsTitle: "ProjectPage",
      listsUrl: "/project",
      listsIcon: "fab fa-creative-commons",
      exact: true,
    },
    {
      listsId: 2,
      listsTitle: "InfoPage",
      listsUrl: "/info",
      listsIcon: "fab fa-creative-commons-by",
    },
    {
      listsId: 3,
      listsTitle: "AlarmTalk",
      listsUrl: "/alarmtalk",
      listsIcon: "fab fa-creative-commons-nc",
    },
    {
      listsId: 4,
      listsTitle: "Reservation",
      listsUrl: "/reservation",
      listsIcon: "fab fa-creative-commons-nc",
    },
    {
      listsId: 5,
      listsTitle: "Option",
      listsUrl: "/option",
      listsIcon: "ab fa-creative-commons-nc",
    },
  ];

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
