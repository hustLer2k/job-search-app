import { Select } from "@mantine/core";
import { useState } from "react";
import Arrow from "../icons/Arrow";

export default function IndustrySelect({
    setCatalogue,
    value,
}: {
    setCatalogue: (filters: string) => void;
    value: string | null;
}) {
    const [dropdownOpened, setDropdownOpened] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpened((prevState) => !prevState);
    };

    const rightSection = (
        <Arrow
            scale={1.8}
            strokeWidth={0.7}
            angle={dropdownOpened ? 0 : 180}
            pressed={dropdownOpened}
        />
    );

    return (
        <Select
            value={value}
            onChange={setCatalogue}
            data={[
                { value: "33", label: "IT, интернет, связь, телеком" },
                { value: "76", label: "Кадры, управление персоналом" },
                { value: "490", label: "Искусство, культура, развлечения" },
                { value: "499", label: "Банки, инвестиции, лизинг" },
                { value: "482", label: "Дизайн" },
            ]}
            label="Отрасль"
            rightSection={rightSection}
            rightSectionWidth={36}
            onDropdownOpen={toggleDropdown}
            onDropdownClose={toggleDropdown}
            dropdownComponent="div"
            data-elem="industry-select"
            styles={(theme) => ({
                label: {
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: 8,
                },

                input: {
                    borderColor: theme.colors.gray[2],
                },
            })}
        />
    );
}
