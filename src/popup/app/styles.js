// @flow
export const styles: Function = (theme: Object) => ({
    root: {
        minWidth: 300
    },
    container: {
        maxHeight: 500,
        width: 390,
        height: 485,
        "&>div>[aria-hidden]": {
            overflow: "hidden !important",
        }
    },
    search: {
        width: "90%",
         margin: "0 5%"
    }
});

export default styles;