import React from 'react';
import {Pagination} from 'react-bootstrap';


export function PageComponent({current, total}){
    let items = [];
    for (let number = 1; number <= total; number+=20) {
        items.push(
            <Pagination.Item key={number} active={number === current}>
            {number}
            </Pagination.Item>
        );
    }
    return(
        <Pagination>{items.length > 0 && items}</Pagination>
    )
}



// const paginationBasic = (active, total)=> (
//   <div>
//     <Pagination>{items}</Pagination>
//     {/* <br /> */}

//     {/* <Pagination size="lg">{items}</Pagination>
//     <br />

//     <Pagination size="sm">{items}</Pagination> */}
//   </div>
// );

