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
});

export default styles;