import React, { useState } from 'react';

const CustomPagination = ({ totalItems, limit, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / limit);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li
                    key={i}
                    className={i === currentPage ? 'active' : ''}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </li>
            );
        }
        return pages;
    };

    return (
        <ul className="pagination">
            {renderPagination()}
        </ul>
    );
};

export default CustomPagination;
// need to customize more for pages greater than 10