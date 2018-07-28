// @flow
import * as React from 'react';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import ContentCopy from '@material-ui/icons/ContentCopy';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';

import {withStyles} from '@material-ui/core/styles';
import {copyClipboard, elipse} from "../../../utils";
import styles from './styles'

type Props = {
    theme: Object,
    classes: Object,
    list: Array<Object>,
    actions: Array<Function>,
    empty: Boolean,
}

type State = {
    collapseIds: Array<?string>
}

class RecentView extends React.PureComponent<State, Props> {
    constructor(props) {
        super(props);

        this.state = {
            collapseIds: []
        }
    }

    deleteItem(item: Object) {
        this.setState({collapseIds: [...this.state.collapseIds, item.id]});
        setTimeout(() => {
            this.props.actions.remove(item.id)
        }, 500)
    }

    render() {
        const {list, classes, actions, empty} = this.props;
        return (
            empty ? (
                <List className={classes.instruction}>
                    <li className={classes.instructionStep}>
                        <Typography>
                            {"1) Find something interesting on any web page."}
                        </Typography>
                    </li>
                    <li className={classes.instructionStep}>
                        <Typography>
                            {"2) Right-click on it and choose 'Add in your pocket' option."}
                        </Typography>
                    </li>
                    <li className={classes.instructionStep}>
                        <Typography>
                            {"3) All your staff will be displayed here."}
                        </Typography>
                    </li>
                </List>
            ) : (
                <React.Fragment>
                    <List>
                        {list.map(item => {
                            return (
                                <Collapse
                                    key={item.id}
                                    in={this.state.collapseIds.indexOf(item.id) === -1}
                                >
                                    <ListItem
                                        dense
                                        button
                                        className={classes.item}
                                        onClick={copyClipboard.bind(null, item.srcUrl || item.linkUrl || item.pageUrl)}
                                    >
                                        {item.mediaType === 'image'
                                            ? <Avatar
                                                src={item.srcUrl}
                                                className={classes.thumbnail}/>
                                            : <Avatar
                                                className={classes.thumbnail}>
                                                <InsertDriveFile/>
                                            </Avatar>}
                                        <ListItemText
                                            classes={{root: classes.title, primary: classes.wrapBreak}}
                                            primary={elipse(item.name || item.srcUrl, 17, 23)}/>
                                        <div className={classes.actions}>
                                            <IconButton
                                                className={classes.actionsIcon}
                                                onClick={copyClipboard.bind(null, item.srcUrl || item.linkUrl || item.pageUrl)}
                                            >
                                                <ContentCopy/>
                                            </IconButton>
                                            <IconButton
                                                className={classes.actionsIcon}
                                                onClick={function () {
                                                    actions.edit(item)
                                                }}
                                            >
                                                <Edit/>
                                            </IconButton>
                                            <IconButton
                                                className={classes.actionsIcon}
                                                onClick={this.deleteItem.bind(this, item)}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </div>
                                    </ListItem>
                                </Collapse>
                            )
                        })}
                    </List>
                </React.Fragment>
            )
        )
    }
}

export default withStyles(styles, {withTheme: true})(RecentView)