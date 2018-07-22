// @flow
import * as React from 'react';
import {connect} from 'react-redux'

import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SwipeableViews from 'react-swipeable-views';
import RecentView from './recent'

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Photo from '@material-ui/icons/Photo';

import {withStyles} from '@material-ui/core/styles';

import {styles} from './styles.js';


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
    listIds: Array<?string>,
}

const OPTIONS = ['recent', 'images', 'favorites'];

class MainApp extends React.PureComponent<Props, State> {
    constructor(props: Object) {
        super(props);

        this.state = {
            navigation: "recent",
            collapseIds: []
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

    render() {
        const {classes, theme, pocket, images, removeFromPocket} = this.props;
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
                            edit: this.props.editInPocket.bind(this)
                        }}
                    />
                    < Typography component="div" dir={theme.direction} style={{padding: 8 * 3}}>
                        {"Two"}
                    </Typography>
                    <Typography component="div" dir={theme.direction} style={{padding: 8 * 3}}>
                        {"Three"}
                    </Typography>
                </SwipeableViews>

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
            this.setState({collapseIds: [...this.state.collapseIds, id]});
            setTimeout(() => {
                dispatch({type: "REMOVE_FROM_POCKET", id})
            }, 500)
        },
        editInPocket: function (info: Object) {
            dispatch({type: "EDIT_IN_POCKET", info})
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MainApp));