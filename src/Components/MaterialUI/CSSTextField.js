import { TextField, withStyles } from "@material-ui/core";

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-input': {
            color: 'white'
        },

        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#545454',
            },
            '&:hover fieldset': {
                borderColor: '#7aaef3',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
                color: 'white'
                // backgroundColor: '#3b3939'
            },
        },
    },
})(TextField);

export default CssTextField