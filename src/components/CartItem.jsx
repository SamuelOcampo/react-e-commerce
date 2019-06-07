import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { actionTypes } from '../redux/cart';

const useStyles = makeStyles({
  card: {
    width: 320,
    margin: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {},
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
});

function Product(props) {
  const classes = useStyles();
  const { name, price, available, quantity, qty, updateProductQty, id, removeProduct } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://picsum.photos/700"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {price}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Available {available ? 'Yes' : 'No'} - Stock: {quantity}
        </Typography>
      </CardContent>
      <CardActions>
        <TextField
          id="outlined-name"
          label="Quantity"
          name={id}
          className={classes.range}
          value={qty}
          onChange={e => updateProductQty(e.target)}
          margin="normal"
          variant="outlined"
        />
        <Button size="small" onClick={() => removeProduct(id)}>
          Remove from Cart
        </Button>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  updateProductQty: ({ name, value }) =>
    dispatch({
      type: actionTypes.UPDATE_PRODUCT_QTY,
      payload: { id: name, qty: value }
    }),
  removeProduct: payload =>
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload })
});

export default connect(
  null,
  mapDispatchToProps
)(Product);
