import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  pageWindowSize?: number;
  onPageChange: (page: number) => void;
  initialPage?: number;
}

export const PaginationComponent : React.FC<PaginationProps> = ({
  totalPages,
  pageWindowSize = 3,
  onPageChange,
  initialPage = 1,
}) => {
    const pages = []; 
    const [page, setPage] = useState(initialPage);
    const [windowStart, setWindowStart] = useState(1);

    for (let i = windowStart; i < Math.min(windowStart + pageWindowSize, totalPages + 1); i++) {
        pages.push(i);
    }

    const handlePageClick = (p: number) => {
        setPage(p);
        onPageChange(p);

    if (p >= windowStart + pageWindowSize) {
      setWindowStart(p);
    } else if (p < windowStart) {
      setWindowStart(Math.max(p - pageWindowSize + 1, 1));
    }
  };

    return <div className="btn-group justify-center my-4">
      <button className="btn" disabled={page === 1} onClick={() => handlePageClick(page - 1)}>«</button>

      {pages.map((p) => (
        <button
          key={p}
          className={`btn ${page === p ? 'btn-active' : ''}`}
          onClick={() => handlePageClick(p)}
        >
          {p}
        </button>
      ))}

      <button className="btn" disabled={page === totalPages} onClick={() => handlePageClick(page + 1)}>»</button>
    </div>
}