import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

function ClearFiltersButton(props) {
  const classes = useStyles();
  return (
    <div>
      <Button
        onClick={props.clearFilters}
        variant="contained"
        className={classes.button}
      >
        Clear Filters
      </Button>
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  clearFilters: () => dispatch({ type: 'RESET_FILTERS' })
});
export default connect(
  null,
  mapDispatchToProps
)(ClearFiltersButton);
