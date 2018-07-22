// @flow
import * as React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import Delete from '@material-ui/icons/Delete';


import {withStyles} from '@material-ui/core/styles';
import {copyClipboard} from "../../../utils";
import styles from './styles'

type Props = {
    theme: Object,
    classes: Object,
    images: Array<Object>,
    actions: Array<Function>,
}

type State = {}

class ImagesView extends React.PureComponent<State, Props> {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const {images, classes, actions} = this.props;
        return (
            <GridList cellHeight={120} className={classes.list} cols={3}>
                {images.map((item, index) => (
                    <GridListTile
                        key={index}
                        cols={1}
                        onClick={copyClipboard.bind(null, item.srcUrl)}
                        className={classes.tile}
                    >
                        <img src={item.srcUrl} alt={item.name}/>
                        <ButtonBase variant={"raised"} focusRipple className={classes.ripple}/>
                        <GridListTileBar
                            className={classes.bar}
                            actionIcon={
                                <IconButton>
                                    <Delete
                                        className={classes.icon}
                                        onClick={function () {
                                            actions.remove(item.id)
                                        }}/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        )
    }
}

export default withStyles(styles, {withTheme: true})(ImagesView)