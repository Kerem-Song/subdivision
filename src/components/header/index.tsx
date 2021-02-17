import React from "react";
import { useMe } from "../../hooks/useMe";

const Header = () => {
  const { data } = useMe();
  const role = data?.me.role;

  return (
    <header id="header" className="px-5 py-3 bg-white">
      <h1>{role}님 반갑습니다</h1>
    </header>
  );
};

export default Header;
