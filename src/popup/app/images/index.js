// @flow
import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import ContentCopy from '@material-ui/icons/ContentCopy';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';

import {withStyles} from '@material-ui/core/styles';
import {copyClipboard, elipse} from "../../../utils";
import styles from './styles'

function RecentView({list, collapseIds, classes, actions, ...props}) {
    return (
        <List>
            {list.length === 0 && "EMPTY"}
            {list.length > 0 && list.map(item => {
                return (
                    <Collapse
                        key={item.id}
                        in={collapseIds.indexOf(item.id) === -1}
                    >
                        <ListItem
                            dense
                            button
                            className={classes.item}
                            onClick={copyClipboard.bind(null, item.name || item.srcUrl)}
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
                                classes={{primary: classes.title}}
                                primary={elipse(item.name || item.srcUrl, 17, 23)}/>
                            <div className={classes.actions}>
                                <IconButton
                                    className={classes.actionsIcon}
                                    onClick={copyClipboard.bind(null, item.name || item.srcUrl)}
                                >
                                    <ContentCopy/>
                                </IconButton>
                                <IconButton className={classes.actionsIcon}>
                                    <Edit/>
                                </IconButton>
                                <IconButton
                                    className={classes.actionsIcon}
                                    onClick={function () {
                                        actions.remove(item.id)
                                    }}
                                >
                                    <Delete/>
                                </IconButton>
                            </div>
                        </ListItem>
                    </Collapse>
                )
            })}
        </List>
    )
}

export default withStyles(styles, {withTheme: true})(RecentView)