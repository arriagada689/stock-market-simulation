'use client'

import { useEffect, useState, useActionState } from "react";
import { search } from "@/app/actions/finnhubActions";
import Link from "next/link";

const initialState = ''

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const [state, formAction] = useActionState(search, initialState);

    const handleLinkClick = () => {
        startTransition(() => {
            setQuery('');
            formAction(new FormData()); // Reset the search results
        });
    };

    return ( 
        <div className="relative">
            <form action={formAction}>
                <input 
                    type="text" 
                    onChange={(e) => setQuery(e.target.value)} 
                    className="border"
                    name="query"
                />
            </form>

            {state.results && state.results.length > 0 &&
                <div className="absolute top-full flex flex-col">
                    {state.results.map((result, index) => (
                        <Link onClick={handleLinkClick} href={`/stocks/${result.symbol}`} key={index}>{result.symbol}</Link>
                    ))}
                </div>
            }
        </div>
     );
}
 
export default SearchBar;