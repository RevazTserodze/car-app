import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  to {
    transform: translateY(0);
    opacity: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

interface TogglerButtonProps {
  isNavVisible: boolean;
}

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  transition: top 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  z-index: 1;
`;

const NavIcon = styled.img`
  width: 50px;
`;

const TogglerButton = styled.button<TogglerButtonProps>`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1300px) {
    display: block;
  }

  ${({ isNavVisible }) =>
    isNavVisible &&
    css`
      transform: rotate(90deg);
    `}
`;

const NavItems = styled.div<{ isVisible: boolean }>`
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  background-color: #333;
  position: absolute;
  top: 70px;
  left: 0;
  max-height: ${(props) => (props.isVisible ? "calc(100vh - 60px)" : "0")};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(-20px)"};
  overflow: hidden;
  animation: ${(props) =>
    props.isVisible
      ? css`
          ${slideIn} 0.3s ease-out forwards
        `
      : css`
          ${slideOut} 0.3s ease-in forwards
        `};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 15px;
  display: block;
  transition: color 0.3s ease;

  &:hover {
    color: #ddd;
  }
`;

const NavItem = styled.div`
  @media (min-width: 1301px) {
    margin: 0 10px;
  }
`;

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState("up");
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > lastScrollTop) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return scrollDir;
};

const ResponsiveNav = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isButtonToggled, setIsButtonToggled] = useState(false);
  const scrollDir = useScrollDirection();

  const toggleNav = useCallback(() => {
    setIsButtonToggled((prev) => !prev);

    if (isNavVisible) {
      setIsNavVisible(false);
      setTimeout(() => setIsButtonToggled(false), 300);
    } else {
      setIsNavVisible(true);
    }
  }, [isNavVisible]);

  const handleNavLinkClick = useCallback(() => {
    setIsNavVisible(false);
    setIsButtonToggled(false);
  }, []);

  useEffect(() => {
    if (!isNavVisible) {
      setIsButtonToggled(false);
    }
  }, [isNavVisible]);

  return (
    <Navbar
      style={{
        top: scrollDir === "down" ? "-120px" : "0",
        boxShadow:
          scrollDir === "down"
            ? "0 2px 5px rgba(0, 0, 0, 0.2)"
            : "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <NavIcon
        src="https://cdn-icons-png.flaticon.com/128/1023/1023757.png"
        alt="nav-icon"
      />
      <TogglerButton
        onClick={toggleNav}
        isNavVisible={isButtonToggled}
        aria-label={isNavVisible ? "Close menu" : "Open menu"}
      >
        {isButtonToggled ? "×" : "☰"}
      </TogglerButton>
      <NavItems isVisible={isNavVisible}>
        <NavItem>
          <NavLink to="/" onClick={handleNavLinkClick}>
            მთავარი
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/services" onClick={handleNavLinkClick}>
            სერვისები
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" onClick={handleNavLinkClick}>
            ჩვენ შესახებ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/partners" onClick={handleNavLinkClick}>
            პარტნიორები
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/gallery" onClick={handleNavLinkClick}>
            ფოტო გალერეა
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/blog" onClick={handleNavLinkClick}>
            ბლოგი
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact" onClick={handleNavLinkClick}>
            კონტაქტი
          </NavLink>
        </NavItem>
      </NavItems>
    </Navbar>
  );
};

export default ResponsiveNav;