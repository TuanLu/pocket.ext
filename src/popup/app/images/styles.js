// @flow
export const styles: Function = (theme: Object) => ({
    list: {
        padding: 10,
    },
    tile: {
        cursor: "pointer"
    },
    ripple: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        "&:hover+$bar": {
            bottom: 0
        }
    },
    bar: {
        bottom: "-40%",
        opacity: "0.5",
        transition: "all 0.2s ease",
        "&:hover": {
            opacity: "1",
            bottom: 0,
        }
    },
    icon: {
        color: "#d6d6d6"
    }
});

export default styles;