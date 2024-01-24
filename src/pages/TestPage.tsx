import React, { useState } from 'react'
import { Pagination, PaginationItem, PaginationLink, Row } from "reactstrap"
const TestPage = () => {
    const [data, setData] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]); // Örnek veri

    const handleDataChange = (currentPage: any) => {
        // Sayfa değiştikçe üst bileşende veriyi güncelle
        // Örneğin, API'den yeni veriyi çekerek veya başka bir yöntemle veriyi güncelleyebilirsiniz.
        const newData = [`Item ${currentPage * 5 - 4}`, `Item ${currentPage * 5 - 3}`, `Item ${currentPage * 5 - 2}`, `Item ${currentPage * 5 - 1}`, `Item ${currentPage * 5}`];
        setData(newData);
    };

    return (
        <div className='page-content'>
            {data.map((item) => (
                <div key={item}>{item}</div>
            ))}
            <MyPagination totalItems={data.length} itemsPerPage={1} onDataChange={handleDataChange} />
        </div>
    );
};


export default TestPage

const MyPagination = ({ totalItems, itemsPerPage, onDataChange }: any) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
        onDataChange(page); // Sayfa değiştiğinde üst bileşene veriyi güncelleme fonksiyonunu çağır
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <Pagination>
            {pageNumbers.map((number) => (
                <PaginationItem key={number} active={number === currentPage}>
                    <PaginationLink onClick={() => handlePageChange(number)}>{number}</PaginationLink>
                </PaginationItem>
            ))}
        </Pagination>
    );
};