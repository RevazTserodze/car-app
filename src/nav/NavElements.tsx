import { NavLink } from "react-router-dom";
import styled from "styled-components";

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 30px;
`;

const ListItem = styled.li`
  margin-top: 18px;
  position: relative;

  a {
    position: relative;
    text-decoration: none;
    color: black;
    font-family: "Arial", sans-serif;
    font-size: 16px;
    transition: color 0.4s ease;
  }

  a::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    transition: width 0.4s ease, left 0.4s ease;
  }

  a:hover::after {
    width: 100%;
    left: 0;
  }

  a:hover {
    color: #6e8efb;
    font-family: "Arial", sans-serif;
  }

  .active {
    color: #6e8efb;
    font-family: "Arial", sans-serif;
  }

  .active::after {
    width: 100%;
    left: 0;
  }
`;

const ContactButton = styled.button<{ isActive?: boolean }>`
  background: ${({ isActive }) =>
    isActive ? "linear-gradient(135deg, #6e8efb, #a777e3)" : "transparent"};
  border: 2px solid #6e8efb;
  margin-top: 5px;
  color: ${({ isActive }) => (isActive ? "white" : "#6e8efb")};
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease,
    transform 0.4s ease;

  &:hover {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    color: white;
    border-color: transparent;
    transform: scale(1);
  }
`;

const NavElements: React.FC = () => {
  return (
    <List>
      <ListItem>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          მთავარი
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          სერვისები
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          ჩვენ შესახებ
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          to="/partners"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          პარტნიორები
        </NavLink>
      </ListItem>

      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        {({ isActive }) => (
          <ContactButton isActive={isActive}>კონტაქტი</ContactButton>
        )}
      </NavLink>
    </List>
  );
};

export default NavElements;