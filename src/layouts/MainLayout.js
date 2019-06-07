import React from 'react';
import PropTypes from 'prop-types';
// utils
import classNames from 'classnames';
// @material-ui/core
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// components
import Categories from '../components/Categories';
import Filters from '../components/Filters';
import ClearFiltersButton from '../components/ClearFiltersButton';
import { compose } from 'redux';
import { connect } from 'react-redux';

const drawerWidth = 320;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  account: {
    marginLeft: 10
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    maxHeight: '100vh',
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerSection: {
    padding: '0 10px'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: 0
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto'
  },
  h5: {
    marginBottom: theme.spacing(2)
  }
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };

    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, children, name, cartCount } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <ClearFiltersButton />
            </Typography>
            <Typography
              className={classes.account}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              {name}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !open && classes.drawerPaperClose
            )
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.drawerSection}>
            <Typography component="h1" variant="h6" color="inherit">
              Categories
            </Typography>
            <Categories />
          </div>
          <Divider />
          <div className={classes.drawerSection}>
            <Typography component="h3" variant="h6" color="inherit">
              Filters
            </Typography>
            <Filters />
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
    toolbarIcon: PropTypes.string.isRequired,
    appBar: PropTypes.string.isRequired,
    appBarShift: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
    menuButtonHidden: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    drawerPaper: PropTypes.string.isRequired,
    drawerPaperClose: PropTypes.string.isRequired,
    appBarSpacer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    h5: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.element.isRequired
};

const mapStateToProps = ({ cart }) => ({
    cartCount: cart.cartCount
})
export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(Layout);
