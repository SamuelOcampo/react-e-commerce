import React from 'react';
// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
// @material-ui/core
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

// api
import api from '../api';
// actionTypes
import { actionTypes } from '../redux/catalog';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class Categories extends React.Component {
  state = {
    categories: []
  };
  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = async () => {
    const categories = await api.getCategories();
    this.setState({
      categories
    });
  };

  addFilter = value => () => {
    this.props.addFilter({
      name: 'category',
      value
    });
  };

  renderCategories = (categories, top = false) => {
    const { classes, activeCategory } = this.props;

    return (
      <React.Fragment>
        {categories.map(({ name, sublevels, id }) => (
          <React.Fragment key={name}>
            <ListItem
              selected={!top && activeCategory === id}
              onClick={top ? function() {} : this.addFilter(id)}
              disabled={top}
              button={!top}
            >
              <ListItemText primary={name} />
            </ListItem>

            {sublevels && (
              <List className={classes.nested} component="div" disablePadding>
                {this.renderCategories(sublevels)}
              </List>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  };

  render() {
    const { categories } = this.state;
    return (
      <List component="nav" aria-labelledby="nested-list-subheader">
        {this.renderCategories(categories, true)}
      </List>
    );
  }
}

const mapStateToProps = ({ catalog }) => ({
  activeCategory: catalog.category
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
)(Categories);
