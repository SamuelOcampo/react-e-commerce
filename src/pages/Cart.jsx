import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ShoppingCartICon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CartItem from '../components/CartItem';
import { actionTypes } from '../redux/cart';
import { Link } from 'react-router-dom';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    margin: theme.spacing(1),
  },
});

class Cart extends React.Component {
  doPayment = () => {
    this.props.clearCart();
    this.props.history.push('/');
  };
  render() {
    const { classes, products } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ShoppingCartICon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cart
          </Typography>
          <div>
            <Button
              size="large"
              className={classes.button}
              variant="contained"
              color="secondary"
              component={Link}
              to="/"
            >
              Go Back
            </Button>
            <Button
              size="large"
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.doPayment}
            >
              Pay now
            </Button>
          </div>
          <div>
            {products.map(product => (
              <CartItem key={product.id} {...product} />
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  products: cart.products
});

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch({ type: actionTypes.CLEAR_CART })
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Cart);
