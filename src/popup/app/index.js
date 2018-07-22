// @flow
import * as React from 'react';
import {connect} from 'react-redux'
import merge from 'lodash/merge';


import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SwipeableViews from 'react-swipeable-views';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import RecentView from './recent'
import ImagesView from './images'

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Photo from '@material-ui/icons/Photo';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles.js';

function Transition(props: Object) {
    return <Slide direction="up" {...props} />;
}

type Props = {
    theme: Object,
    classes: Object,
    lastAction: Object,
    pocket: Array<Object>,
    images: Array<Object>,
    removeFromPocket: Function,
}

type State = {
    navigation: string,
    editItem: ?Object

}

const OPTIONS = ['recent', 'images', 'favorites'];

class MainApp extends React.PureComponent<Props, State> {
    constructor(props: Object) {
        super(props);

        this.state = {
            navigation: "recent",
            editItem: null
        };
    }

    componentDidMount() {
        if (process.env.ENV !== 'production') {
            window.app = this;
        }
    }

    handleChange(event: Object, value: string) {
        this.setState({navigation: value});
    };

    handleChangeIndex(index: number) {
        this.setState({navigation: OPTIONS[index]});
    }

    openEdit(item: Object) {
        this.setState({editItem: item});
    };

    closeEdit() {
        this.setState({editItem: null});
    };

    saveItem() {
        this.props.editInPocket(this.state.editItem);
        this.closeEdit();
    }

    render() {
        const {classes, theme, pocket, images} = this.props;
        const {navigation, collapseIds} = this.state;

        return (
            <div className={classes.root}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={OPTIONS.indexOf(navigation)}
                    onChangeIndex={this.handleChangeIndex.bind(this)}
                    className={classes.container}
                >
                    <RecentView
                        list={pocket}
                        collapseIds={collapseIds}
                        actions={{
                            remove: this.props.removeFromPocket.bind(this),
                            edit: this.openEdit.bind(this)
                        }}
                    />
                    <ImagesView
                        images={images}
                        actions={{
                            remove: this.props.removeFromPocket.bind(this),
                            edit: this.openEdit.bind(this)
                        }}
                    />
                    <Typography component="div" dir={theme.direction} style={{padding: 8 * 3}}>
                        {"Three"}
                    </Typography>
                </SwipeableViews>
                <Dialog
                    fullScreen
                    TransitionComponent={Transition}
                    open={Boolean(this.state.editItem)}
                    onClose={this.closeEdit.bind(this)}
                >
                    <DialogTitle id="form-dialog-title">{"Edit item"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            defaultValue={this.state.editItem && this.state.editItem.name}
                            onChange={(event: Event) => {
                                this.setState({editItem: merge(this.state.editItem, {name: event.target.value})})
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeEdit.bind(this)} color="primary">
                            {"Cancel"}
                        </Button>
                        <Button onClick={this.saveItem.bind(this)} color="primary">
                            {"Save"}
                        </Button>
                    </DialogActions>
                </Dialog>
                <BottomNavigation value={navigation} onChange={this.handleChange.bind(this)} className={classes.root}>
                    <BottomNavigationAction label="Recent" value="recent" icon={<RestoreIcon/>}/>
                    <BottomNavigationAction disabled={images.length === 0} label="Images" value="images"
                                            icon={<Photo/>}/>
                    <BottomNavigationAction disabled label="Favorites" value="favorites" icon={
                        <FavoriteIcon/>}/>
                </BottomNavigation>
            </div>
        );
    }
}

function mapStateToProps(state: Object) {
    return {
        lastAction: state.lastAction,
        pocket: state.pocket,
        images: state.pocket.filter((item: Object) => item.mediaType === 'image')
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        removeFromPocket: function (id: string) {
            dispatch({type: "REMOVE_FROM_POCKET", id})
        },
        editInPocket: function (info: Object) {
            dispatch({type: "EDIT_IN_POCKET", info})
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MainApp));