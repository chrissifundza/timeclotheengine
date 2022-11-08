import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AppbarContainer,
  AppbarHeader,
  MyList,
} from "../../styles/appbar";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Actions from "./actions";
import { useUIContext } from "../../context/ui";
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import Logged from "../menu/logged";
import LoggedOut from "../menu/loggedout";

export default function AppbarDesktop({ matches }) {
  
  const { setShowSearchBox,open,handleClick,handleClose, anchorEl, currentUser} = useUIContext();




let loggedout=
<>
<MenuItem>
<ListItemIcon>
  <Logout fontSize="small" />
</ListItemIcon>
Login
</MenuItem>
</>
  return (
    <AppbarContainer>
      <AppbarHeader variant="h4">TC Engine</AppbarHeader>
      <MyList type="row" >
       <Link sx={{mr:3}} href="/" underline="none"> <ListItemText primary="Home" /> </Link>
       
       <Link sx={{mr:3}} href="/aboutus" underline="none"><ListItemText primary="About us" /> </Link>
       <Link sx={{mr:3}} href="/contactus" underline="none"> <ListItemText primary="Contact us" /> </Link>
       
          </MyList>
       <Actions matches={matches} />   
       {currentUser=="LoggedIN"?<Logged/>:<LoggedOut/>}
    </AppbarContainer>
    
  );
}
