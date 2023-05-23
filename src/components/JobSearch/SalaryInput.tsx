import { NumberInput, rem } from "@mantine/core";
import InputRightSection from "./InputRightSection";

const MIN = 0,
    MAX = 1e6,
    STEP = 1000;

export default function SalaryInput({
    placeholder,
    label,
    setPayment,
    value,
    dataElem,
}: {
    placeholder: string;
    label?: string;
    setPayment: React.Dispatch<React.SetStateAction<number | "">>;
    value: number | "";
    dataElem: string;
}) {
    const increment = () =>
        setPayment((prevValue) => (+prevValue + STEP) % MAX);
    const decrement = () =>
        setPayment((prevValue) => Math.max(+prevValue - STEP, MIN));

    return (
        <NumberInput
            hideControls
            value={value}
            placeholder={placeholder}
            width={rem(275)}
            min={MIN}
            max={MAX}
            onChange={(val) => setPayment(val)}
            step={STEP}
            label={label}
            rightSection={
                <InputRightSection
                    increment={increment}
                    decrement={decrement}
                />
            }
            rightSectionWidth={36}
            data-elem={dataElem}
            styles={(theme) => ({
                wrapper: {
                    height: rem(42),
                    userSelect: "none",
                },
                input: {
                    height: rem(42),
                    borderColor: theme.colors.gray[2],
                    "&:hover, &:focus": {
                        border: "1px solid",
                        borderColor: theme.colors.blue[4],
                    },
                },
                label: {
                    fontSize: "1rem",
                    fontWeight: 700,
                    marginBottom: 8,
                },
            })}
        />
    );
}
