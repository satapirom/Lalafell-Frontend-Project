import React from 'react'

const SortBy = ({ sortOption, setSortOption }) => {
    return (
        <div>
            <label className="mr-2">Sort by:</label>
            <select
                className="border rounded-md py-1 px-4"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="price">Price</option>
                <option value="popularity">Popularity</option>
                <option value="newest">Newest</option>
            </select>
        </div>
    )
}

export default SortBy