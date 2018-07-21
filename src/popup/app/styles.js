// @flow
export const styles: Function = (theme: Object) => ({
    root: {
        minWidth: 300
    },
    container: {
        maxHeight: 500,
        width: 390,
        height: 500,
        "&>div>[aria-hidden]": {
            overflow: "hidden !important",
        }
    },
    listTitle: {
        overflowWrap: "break-word",
        transition: "all 0.2s ease",
        maxWidth: 259
    },
    listItem: {
        "&:hover $listActions": {
            right: "0",
        },
        "&:hover $listTitle": {
            maxWidth: 150
        }
    },
    listActions: {
        display: "flex",
        position: "absolute",
        padding: "2.5% 0",
        top: "0",
        right: "-100%",
        transition: "all 0.4s ease",
        "&:hover": {
            right: "0",
        },
        "&:hover+$listItem $listTitle": {
            maxWidth: 150
        }
    },
    listActionsIcon: {},
    listThumbnail: {
        width: 50,
        height: 50
    },
});

export default styles;