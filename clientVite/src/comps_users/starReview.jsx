import React, { useState } from 'react';

function StarRating() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating === rating ? 0 : selectedRating);
  };

  return (
    <ul className="flex gap-1 p-0">
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <li key={index} onClick={() => handleStarClick(starNumber)}>
            <span
              className={`text-primary h-5 w-5 cursor-pointer ${
                starNumber <= rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default StarRating;
// import React, { useState } from 'react';
// import {
//     Rating,
//     initTE,
//   } from "tw-elements";
  

// function StarReview() {
//       initTE({ Rating });
      
//       const icon = document.querySelectorAll('#events-example [data-te-rating-icon-ref]');
      
//       icon.forEach((el) => {
//         el.addEventListener('onHover.te.rating', (e) => {
//           console.log('onHover', e);
//         });
//         el.addEventListener('onSelect.te.rating', (e) => {
//           console.log('onSelect', e);
//         });
//       })
      
//     return (
//         <ul
//             id="events-example"
//             className="my-1 flex list-none gap-1 p-0"
//             data-te-rating-init>
//             <li>
//                 <span
//                     className="text-primary [&>svg]:h-5 [&>svg]:w-5"
//                     data-te-rating-icon-ref>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke-width="1.5"
//                         stroke="currentColor">
//                         <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//                     </svg>
//                 </span>
//             </li>
//             <li>
//                 <span
//                     className="text-primary [&>svg]:h-5 [&>svg]:w-5"
//                     data-te-rating-icon-ref>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke-width="1.5"
//                         stroke="currentColor">
//                         <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//                     </svg>
//                 </span>
//             </li>
//             <li>
//                 <span
//                     className="text-primary [&>svg]:h-5 [&>svg]:w-5"
//                     data-te-rating-icon-ref>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke-width="1.5"
//                         stroke="currentColor">
//                         <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//                     </svg>
//                 </span>
//             </li>
//             <li>
//                 <span
//                     className="text-primary [&>svg]:h-5 [&>svg]:w-5"
//                     data-te-rating-icon-ref>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke-width="1.5"
//                         stroke="currentColor">
//                         <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//                     </svg>
//                 </span>
//             </li>
//             <li>
//                 <span
//                     className="text-primary [&>svg]:h-5 [&>svg]:w-5"
//                     data-te-rating-icon-ref>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke-width="1.5"
//                         stroke="currentColor">
//                         <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
//                     </svg>
//                 </span>
//             </li>
//         </ul>

//     );
// }

// export default StarReview;
