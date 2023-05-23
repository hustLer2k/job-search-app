import { Stack } from "@mantine/core";
import Arrow from "../icons/Arrow";

export default function InputRightSection({
    decrement,
    increment,
}: {
    decrement: (() => void) | undefined;
    increment: (() => void) | undefined;
}) {
    return (
        <Stack spacing="xs">
            <Arrow onClick={increment} />
            <Arrow onClick={decrement} angle={180} />
        </Stack>
    );
}
