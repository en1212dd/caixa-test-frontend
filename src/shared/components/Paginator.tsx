import type { ApiResponse } from "@models/ApiResponse";
import "./Paginator.css";

interface PaginationProps<T> {
    pageInfo: ApiResponse<T>;
    currentPage: number;
    onPageChange?: (page: number) => void;
}

export default function Pagination<T>({ pageInfo, currentPage, onPageChange = () => { } }: PaginationProps<T>) {
    const totalPages = pageInfo.info.pages;

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        let prev = 0;
        for (const page of range) {
            if (page - prev > 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(page);
            prev = page;
        }

        return rangeWithDots;
    };

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                <span className="pagination-count">
                    All: <strong>{pageInfo.info.count}</strong> characters
                </span>
                <span className="pagination-pages">
                    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn pagination-prev"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || !pageInfo.info.prev}
                    aria-label="Página anterior"
                >
                    <i className="fas fa-chevron-left"></i>
                    <span>Last</span>
                </button>

                <div className="pagination-numbers">
                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={`dots-${index}`} className="pagination-dots">...</span>
                        ) : (
                            <button
                                key={page}
                                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                onClick={() => onPageChange(page as number)}
                                aria-label={`go to page ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        )
                    ))}
                </div>

                <button
                    className="pagination-btn pagination-next"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || !pageInfo.info.next}
                    aria-label="Página siguiente"
                >
                    <span>Next</span>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            <div className="pagination-jump">
                <span>Go to page:</span>
                <input
                    type="number"
                    min="1"
                    max={totalPages}
                    defaultValue={currentPage}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const page = parseInt((e.target as HTMLInputElement).value);
                            if (page >= 1 && page <= totalPages) {
                                onPageChange(page);
                            }
                        }
                    }}
                    className="pagination-input"
                    aria-label="Número de página"
                />
            </div>
        </div>
    );
}