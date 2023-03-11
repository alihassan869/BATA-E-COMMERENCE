import React, { useState } from 'react';
import Cardsdata from './Card1data';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { typeitems } from './Types';
import { useSelector } from 'react-redux';
function Card1() {
  // console.log(typeitems.men);
  const search = useSelector((state) => state.cartreducer.search);
  const datafilter = Cardsdata.filter((item) =>
    search?.length > 0
      ? item.rname?.toLowerCase()?.includes(search?.toLowerCase())
      : true,
  );
  return (
    <>
      <div className="container py-5">
        <h4 className="text-center text-red-800">
          MEN SHOES FOR SALE HURRY UP
        </h4>
        <div className="row">
          {datafilter.length > 0 ? (
            datafilter.map((item, id) => {
              return (
                <Card
                  style={{ width: '22rem' }}
                  className="col-md-4 col-10 mx-auto mb-3 cursor-pointer"
                >
                  <Link to={`/Cartpage/${item.id}/${typeitems.men}`}>
                    <Card.Img variant="top" src={item.imgdata} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{item.rname}</Card.Title>
                    <Card.Text>RS{item.price}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div
              className="py-5 text-center text-red-800"
              style={{ minHeight: '80vh' }}
            >
              <h3>Items not found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Card1;
