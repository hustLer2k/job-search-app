import { useEffect, useState } from "react";
import { Container, rem } from "@mantine/core";
import { StarredStorage } from "@src/components/Job";
import Placeholder from "./placeholder";
import Job from "@src/components/Job";
import Pagination from "@src/components/ui/Pagination";

const ITEMS_PER_PAGE = 4;

export default function Starred() {
    const [starred, setStarred] = useState<StarredStorage>({});
    const [totalShortlisted, setShortlisted] = useState(0);
    const [activePage, setPage] = useState(1);

    useEffect(() => {
        if (localStorage.starred) {
            const starred = JSON.parse(localStorage.starred);

            setStarred(starred);
            setShortlisted(Object.keys(starred).length);
        }
    }, []);

    useEffect(() => {
        if (activePage != 1 && activePage > totalPages) {
            setPage(totalPages); // go back one page if there are no inputs on the current one
        }
    }, [totalShortlisted]);

    const keys = Object.keys(starred);
    const notEmpty = keys.length;

    const lowerBound = (activePage - 1) * ITEMS_PER_PAGE;
    const totalPages = Math.ceil(totalShortlisted / ITEMS_PER_PAGE);

    const starHandler = (id: string) => {
        setStarred((prevStarred) => {
            const newStarred = { ...prevStarred };
            delete newStarred[id];

            setShortlisted((prevShortlisted) => prevShortlisted - 1);

            return newStarred;
        });
    };

    return notEmpty ? (
        <Container size={rem(780)} p={0}>
            {keys.slice(lowerBound, lowerBound + ITEMS_PER_PAGE).map((id) => (
                <Job
                    {...starred[id]}
                    onStar={starHandler}
                    alternativeStyle={false}
                    key={id}
                />
            ))}

            <Pagination
                total={totalPages}
                onChange={setPage}
                value={activePage}
            />
        </Container>
    ) : (
        <Placeholder />
    );
}
