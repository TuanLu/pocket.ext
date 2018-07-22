// @flow
import * as React from 'react';
import merge from 'lodash/merge';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    collapseIds: Array<string>
}

type State = {
    editItem: ?Object
}

function Transition(props: Object) {
    return <Slide direction="up" {...props} />;
}


class RecentView extends React.PureComponent<State, Props> {
    constructor(props) {
        super(props);

        this.state = {
            editItem: null,
        }
    }

    openEdit(item: Object) {
        this.setState({editItem: item});
    };

    closeEdit() {
        this.setState({editItem: null});
    };

    saveItem() {
        this.props.actions.edit(this.state.editItem);
        this.closeEdit();
    }

    render() {
        const {list, collapseIds, classes, actions} = this.props;
        return (
            list.length <= 0 ? (
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
                <List>
                    {list.map(item => {
                        return (
                            <Collapse
                                key={item.id}
                                in={collapseIds.indexOf(item.id) === -1}
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
                                            onClick={this.openEdit.bind(this, item)}
                                        >
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
                </List>
            )
        )
    }
}

export default withStyles(styles, {withTheme: true})(RecentView)