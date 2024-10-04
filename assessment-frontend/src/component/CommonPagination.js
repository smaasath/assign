import React from 'react';

const CommonPagination = ({ pages, currentPage, setCurrentPage }) => {
    const renderPageNumbers = () => {
        let items = [];
        let startPage, endPage;

        if (pages <= 5) {
            startPage = 1;
            endPage = pages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= pages) {
                startPage = pages - 4;
                endPage = pages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <button style={{ paddingLeft: 10, paddingRight: 10 }} className={`rounded-3 pt-2 pb-2 ${number === currentPage ? "bag-primary text-white border-0" : "bg-transparent border-1"}`} key={number} onClick={() => setCurrentPage(number)}>
                    {number}
                </button>
            );
        }

        return items;
    };

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center flex-wrap gap-2'>
                <button
                    className='bg-primary text-white border-0 rounded-3 p-2'
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >Pre</button>
                {currentPage > 3 && pages > 5 && (
                    <button style={{ paddingLeft: 10, paddingRight: 10 }} className={`rounded-3 pt-2 pb-2 ${currentPage === 1 ? "bg-primary text-white border-0" : "bg-transparent border-1"}`} onClick={() => setCurrentPage(1)}>1</button>
                )}
                {currentPage > 3 && pages > 5 && <button className='bg-transparent border-1 rounded-3 p-2'>...</button>}

                {renderPageNumbers()}

                {currentPage + 2 < pages && pages > 5 && <button className='bg-transparent border-1 rounded-3 p-2'>...</button>}
                {currentPage + 2 < pages && pages > 5 && (
                    <button style={{ paddingLeft: 10, paddingRight: 10 }} className={`rounded-3 pt-2 pb-2 ${currentPage === pages ? "bg-primary text-white border-0" : "bg-transparent border-1"}`} onClick={() => setCurrentPage(pages)}>{pages}</button>
                )}
                <button
                    className='bg-primary text-white border-0 rounded-3 p-2'
                    onClick={() => currentPage < pages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pages}
                >Next</button>
            </div>
        </div>
    );
};

export default CommonPagination;
