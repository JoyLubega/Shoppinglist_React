import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

const Pagination = (props) => {
    const {
        count,
        limit,
        onPagination
    } = props;

    // Formulating numbers for pages of shopping lists
    let pages = [];
    let numOfPages = Math.floor(count/limit);
    if((count % limit) > 0 ){
        numOfPages +=1
    }
    for(let page=1; page<=numOfPages; page++){
        pages.push(
            <li
                key={page}
                >
                <button className="black" to="#" onClick={(event) =>{ onPagination(event,limit, page); } }> {page}</button>
            </li>
        );
    }

    // Displaying pages
    return(
        <div className="pagination">

          Pages:  {pages}
        </div>
    );
}

export default Pagination;
