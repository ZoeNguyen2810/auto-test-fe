import React, { useState } from "react";
import useBookSearch from "./useBookSearch";
import { useRef, useCallback } from "react";

export const InfinityScroll = () => {
    const [query, setQuery] = useState("");
    const [pageNumber, setpageNumber] = useState(1);
    const handleOnChange = (e) => {
        setQuery(e);
        setpageNumber(1);
    };
    const observer = useRef()
    const { loading, hasMore, books, error } = useBookSearch(query, pageNumber);
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setpageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <>
            <div style={{ marginTop: 150, marginLeft: 300 }}>
                <input type="text" onChange={(e) => handleOnChange(e.target.value)} />
                {books.map((book, index) => {
                    if (books.length === index + 1) {
                        return <div key={book} ref={lastBookElementRef}>{book}</div>

                    }
                    return <div key={book}>{book}</div>
                })}
                <div>{loading && 'Loading...'}</div>
                <div>{error && 'Error'}</div>
            </div>
        </>
    );
};
