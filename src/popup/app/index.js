// @flow
import * as React from 'react';
import {connect} from 'react-redux'
import filter from 'lodash/filter';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SwipeableViews from 'react-swipeable-views';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Photo from '@material-ui/icons/Photo';
import ContentCopy from '@material-ui/icons/ContentCopy';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import {withStyles} from '@material-ui/core/styles';

import {styles} from './styles.js';
import {elipse, copyClipboard} from '../../utils'

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
                    <List>
                        {pocket.length === 0 && "EMPTY"}
                        {pocket.length > 0 && pocket.map(item => {
                            let value = item.srcUrl || item.linkUrl || item.pageUrl;
                            return (
                                <Collapse
                                    key={item.id}
                                    in={collapseIds.indexOf(item.id) === -1}
                                >
                                    <ListItem
                                        dense
                                        button
                                        className={classes.listItem}
                                        onClick={copyClipboard.bind(null, value)}
                                    >
                                        {item.mediaType === 'image'
                                            ? <Avatar
                                                src={item.srcUrl}
                                                className={classes.listThumbnail}/>
                                            : <Avatar
                                                className={classes.listThumbnail}>
                                                <InsertDriveFile/>
                                            </Avatar>}
                                        <ListItemText
                                            classes={{primary: classes.listTitle}}
                                            primary={elipse(value, 17, 23)}/>
                                        <div className={classes.listActions}>
                                            <IconButton
                                                className={classes.listActionsIcon}
                                                onClick={copyClipboard.bind(null, value)}
                                            >
                                                <ContentCopy/>
                                            </IconButton>
                                            <IconButton className={classes.listActionsIcon}>
                                                <Edit/>
                                            </IconButton>
                                            <IconButton
                                                className={classes.listActionsIcon}
                                                onClick={removeFromPocket.bind(this, item.id)}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </div>
                                    </ListItem>
                                </Collapse>
                            )
                        })}
                    </List>
                    < Typography component="div" dir={theme.direction} style={{padding: 8 * 3}}>
                        {"Trwo"}
                    </Typography>
                    <Typography component="div" dir={theme.direction} style={{padding: 8 * 3}}>
                        {"Three"}
                    </Typography>
                </SwipeableViews>

                <BottomNavigation value={navigation} onChange={this.handleChange.bind(this)} className={classes.root}>
                    <BottomNavigationAction label="Recent" value="recent" icon={<RestoreIcon/>}/>
                    <BottomNavigationAction label="Images" value="images" icon={<Photo/>}/>
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MainApp));