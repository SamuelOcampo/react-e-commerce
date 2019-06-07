import React from 'react';
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
// @material-ui
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// actionTypes
import { actionTypes } from '../redux/catalog';

const styles = {
  range: {
    width: '50%'
  }
};

function Sort(props) {
  const { classes, rangeMin, rangeMax, addFilter, availability, stock } = props;
  return (
    <React.Fragment>
      <div>
        <Typography component="h3" variant="subtitle2" color="inherit">
          Availability
        </Typography>
        <Select
          value={availability}
          inputProps={{
            name: 'availability',
            id: 'availability'
          }}
          onChange={e => addFilter(e.target)}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={true}>Available</MenuItem>
          <MenuItem value={false}>Not Available</MenuItem>
        </Select>
      </div>
      <div>
        <Typography component="h3" variant="subtitle2" color="inherit">
          Price Range
        </Typography>
        <TextField
          id="outlined-name"
          label="Min"
          className={classes.range}
          value={rangeMin}
          name="rangeMin"
          margin="normal"
          variant="outlined"
          onChange={e => addFilter(e.target)}
        />
        <TextField
          id="outlined-name"
          label="Max"
          name="rangeMax"
          className={classes.range}
          value={rangeMax}
          onChange={e => addFilter(e.target)}
          margin="normal"
          variant="outlined"
        />
      </div>
      <div>
        <Typography component="h3" variant="subtitle2" color="inherit">
          Stock
        </Typography>
        <TextField
          id="outlined-name"
          label="Qty"
          value={stock}
          name="stock"
          margin="normal"
          variant="outlined"
          onChange={e => addFilter(e.target)}
        />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = ({ catalog }) => ({
  rangeMin: catalog.rangeMin,
  rangeMax: catalog.rangeMax,
  availability: catalog.availability,
  stock: catalog.stock
});

const mapDispatchToProps = dispatch => ({
  addFilter: payload => dispatch({ type: actionTypes.ADD_FILTER, payload })
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Sort);
