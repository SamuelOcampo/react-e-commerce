import React from 'react';
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
// @material-ui
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// actionTypes
import { actionTypes } from '../redux/catalog';

const styles = {
  formControl: {
    width: '50%'
  }
};

function Sort(props) {
  const { classes, addFilter, sortBy, sortOrder } = props;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-label-placeholder">
          Sort By {sortBy}
        </InputLabel>
        <Select
          value={sortBy}
          inputProps={{
            name: 'sortBy',
            id: 'order'
          }}
          onChange={e => addFilter(e.target)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'price'}>Price</MenuItem>
          <MenuItem value={'available'}>Availability</MenuItem>
          <MenuItem value={'quantity'}>Quantity</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-label-placeholder">
          Order
        </InputLabel>
        <Select
          value={sortOrder}
          inputProps={{
            name: 'sortOrder',
            id: 'sort-direction'
          }}
          onChange={e => addFilter(e.target)}
        >
          <MenuItem value={1}>ASC</MenuItem>
          <MenuItem value={-1}>DESC</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

const mapStateToProps = ({ catalog }) => ({
  sortBy: catalog.sortBy,
  sortOrder: catalog.sortOrder
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
