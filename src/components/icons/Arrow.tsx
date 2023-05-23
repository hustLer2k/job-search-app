import { createStyles } from "@mantine/core";

interface ArrowProps {
    scale?: number;
    strokeWidth?: number;
    angle?: number;
    pressed?: boolean;
    onClick?: () => void;
}

const useStyles = createStyles(
    (
        theme,
        { scale = 1, strokeWidth = 1.5, angle = 0, pressed = false }: ArrowProps
    ) => ({
        svg: {
            scale: scale.toString(),
            rotate: `${angle}deg`,
            stroke: pressed ? theme.fn.primaryColor() : theme.colors.gray[4],

            "&:hover": {
                stroke: theme.colors.blue[3],
            },
        },

        path: {
            strokeWidth: strokeWidth.toString(),
        },
    })
);

export default function Arrow(props: ArrowProps) {
    const { classes } = useStyles(props);

    return (
        <svg
            className={classes.svg}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick}
        >
            <path
                d="M8.50003 4.5L5.39051 1.83469C5.16581 1.6421 4.83425 1.6421 4.60956 1.83469L1.50003 4.5"
                strokeLinecap="round"
                className={classes.path}
            />
        </svg>
    );
}
