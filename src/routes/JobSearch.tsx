import { createStyles, Loader, Center } from "@mantine/core";
import Filters from "../components/JobSearch/Filters";
import SearchBar from "../components/JobSearch/SearchBar";
import { useState, useRef, useEffect } from "react";
import Placeholder from "./placeholder";
import Job from "@src/components/Job";
import Pagination from "@src/components/ui/Pagination";

const JOBS_PER_PAGE = 4;

export interface JobType {
    id: string;
    profession: string;
    town: {
        title: string;
    };
    type_of_work: {
        title: string;
    };
    payment_from: number;
    payment_to: number;
    currency: string;
}

interface Response {
    objects: JobType[];
    total: number;
}

const useStyles = createStyles((theme) => ({
    group: {
        display: "flex",
        padding: "0 5%",

        justifyContent: "space-between",
        gap: "2rem",
        alignItems: "flex-start",

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "stretch",
            padding: 0,
        },
    },

    jobsDiv: {
        flexGrow: 1,
    },
}));

export default function JobSearch() {
    const { classes } = useStyles();
    const searchRef = useRef<HTMLInputElement>(null);

    const [paymentFrom, setPaymentFrom] = useState<number | "">("");
    const [paymentTo, setPaymentTo] = useState<number | "">("");
    const [catalogue, setCatalogue] = useState<string>("");

    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<JobType[]>([]);

    const [totalPages, setTotalPages] = useState(1);
    const [activePage, setPage] = useState(1);
    const pageIndex = activePage - 1;

    const reset = () => {
        setPaymentFrom("");
        setPaymentTo("");
        setCatalogue("");
    };

    function fetchJobs() {
        const params = new URLSearchParams({
            count: JOBS_PER_PAGE.toString(),
            page: pageIndex.toString(),
            published: "1",
            keyword: searchRef.current?.value || "",
            payment_from: paymentFrom.toString(),
            payment_to: paymentTo.toString(),
            catalogues: catalogue,
        });

        setLoading(true);
        fetch(
            "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?" +
                params.toString(),
            {
                headers: {
                    "x-secret-key": import.meta.env.VITE_SECRET_KEY,
                    "X-Api-App-Id": import.meta.env.VITE_APP_ID,
                },
            }
        )
            .then((response) => response.json())
            .then((content: Response) => {
                setTotalPages(content.total / JOBS_PER_PAGE);
                setJobs(content.objects);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => fetchJobs(), [activePage]);

    const clickHandler = () => fetchJobs();
    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            fetchJobs();
        }
    };

    let mainContent: JSX.Element | JSX.Element[];

    if (loading) {
        mainContent = (
            <Center mt="4rem">
                <Loader size="xl" />
            </Center>
        );
    } else if (jobs.length === 0) {
        mainContent = <Placeholder showLink={false} mt="4rem" />;
    } else {
        mainContent = jobs.map((job) => <Job {...job} key={job.id} />);
    }

    return (
        <div className={classes.group} onKeyDown={keyDownHandler}>
            <Filters
                setPaymentFrom={setPaymentFrom}
                setPaymentTo={setPaymentTo}
                setCatalogue={setCatalogue}
                paymentFrom={paymentFrom}
                paymentTo={paymentTo}
                catalogue={catalogue}
                reset={reset}
                onApply={clickHandler}
                loading={loading}
            />
            <div className={classes.jobsDiv}>
                <SearchBar
                    ref={searchRef}
                    onSearch={clickHandler}
                    loading={loading}
                />

                {mainContent}

                {!loading && (
                    <Pagination
                        total={Math.min(
                            totalPages,
                            Math.ceil(500 / JOBS_PER_PAGE)
                        )}
                        value={activePage}
                        onChange={setPage}
                    />
                )}
            </div>
        </div>
    );
}
