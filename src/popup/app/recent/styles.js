// @flow
export const styles: Function = (theme: Object) => ({
    title: {
        overflowWrap: "break-word",
        transition: "all 0.2s ease",
        maxWidth: 259,
        height: 58,
        display: "inline-flex",
        alignItems: "center"
    },
    wrapBreak: {
        maxWidth: "100%",
        overflowWrap: "break-word",
    },
    item: {
        "&:hover $actions": {
            right: "0",
        },
        "&:hover $title": {
            maxWidth: 150
        }
    },
    actions: {
        display: "flex",
        position: "absolute",
        padding: "3% 5px 3% 0",
        top: "0",
        right: "-100%",
        transition: "all 0.4s ease",
        "&:hover": {
            right: "0",
        },
        "&:hover+$item $title": {
            maxWidth: 150
        }
    },
    actionsIcon: {},
    thumbnail: {
        width: 50,
        height: 50
    },
    instruction: {
        position: "fixed",
        top: 223,
        width: "100%",
        textAlign: "center",
    },
    instructionStep: {},

});

export default styles;