import { BottomNavigation, BottomNavigationAction, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArrayFromDictionary } from '../util/util';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Navbar(props) {

    let userName;
    const classes = useStyles();
    const [mainNav, setMainNav] = React.useState(0);
    const [user, setUser] = React.useState(0);
    const [logout, setLogout] = React.useState(0);

    //componentDidMount for function component
    useEffect(() => {
        if (window && window.location && window.location.pathname) {
            const location = window.location.pathname
            if (location.includes('new')) {
                setMainNav(1)
            } else if (location.includes('leaderboard')) {
                setMainNav(2)
            } else {
                setMainNav(0)
            }
        }
    }, [])

    const handleChange = (event) => {
        setUser(event.target.value);
        props.onChangeHandler(event)
    };

    const userDictionary = (props.users && props.users.users) && props.users.users;
    const userArray = getArrayFromDictionary(userDictionary);

    const isAuthenticated = props.login && props.login.isAuthenticated;
    if (isAuthenticated) {
        const id = props.authenticatedUser;
        if (userDictionary) {
            userName = userDictionary[id]['name'];
        }
    }

    return (
        <nav className="navigation-bar">
            <div className="navigation-buttons">
                <BottomNavigation
                    value={mainNav}
                    onChange={(event, newValue) => {
                        setMainNav(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Questions" icon={<QuestionAnswerIcon />}
                        component={Link}
                        to="/" />
                    <BottomNavigationAction label="New Question" icon={<AddBoxIcon />}
                        component={Link}
                        to="/new" />
                    <BottomNavigationAction label="Leaders" icon={<AssignmentIcon />}
                        component={Link}
                        to="/leaderboard" />
                </BottomNavigation>

            </div>
            <div>
                {isAuthenticated && (
                    <BottomNavigation
                        value={logout}
                        onChange={(event, newValue) => {
                            setLogout(newValue);
                        }}
                        showLabels
                    >
                        <BottomNavigationAction label={'Logout ' + userName} icon={<AccountCircleIcon />}
                            onClick={(event) => {
                                props.logout(event)
                                setUser(0)
                            }} />
                    </BottomNavigation>
                )}
                {!isAuthenticated && (
                    <FormControl className={classes.margin}>
                        <InputLabel id="select-user-filled-label">Impersonate:</InputLabel>
                        <Select
                            labelId="select-user-label"
                            id="select-user"
                            value={user}
                            onChange={handleChange}
                            name="authenticatedUser"
                        >
                            <MenuItem value="0">Select a user</MenuItem>
                            {userArray.map(user => {
                                return (<MenuItem value={user["id"]} key={user["id"]}>{user["name"]}</MenuItem>)
                            })}

                        </Select>
                    </FormControl>
                )}
            </div>
        </nav>
    )
}
