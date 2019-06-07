import React from 'react';
import PropTypes from 'prop-types';
// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
// @material-ui
import { withStyles } from '@material-ui/core/styles';
// api
import api from '../api';
// components
import Product from '../components/Product';
import Sort from '../components/Sort';

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  }
});

class Home extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const { filters, sortBy, sortOrder } = this.props;
    const products = await api.getProducts({
      sortBy,
      sortOrder,
      filters
    });
    this.setState({ products });
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.filters) !==
        JSON.stringify(prevProps.filters) ||
      this.props.sortBy !== prevProps.sortBy ||
      this.props.sortOrder !== prevProps.sortOrder
    ) {
      this.loadProducts();
    }
  }

  render() {
    const { classes } = this.props;
    const { products } = this.state;

    return (
      <div className={classes.heroUnit}>
        <Sort />
        <div className={classes.heroContent}>
          {products.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    heroUnit: PropTypes.string.isRequired,
    heroContent: PropTypes.string.isRequired,
    heroButtons: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = ({ cart, catalog }) => ({
  cart,
  filters: {
    category: catalog.category,
    availability: catalog.availability,
    stock: catalog.stock,
    range: {
      min: catalog.rangeMin,
      max: catalog.rangeMax
    }
  },
  sortBy: catalog.sortBy,
  sortOrder: catalog.sortOrder
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Home);
