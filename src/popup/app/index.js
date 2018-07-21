// @flow
import * as React from 'react';
import {connect} from 'react-redux'

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SwipeableViews from 'react-swipeable-views';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Photo from '@material-ui/icons/Photo';
import ContentCopy from '@material-ui/icons/ContentCopy';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import {withStyles} from '@material-ui/core/styles';

import {styles} from './styles.js';
import {elipse} from '../../utils'

type Props = {
    theme: Object,
    classes: Object,
    lastAction: Object,
    pocket: Array<Object>,
    images: Array<Object>,
}

type State = {
    navigation: string
}

const OPTIONS = ['recent', 'images', 'favorites'];

class MainApp extends React.PureComponent<Props, State> {
    constructor(props: Object) {
        super(props);

        this.state = {
            navigation: "recent"
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
        const {classes, theme, pocket, images} = this.props;
        const {navigation} = this.state;

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
                        {pocket.length > 0 && pocket.map(item => (
                            <ListItem key={item.id} dense button className={classes.listItem}>
                                {item.mediaType === 'image'
                                    ? <Avatar src={item.srcUrl} className={classes.listThumbnail}/>
                                    : <Avatar className={classes.listThumbnail}><InsertDriveFile/></Avatar>}
                                <ListItemText classes={{primary: classes.listTitle}}
                                              primary={elipse(item.srcUrl || item.linkUrl || item.pageUrl, 17, 23)}/>
                                <div className={classes.listActions}>
                                    <IconButton className={classes.listActionsIcon}>
                                        <ContentCopy/>
                                    </IconButton>
                                    <IconButton className={classes.listActionsIcon}>
                                        <Edit/>
                                    </IconButton>
                                    <IconButton className={classes.listActionsIcon}>
                                        <Delete/>
                                    </IconButton>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                    <Typography component="div" dir={theme.direction} style={{padding: 8 * 3}}>
                        {"Trwo"}
                    </Typography>
                    <Typography component="div" dir={theme.direction} style={{padding: 8 * 3}}>
                        {"Three"}
                    </Typography>
                </SwipeableViews>

                <BottomNavigation value={navigation} onChange={this.handleChange.bind(this)} className={classes.root}>
                    <BottomNavigationAction label="Recent" value="recent" icon={<RestoreIcon/>}/>
                    <BottomNavigationAction label="Images" value="images" icon={<Photo/>}/>
                    <BottomNavigationAction disabled label="Favorites" value="favorites" icon={<FavoriteIcon/>}/>
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
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MainApp));