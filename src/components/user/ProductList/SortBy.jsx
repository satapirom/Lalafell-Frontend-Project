import CustomSelect from '../../ui/CustomSelect.jsx';

const SortBy = ({ sortOption, setSortOption }) => {
    return (
        <div className="flex items-center  bg-white/50 hover:bg-primary-color/10 px-4 py-1 rounded-full">
            <label className="mr-2 hover:text-primary-color">Sort by:</label>
            <CustomSelect
                options={[
                    { label: "Price", value: "price" },
                    { label: "Popularity", value: "popularity" },
                    { label: "Newest", value: "newest" },
                ]}
                value={sortOption}
                onChange={setSortOption}
            />
        </div>
    )
}

export default SortBy;