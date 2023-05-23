import { Global } from "@mantine/core";
import poppinsSB from "../assets/Poppins-SemiBold.ttf";
import inter from "../assets/Inter-VariableFont_slnt,wght.ttf";

export default function CustomFonts() {
    return (
        <Global
            styles={[
                {
                    "@font-face": {
                        fontFamily: "Poppins",
                        src: `url('${poppinsSB}') format("truetype")`,
                        fontWeight: 600,
                        fontStyle: "normal",
                    },
                },
                {
                    "@font-face": {
                        fontFamily: "Inter",
                        src: `url('${inter}') format("truetype")`,
                        fontWeight: [400, 500, 600],
                        fontStyle: "normal",
                    },
                },
            ]}
        />
    );
}
