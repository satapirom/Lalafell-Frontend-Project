// src/components/user/Products/renderDescription.jsx

export const renderDescription = (description) => {
    if (!description) return null;

    const points = description.split('\n').filter(point => point.trim());
    const displayPoints = points.length > 1 ? points.slice(0, 2) : points; // Show 2 points by default

    return (
        <div className="w-full">
            <ul className="list-none space-y-2">
                {displayPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-primary-color mr-2 flex-shrink-0 pt-1">•</span>
                        <span className="text-gray-600 text-sm flex-1 whitespace-normal" style={{
                            wordBreak: 'normal',
                            overflowWrap: 'anywhere'
                        }}>
                            {point.trim().replace(/^[•\s-]+/, '')}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default renderDescription;