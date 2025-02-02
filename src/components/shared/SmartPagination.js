// export default function SmartPagination ({ currentPage, totalPages, onPageChange, dir })  {
//     const getPageNumbers = () => {
//         const delta = 2; // Number of pages to show before and after current page
//         const range = [];
//         const rangeWithDots = [];

//         // Always show first page
//         range.push(1);

//         // Calculate range around current page
//         for (let i = currentPage - delta; i <= currentPage + delta; i++) {
//             if (i > 1 && i < totalPages) {
//                 range.push(i);
//             }
//         }

//         // Always show last page
//         if (totalPages > 1) {
//             range.push(totalPages);
//         }

//         // Add pages to final array with dots where needed
//         let prev = 0;
//         for (const i of range) {
//             if (prev) {
//                 if (i - prev === 2) {
//                     rangeWithDots.push(prev + 1);
//                 } else if (i - prev !== 1) {
//                     rangeWithDots.push('...');
//                 }
//             }
//             rangeWithDots.push(i);
//             prev = i;
//         }

//         return rangeWithDots;
//     };

//     const handlePrevClick = () => {
//         if (currentPage > 1) {
//             onPageChange(currentPage - 1);
//         }
//     };

//     const handleNextClick = () => {
//         if (currentPage < totalPages) {
//             onPageChange(currentPage + 1);
//         }
//     };

//     // Don't render pagination if there's only one page
//     if (totalPages <= 1) return null;

//     return (
//         <div className={`pagination-container ${dir}`}>
//             {/* Previous button */}
//             <button
//                 onClick={handlePrevClick}
//                 disabled={currentPage === 1}
//                 className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
//                 aria-label="Previous page"
//             >
//                 {dir === 'rtl' ? '›' : '‹'}
//             </button>

//             {/* Page numbers */}
//             <div className="pagination-numbers">
//                 {getPageNumbers().map((page, index) => (
//                     <button
//                         key={index}
//                         onClick={() => typeof page === 'number' ? onPageChange(page) : null}
//                         className={`pagination-item ${page === currentPage ? 'active' : ''
//                             } ${page === '...' ? 'dots' : ''}`}
//                         disabled={page === '...'}
//                     >
//                         {page}
//                     </button>
//                 ))}
//             </div>

//             {/* Next button */}
//             <button
//                 onClick={handleNextClick}
//                 disabled={currentPage === totalPages}
//                 className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
//                 aria-label="Next page"
//             >
//                 {dir === 'rtl' ? '‹' : '›'}
//             </button>
//         </div>
//     );
// };
