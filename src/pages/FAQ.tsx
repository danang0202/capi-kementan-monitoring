import React, { useState } from 'react';
import { faq as faqData } from '../data/faq';

const FAQ: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Menghitung data untuk halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = faqData.slice(startIndex, startIndex + itemsPerPage);

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(faqData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">Frequently Asked Questions</h1>
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
        </ul>
      </div>

      <div className="join join-vertical w-full">
        {currentItems.map((item, index) => (
          <div key={index} className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-medium">{item.question}</div>
            <div className="collapse-content">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="btn-group">
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} className={`btn btn-sm btn-secondary ${currentPage === index + 1 ? 'btn-active' : ''}`} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
