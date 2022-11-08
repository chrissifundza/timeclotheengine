import { Avatar, Divider, Link, ListItemIcon, Menu, MenuItem } from "@mui/material";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { useUIContext } from "../../context/ui";
import Logout from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
export default function Logged() {
    const { setShowSearchBox,open,handleClick,handleClose, anchorEl, currentUser} = useUIContext();
      
function LogOut() {
    const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("Successfully logged")
  }).catch((error) => {
    // An error happened.
  });
  }
    return(
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href="/profile"  underline="none">
        <MenuItem>
       
        <Avatar /> Profile
        
        </MenuItem>
        </Link>
        <Link href="/orders" underline="none">
        <MenuItem> 
       
        <AirportShuttleIcon color="secondary" /> Track Order
        
        </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={LogOut}>
        <ListItemIcon>
        <Logout fontSize="small"  />
        </ListItemIcon>
        Logout
        </MenuItem>
       </Menu>
    )
}