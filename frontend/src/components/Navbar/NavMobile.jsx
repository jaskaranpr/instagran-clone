import { Footer, Header, Icon } from "./styled/NavMob";
import {
  ExploreMob,
  Homeicon,
  Hearticon,
  Posticon,
  Profileicon,
} from "./assets/Icons";
import { Link, useLocation } from "react-router-dom";

export const NavMobile = () => {
  return (
    <div>
      <Bottom />
    </div>
  );
};

function Bottom() {
  const { pathname } = useLocation();
  return (
    <>
      <Header></Header>
      <Footer>
        <Icon>
          <Homeicon />
        </Icon>
        <Icon>
          <ExploreMob />
        </Icon>
        <Icon>
          <Posticon />
        </Icon>
        <Icon>
          <Link to="/accounts/activity/">
            <Hearticon heart={pathname === "/accounts/activity/"} />
          </Link>
        </Icon>
        <Icon>
          <Profileicon />
        </Icon>
      </Footer>
    </>
  );
}
