import {Tab, withStyles} from "@material-ui/core";

const StyledTab = withStyles({
    root: {
        flexGrow: 1,
        fontSize: '1.2rem',
        '&:focus': {
            outline: 'none',
        },
        '& span': {
            '&:focus': {
                outline: 'none',
            },
        },
    },
})(Tab);

export default StyledTab;
